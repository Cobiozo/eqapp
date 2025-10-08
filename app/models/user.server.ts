import type { Password, User, Role, UserActivity, UserWorkshop, Notification, Announcement, Prisma, Language, Webinar, Product, ProductCategory, CandidateQuiz } from "@prisma/client";
import { ActivityType, RoleName } from "@prisma/client"
import bcrypt from "bcryptjs";
import BaseDbModel from "~/utils/modelBase.server";
import { db } from "~/utils/db.server";
import { userWorkshopModel } from "./userWorkshop.server";
import { roleModel } from "./role.server";
import removeUploadedFile from "~/utils/removeUploadedFile.server";
import mailService from "~/utils/services/mail.server";
import translateService from "~/utils/services/translate.server";

export type { User };
export type UserWithRole = User & { role: Role } & { permissions: Record<string, true> };
export type UserWithProteges = User & {
  proteges: UserWithProteges[];
}

class UserModel extends BaseDbModel<User>("user") {

  async getInactiveUsers(): Promise<User[]> {
    return (await db.user.findMany({
      where: {
        verified: false,
        emailVerified: true,
        NOT: {
          password: null
        }
      },
      include: {
        role: true,
      }
    }));
  }

  async getByEmail(email: User["email"]) {
    return db.user.findFirst({
      where: { email },
    });
  }

  async getByIdWithRole(id: User["id"], include?: string[]) {

    // prepare standard query
    const query: Record<string, any> = {
      where: { id },
      include: {
        role: {
          include: {
            permissions: true,
          }
        },
      },
    };

    // if includes are provided, add them to query
    if (include)
      query.include = include.reduce((acc, curr) => {
        return { ...acc, [curr]: true };
      }, query.include);

    const user = await db.user.findFirst(query);

    if (!user) return null;

    // change permissions to easier format
    const { permissions, ...role } = user.role;
    const permissionsObj = permissions.reduce((acc, permission) => {
      return { ...acc, [permission.name]: true };
    }, {});

    return {
      ...user,
      role: role,
      permissions: permissionsObj,
    } as unknown as UserWithRole;

  }

  async create(
    data: Omit<User, "createdAt" | "updatedAt">,
    password: string,
    roleId: Role["id"],
    mentorId: User["id"],
    language: Language["id"]
  ) {
    return db.user.create({
      data: {
        verified: false,
        emailVerified: false,
        mentor:{
          connect: {
            id: mentorId,
          }
        },
        language: {
          connect: {
            id: language,
          }
        },
        role: {
          connect: {
            id: roleId,
          }
        },
        ...data,
        password: password ? {
          create: {
            hash: await bcrypt.hash(password, 10),
          }
        } : undefined,
      },
    });
  }

  async createContact(
    data: Partial<User>,
  ) {
    return db.user.create({
      data: {
        ...data,
        verified: false,
      },
    });
  }

  async verifyLogin(
    email: User["email"],
    password: Password["hash"]
  ) {

    // try to find matching user
    const userWithPassword = await db.user.findFirst({
      where: { email },
      include: {
        password: true,
      },
    });

    // if no proper user found, return null
    if (!userWithPassword || !userWithPassword.password) return null;

    // check if given password is valid
    // if yes -> return user data but without password
    // if no -> return null
    const isValid = await bcrypt.compare(password, userWithPassword.password.hash);
    if (!isValid) return null;

    const { password: _password, ...userWithoutPassword } = userWithPassword;
    return userWithoutPassword;
  }

  async updatePassword(
    userId: User["id"],
    newPassword: string
  ) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    try {
      await db.password.update({
        where: { userId },
        data: {
          hash: hashedPassword,
        },
      });
    } catch (e) {
      await db.password.create({
        data: {
          userId,
          hash: hashedPassword,
        },
      });
    }
  }

  async update(
    userId: User["id"],
    newData: Partial<Omit<User, "id" | "createdAt" | "updatedAt" | "verified">>,
    password?: string
  ) {
    await db.user.update({
      where: { id: userId },
      data: {
        ...newData,
      },
    });

    if (password) {
      await this.updatePassword(userId, password);
    }

    return true;
  }

  async activate(
    userId: User["id"],
  ) {
    return db.user.update({
      where: { id: userId },
      data: {
        verified: true,
      },
    });
  }

  async getUserWorkshops(userId: User["id"], where?: Record<string, any>) {
    return db.userWorkshop.findMany({
      where: {
        userId,
        ...where
      },
    });
  }

  async getProteges(userId: User["id"]) {
    return db.user.findMany({
      where: {
        mentorId: userId,
      },
    });
  }

  async saveActivity(
    userId: User["id"],
    activity: Partial<UserActivity>
  ) {
    return db.userActivity.create({
      data: {
        ...activity,
        userId,
      },
    });
  }

  async getActivities(
    userId: User["id"],
    include?: string[],
    limit?: number,
  ) {

    // prepare query base
    const query: Record<string, any> = {
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    }

    // if limit is provided, add it to query
    if (limit)
      query.take = limit;

    // if includes are provided, add them to query
    if (include)
      query.include = include.reduce((acc, curr) => {
        return { ...acc, [curr]: true };
      }, {});

    // try to get activities
    return db.userActivity.findMany(query);
  }

  finishWorkshop(
    id: UserWorkshop["id"],
  ) {
    return db.userWorkshop.update({
      where: {
        id,
      },
      data: {
        done: true,
      },
    });
  }

  async isUnreadNotification(
    userId: User["id"],
  ) {

    // get user details
    const user = await this.getByIdWithRole(userId) as UserWithRole;

    // try to find unread notification
    const unreadNotification = await db.notification.findFirst({
      where: {
        roles: {
          some: {
            id: user.role.id,
          }
        },
        showAt: {
          lte: new Date(),
        }
      },
    });

    // if there aren't any unread notifications, return false
    if (!unreadNotification)
      return false;

    // if we got here, it means that there is unread notification
    // it also means that it should be shown today and user has the right role
    // but now we have to check to things:
    // 1. if user has already seen this notification
    // 2. if user is not CANDIDATE_PARTNER, he shouldn't see this
    const userAlreadySeenIt = await db.userReadNotification.findFirst({
      where: {
        userId,
        notificationId: unreadNotification.id,
      }
    });

    // if user seen it or it's CANDIDATE, return false
    if (userAlreadySeenIt || user.role.name === RoleName.CANDIDATE_PARTNER)
      return false;
    
    // if we got here, it means that user hasn't seen this notification and he is not CANDIDATE_PARTNER
    // so we can return true
    return true;
  }

  async getUnreadNotification(
    userId: User["id"],
  ) {

    // get user details
    const user = await this.getByIdWithRole(userId) as UserWithRole;
    // try to find unread notification
    const unreadNotification = await db.notification.findFirst({
      where: {
        roles: {
          some: {
            id: user.role.id,
          }
        },
        showAt: {
          lte: new Date(),
        }
      },
      include: {
        content: true,
      }
    });

    // if there aren't any unread notifications
    // or user is CANDIDATE_PARTNER,
    //return null
    if (!unreadNotification)
      return null;

    // if we got here, it means that there is unread notification
    // but still we should check if he has seen it
    const userAlreadySeenIt = await db.userReadNotification.findFirst({
      where: {
        userId,
        notificationId: unreadNotification.id,
      },
    });

    // if user seen it, return null
    if (userAlreadySeenIt)
      return null;

    // if we got here, it means that user hasn't seen this notification
    // so we can return it
    return unreadNotification;
  }

  async markNotificationAsRead(
    userId: User["id"],
    notificationId: Notification["id"],
  ) {
    return db.userReadNotification.create({
      data: {
        userId,
        notificationId,
      }
    });
  }

  async getUnreadPushNotifications(
    userId: User["id"],
  ) {

    return db.pushNotification.findMany({
      where: {
        userId,
        showAt: {
          lte: new Date(),
        },
        readBy: {
          none: {
            userId: userId,
          }
        }
      },
      include: {
        content: true,
        workshop: true,
        mentor: true,
        role: true,
        relatedUser: true,
      }
    });

  }

  async getPushNotifications(
    userId: User["id"],
  ) {

    return db.pushNotification.findMany({
      where: {
        userId,
        showAt: {
          lte: new Date(),
        },
      },
      include: {
        content: true,
        workshop: true,
        webinar: true,
        mentor: true,
        role: true,
        relatedUser: true,
      },
      orderBy: {
        createdAt: "desc",
      }
    });

  }

  async getUnseenPushNotifications(
    userId: User["id"],
    roleId: Role["id"],
  ) {

    return db.pushNotification.findMany({
      where: {
        OR: [
          { userId },
          {
            roles: {
              some: {
                id: roleId
              }
            }
          }
        ],
        showAt: {
          lte: new Date(),
        },
        readBy: {
          none: {
            userId: userId,
          }
        },
        seenBy: {
          none: {
            userId: userId,
          }
        }
      },
      include: {
        content: true,
        workshop: true,
        mentor: true,
        role: true,
        relatedUser: true,
      }
    });
  }

  async countUnseenPushNotifications(
    userId: User["id"],
  ) {

    const items = await db.pushNotification.findMany({
      where: {
        userId,
        showAt: {
          lte: new Date(),
        },
        readBy: {
          none: {
            userId: userId,
          }
        },
        seenBy: {
          none: {
            userId: userId,
          }
        }
      },
      select: {
        id: true,
      }
    });

    const pushNotificationCreatePromises = items
      .map(pn => pn.id)
      .map(pnId => db.userSeenPushNotification.create({
        data: {
          user: {
            connect: {
              id: userId,
            }
          },
          pushNotification: {
            connect: {
              id: pnId,
            }
          }
        }
      }));
    await Promise.all(pushNotificationCreatePromises);
    return items.length;
  }

  async countUnreadPushNotifications(
    userId: User["id"],
  ) {

    return db.pushNotification.count({
      where: {
        userId,
        showAt: {
          lte: new Date(),
        },
        readBy: {
          none: {
            userId: userId,
          }
        },
      },
    });
  
  }

  async savePushSubscription(
    userId: User["id"],
    subscription: PushSubscription,
  ) {
    return db.user.update({
      where: {
        id: userId,
      },
      data: {
        webPushSubscription: subscription,
      }
    });
  }

  async updatePwaLastRefreshedAt(
    userId: User["id"],
  ) {
    return db.user.update({
      where: {
        id: userId,
      },
      data: {
        pwaSubLastRefreshedAt: new Date(),
      }
    });
  }

  async removePushSubscription(
    userId: User["id"],
  ) {
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user || !user.webPushSubscription) return;
    return db.user.update({
      where: {
        id: userId,
      },
      data: {
        webPushSubscription: {}
      }
    });
  }

  async markUnreadPushNotificationAsRead(
    userId: User["id"],
  ) {
    const items = await db.pushNotification.findMany({
      where: {
        userId,
        showAt: {
          lte: new Date(),
        },
        readBy: {
          none: {
            userId: userId,
          }
        }
      },
      select: {
        id: true,
      }
    });

    const pushNotificationCreatePromises = items
      .map(pn => pn.id)
      .map(pnId => db.userReadPushNotification.create({
        data: {
          user: {
            connect: {
              id: userId,
            }
          },
          pushNotification: {
            connect: {
              id: pnId,
            }
          }
        }
      }));
  
    return Promise.all(pushNotificationCreatePromises);
  }

  async generateProtegesTree(userId: User["id"]) {
    const clientRole = await roleModel.getByName(RoleName.CLIENT) as Role;
    const candidatePartnerRole = await roleModel.getByName(RoleName.CANDIDATE_PARTNER) as Role;
    const proteges = await db.user.findMany({
      where: {
        mentorId: userId,
        roleId: {
          notIn: [clientRole.id, candidatePartnerRole.id],
        }
      },
      include: {
        proteges: true,
        role: true,
      }
    });

    for(const protege of proteges) {
      protege.proteges = await this.generateProtegesTree(protege.id);
    }

    return proteges as unknown as UserWithProteges[];
  }

  async cacheProtegesTree(userId: User["id"], tree: UserWithProteges[]) {
    const cachedTree = await db.userProtegesTree.findFirst({
      where: {
        userId,
      }
    });

    if(!cachedTree) {
      try {
        return await db.userProtegesTree.create({
          data: {
            userId,
            tree,
          }
        });
      } catch(e) {
        console.log(e);
      }
    }
    else {
      try {
        return await db.userProtegesTree.update({
          where: {
            userId,
          },
          data: {
            tree,
          }
        });
      } catch(e) {
        console.log(e);
      }
    }
  }

  async cacheMentorsTree(userId: User["id"], tree: string[]) {
    const cachedTree = await db.userMentorsTree.findFirst({
      where: {
        userId,
      }
    });

    if(!cachedTree) {
      try {
        return await db.userMentorsTree.create({
          data: {
            userId,
            tree,
          }
        });
      } catch(e) {
        console.log(e);
      }
    }
    else {
      try {
        return await db.userMentorsTree.update({
          where: {
            userId,
          },
          data: {
            tree,
          }
        });
      } catch(e) {
        console.log(e);
      }
    }
  }

  async getProtegesTree(userId: User["id"]) {
    const cachedTree = await db.userProtegesTree.findFirst({
      where: {
        userId,
      }
    });

    if(cachedTree)
      return cachedTree.tree;

    const tree = await this.generateProtegesTree(userId);
    await this.cacheProtegesTree(userId, tree);
    return tree;
  }

  async generateMentorsTree(userId: User["id"]): Promise<string[]> {
    const user = await this.getById(userId);
    if (user?.mentorId) {
      const mentor = await this.getByIdWithRole(user.mentorId) as UserWithRole;
      if (mentor.role.name === RoleName.LEADER || mentor.role.name === RoleName.ADMIN)
        return [mentor.id];
      else
        return [mentor.id, ...(await this.generateMentorsTree(mentor.id))]
    } else {
      return [];
    }
  }

  async getMentorsTree(userId: User["id"]) {
    const cachedTree = await db.userMentorsTree.findFirst({
      where: {
        userId,
      }
    });

    if(cachedTree)
      return cachedTree.tree as string[];

    const tree = await this.generateMentorsTree(userId);
    await this.cacheMentorsTree(userId, tree);
    return tree;
  }


  async countProtegesCreatedToday(userId: User["id"]) {
    return db.user.count({
      where: {
        mentorId: userId,
        createdAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        }
      }
    });
  }

  async searchByFullName(
    fullName: string,
    include?: string[],
    where?: Record<string, any>,
    orderBy?: Record<string, any>,
  ) {
    const values = fullName.split(' ');

    // create base query
    const query: Record<string, any> = values.length == 2
      ? 
        {
          where: {
            firstName: {
              contains: values[0],
            },
            lastName: {
              contains: values[1],
            },
            ...where
          },
        }
      :
        {
          where: {
            OR: [
              {
                firstName: {
                  contains: fullName,
                },
              },
              {
                lastName: {
                  contains: fullName,
                },
              },
            ],
            ...where
          },
        }

    // add include if exists
    if(include)
      query.include = include.reduce((acc, curr) => {
        acc[curr] = true;
        return acc;
      }, {})

    // add orderBy if exists
    if(orderBy)
      query.orderBy = orderBy;

    const users = await db.user.findMany(query);
    return users;
  }

  async changeMentor(
    protegeId: User["id"],
    mentorId: User["id"],
  ) {

    // check if protege is not current mentor of... his new mentor ;)
    // very unlikely change, but we can support this
    const mentor = await db.user.findFirst({
      where: {
        id: mentorId,
      }
    }) as User;
    const protege = await db.user.findFirst({
      where: {
        id: protegeId,
      }
    }) as User;

    if(mentor?.mentorId === protegeId) {
      await db.user.update({
        where: {
          id: mentorId
        },
        data: {
          mentorId: protege.mentorId
        }
      });
    }

    // update user mentor
    await db.user.update({
      where: {
        id: protegeId,
      },
      data: {
        mentorId,
      }
    });

    // remove user catched mentor tree, as it will now clearly change
    await db.userMentorsTree.deleteMany({
      where: {
        userId: protegeId,
      }
    });

  }

  async transferProteges(
    userFrom: User["id"],
    userTo: User["id"],
  ) {
    return db.user.updateMany({
      where: {
        mentorId: userFrom,
      },
      data: {
        mentorId: userTo,
      }
    });
  }

  async getUnseenAnnouncement(
    userId: User["id"],
  ) {
    // find announcement that wasn't seen by user already
    // but...
    // get only those that startAt passed
    // but only from today
    // we don't want to show user very old announcements if he wasn't online for a while
    return db.announcement.findFirst({
      where: {
        seenBy: {
          none: {
            id: userId,
          }
        },
        startAt: {
          lte: new Date(),
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
      orderBy: {
        startAt: "asc",
      },
    });
  }

  async markAnnouncementAsSeen(
    userId: User["id"],
    announcementId: Announcement["id"],
  ) {
    await db.announcement.update({
      where: {
        id: announcementId,
      },
      data: {
        seenBy: {
          connect: {
            id: userId,
          }
        }
      }
    });
  }

  async searchProteges(
    query: string,
    where: Prisma.UserWhereInput,
    include: Prisma.UserInclude,
  ) {
    const searchQuery = query.split(" ");
    if (searchQuery.length === 1)
      return db.user.findMany({
        where: {
          ...where,
          OR: [
            {
              firstName: {
                contains: query,
              }
            },
            {
              lastName: {
                contains: query,
              }
            },
          ]
        },
        orderBy: {
          lastName: "asc",
        },
        include,
      });
    else
      return db.user.findMany({
        where: {
          ...where,
          AND: [
            {
              firstName: {
                contains: searchQuery[0],
              }
            },
            {
              lastName: {
                contains: searchQuery[1],
              }
            },
          ]
        },
        orderBy: {
          lastName: "asc",
        },
        include,
      });
    }

    async hasFinishedWorkshop(
      userId: User["id"],
      workshopId: Workshop["id"],
    ) {
      return userWorkshopModel.exists({
        userId,
        workshopId,
        done: true,
      });
    }

    async activateEmail(
      userId: User["id"],
    ) {
      return db.user.update({
        where: {
          id: userId,
        },
        data: {
          emailVerified: true,
        }
      });
    }

    async getSubscribedWebinars(
      userId: User["id"],
      webinarIds: Webinar["id"][],
    ) {
      return db.webinar.findMany({
        where: {
          subscribedUsers: {
            some: {
              userId: userId,
            }
          },
          id: {
            in: webinarIds,
          }
        }
      });
    }

    async hasSubscribedToWebinar(
      userId: User["id"],
      webinarId: Webinar["id"],
    ) {
      return (await db.userWebinar.findFirst({
        where: {
          userId,
          webinarId,
        }
      })) !== null;
    }

    async subscribeToWebinar(
      userId: User["id"],
      webinarId: Webinar["id"],
      url: string,
    ) {
      return db.webinar.update({
        where: {
          id: webinarId,
        },
        data: {
          subscribedUsers: {
            create: {
              userId,
              url,
            }
          }
        }
      });
    }

    async getWebinarSubscription(
      userId: User["id"],
      webinarId: Webinar["id"],
    ) {
      return db.userWebinar.findFirst({
        where: {
          userId,
          webinarId,
        }
      });
    }

    async getUserWebinarsByWebinarsIds(
      userId: User["id"],
      webinarIds: Webinar["id"][],
    ) {
      return db.userWebinar.findMany({
        where: {
          userId,
          webinarId: {
            in: webinarIds,
          }
        }
      });
    }

    async getUserWebinar(
      userId: User["id"],
      webinarId: Webinar["id"],
    ) {
      return db.userWebinar.findFirst({
        where: {
          userId,
          webinarId,
        }
      });
    }

    async hasAttendedWebinar(
      userId: User["id"],
      webinarId: Webinar["id"],
    ) {
      return (await db.userAttendedWebinar.findFirst({
        where: {
          userId,
          webinarId,
        }
      })) !== null;
    }

    async markWebinarAsAttended(
      userId: User["id"],
      webinarId: Webinar["id"],
      time: number,
    ) {
      
      // try to find user attended webinar record
      const userAttendedWebinar = await db.userAttendedWebinar.findFirst({
        where: {
          userId,
          webinarId,
        }
      });

      // if there is one, just update it
      if(userAttendedWebinar) {
        return db.userAttendedWebinar.update({
          where: {
            id: userAttendedWebinar.id,
          },
          data: {
            time,
          }
        });
      }

      // if not, create new one and save activity
      await userModel.saveActivity(userId as string, {
        type: ActivityType.WEBINAR_PRESENCE,
        webinarId: webinarId as string,
      });

      return db.userAttendedWebinar.create({
        data: {
          userId,
          webinarId,
          time,
        }
      });
    }

    async getAttendedWebinars(
      userId: User["id"],
      webinarIds: Webinar["id"][],
    ) {
      return db.webinar.findMany({
        where: {
          attendedUsers: {
            some: {
              userId: userId,
            }
          },
          id: {
            in: webinarIds,
          },
        }
      });
    }

    async getProductsIds(
      userId: User["id"],
    ) {
      return (await db.userProduct.findMany({
        where: {
          userId,
        },
        select: {
          productId: true,
        }
      })).map(up => up.productId);
    }

    async updateProductRefLink(
      userId: User["id"],
      productId: Product["id"],
      url: string,
    ) {
      
      const userProduct = await db.userProduct.findFirst({
        where: {
          userId,
          productId,
        }
      });

      if(userProduct) {
        return db.userProduct.update({
          where: {
            id: userProduct.id,
          },
          data: {
            url,
          }
        });
      }
      else {
        return db.userProduct.create({
          data: {
            userId,
            productId,
            url,
          }
        });
      }

    }

    async getUserProduct(
      userId: User["id"],
      productId: Product["id"],
    ) {
      return db.userProduct.findFirst({
        where: {
          userId,
          productId,
        }
      });
    }

    async getUserProducts(
      userId: User["id"],
    ) {
      return db.userProduct.findMany({
        where: {
          userId,
        }
      });
    }

    async getUserProductsForCategory(
      userId: User["id"],
      categoryId: ProductCategory["id"],
    ) {
      return db.userProduct.findMany({
        where: {
          userId,
          product: {
            categoryId,
          }
        }
      });
    }

    async isReallyRegistered(
      userId: User["id"],
    ) {
      return (await db.password.findFirst({
        where: {
          userId,
        }
      })) !== null;
    }

    async getCurrentQuiz(userId: string): Promise<CandidateQuiz | null> {
      const userGraduatedQuizesIds = (await db.user.findFirst({
        where: {
          id: userId
        },
        include: {
          graduatedCandidateQuiz: true
        }
      }))?.graduatedCandidateQuiz.map(q => q.id) || [];
  
      return await db.candidateQuiz.findFirst({
        where: {
          id: {
            notIn: userGraduatedQuizesIds
          }
        },
        include: {
          questions: {
            include: {
              answers: true
            }
          }
        },
        orderBy: {
          priority: 'asc'
        },
      });
    }

    async markQuizAsDone(
      userId: string,
      quizId: string
    ) {
      return db.candidateQuiz.update({
        where: {
          id: quizId
        },
        data: {
          graduatedUsers: {
            connect: {
              id: userId
            }
          }
        }
      });
    }

    async deleteUnverifiedUsers() {

      // remove all users without email verified that was created before 12h
      const usersToDelete = await db.user.findMany({
        where: {
          emailVerified: false,
          createdAt: {
            lte: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
          }
        },
        include: {
          language: true
        }
      });

      for (const user of usersToDelete) {

        // remove user image
        if (user.avatar)
          removeUploadedFile(user.avatar);

        // ...and send mail to him with sad news :)
        const t = translateService.translate;
        await mailService.sendMail(
          user.email,
          t(user.language.name, "mails.unverifiedAccountRemoved.subject"),
          t(user.language.name, "mails.unverifiedAccountRemoved.text")
        );
      }

      await db.user.deleteMany({
        where: {
          emailVerified: false,
          createdAt: {
            lte: new Date(new Date().getTime() - 12 * 60 * 60 * 1000),
          }
        }
      });

    }

}

export const userModel = new UserModel();
