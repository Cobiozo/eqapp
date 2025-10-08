import PageHeader from "~/components/ui/PageHeader";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import Button from "~/components/ui/Button";
import { PermissionName } from "@prisma/client";
import { BsKey } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";
import { FiBell, FiShoppingCart, FiUsers } from "react-icons/fi";
import { TbFileCertificate } from "react-icons/tb";
import { AiOutlineDatabase, AiOutlineNotification } from "react-icons/ai";
import { IoDocumentsOutline, IoNewspaperOutline } from "react-icons/io5";
import { MdOutlineQuiz } from "react-icons/md";

interface Link {
  name: string;
  url: string;
  icon: ({ className }: { className: string }) => JSX.Element;
  permission?: string | (() => boolean);
}

export default function AdminIndex() {
  const { t, user } = useContext(GlobalContext);

  const hasPermission = (link: Link) => {
    if (link.permission) {
      if (typeof link.permission === "string")
        return !!user?.permissions[link.permission as PermissionName];
      else
        return link.permission();
    }
    return true;
  }

  const links: Link[] = [
    {
      name: t("nav.adminSubmenu.pages"),
      url: "/dashboard/admin/pages",
      permission: PermissionName.adminPagesRead,
      icon: ({ className }: { className?: string }) => <IoDocumentsOutline className={className} />
    },
    {
      name: t("nav.adminSubmenu.roles"),
      url: "/dashboard/admin/roles",
      icon: ({ className }: { className?: string }) => <BsKey className={className} />,
      permission: PermissionName.adminRolesRead
    },
    {
      name: t("nav.adminSubmenu.users"),
      url: "/dashboard/admin/users",
      permission: "adminUsersRead",
      icon: ({ className }: { className?: string }) => <FiUsers className={className} />
    },
    {
      name: t("nav.adminSubmenu.webinars"),
      url: "/dashboard/admin/webinars",
      icon: ({ className }: { className?: string }) => <BiMoviePlay className={className} />,
      permission: PermissionName.adminWebinarsRead
    },
    {
      name: t("nav.adminSubmenu.workshops"),
      url: "/dashboard/admin/workshops",
      icon: ({ className }: { className?: string }) => <TbFileCertificate className={className} />,
      permission: PermissionName.adminWorkshopsRead
    },
    {
      name: t("nav.adminSubmenu.products"),
      url: "/dashboard/admin/product-categories",
      permission: PermissionName.adminAnnouncementsRead,
      icon: ({ className }: { className?: string }) => <FiShoppingCart className={className} />
    },
    {
      name: t("nav.adminSubmenu.posts"),
      url: "/dashboard/admin/posts",
      permission: PermissionName.adminPostsRead,
      icon: ({ className }: { className?: string }) => <IoNewspaperOutline className={className} />
    },
    {
      name: t("nav.adminSubmenu.notifications"),
      url: "/dashboard/admin/notifications",
      permission: PermissionName.adminNotificationsRead,
      icon: ({ className }: { className?: string }) => <FiBell className={className} />
    },
    {
      name: t("nav.adminSubmenu.announcements"),
      url: "/dashboard/admin/announcements",
      permission: PermissionName.adminAnnouncementsRead,
      icon: ({ className }: { className?: string }) => <AiOutlineNotification className={className} />
    },
    {
      name: t("nav.adminSubmenu.certificates"),
      url: "/dashboard/admin/certificates",
      permission: PermissionName.adminCertificatesRead,
      icon: ({ className }: { className?: string }) => <TbFileCertificate className={className} />
    },
    {
      name: t("nav.adminSubmenu.systemContent"),
      url: "/dashboard/admin/personalized-content",
      permission: PermissionName.adminSystemPersonalizationRead,
      icon: ({ className }: { className?: string }) => <AiOutlineDatabase className={className} />
    },
    {
      name: t("nav.adminSubmenu.candidateQuizes"),
      url: "/dashboard/admin/candidate-quizes",
      permission: PermissionName.adminCandidateQuizRead,
      icon: ({ className }: { className?: string }) => <MdOutlineQuiz className={className} />
    }
  ];

  return (
    <section className="max-w-5xl mx-auto items-center">
      <PageHeader>
        {t("admin.title")}
      </PageHeader>
      <ul className="flex flex-col">
        {links.filter(l => hasPermission(l)).map((link) => (
          <li key={link.url}>
            <Button
              variant="secondary"
              size="sm"
              to={link.url}
              icon={link.icon}
              className="w-full max-w-sm my-1 mx-auto"
            >
              {link.name}
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
}
