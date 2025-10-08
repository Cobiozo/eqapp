import type { Permission, Role, RoleName } from "@prisma/client"
import BaseDbModel from "~/utils/modelBase.server";
import { db } from "~/utils/db.server";

export type { Role };
export type RoleWithPermissions = Role & { permissions: Record<string, true> };

class RoleModel extends BaseDbModel<Role>("role") {

    async getByName(name: RoleName) {
      return db.role.findFirst({
        where: { name },
      });
    }

    async getByIdWithPermissions(id: Role["id"]) {
      const role = await db.role.findFirst({
        where: { id },
        include: { permissions: true },
      });

      if (!role) return null;

      // change permissions to easier format
      const permissions = role.permissions;
      const permissionsObj = permissions.reduce((acc, permission) => {
        return { ...acc, [permission.name]: true };
      }, {});

      return {
        ...role,
        permissions: permissionsObj,
      } as RoleWithPermissions;
    }

    async getAllPermissions() {
      return db.permission.findMany();
    }

    async activatePermissions(
      roleId: Role["id"],
      permissions: Permission["id"][]
    ) {
      await db.role.update({
        where: { id: roleId },
        data: {
          permissions: {
            connect: permissions.map((id) => ({ id })),
          },
        },
      });
    }

    async deactivatePermissions(
      roleId: Role["id"],
      permissions: Permission["id"][]
    ) {
      await db.role.update({
        where: { id: roleId },
        data: {
          permissions: {
            disconnect: permissions.map((id) => ({ id })),
          },
        },
      });
    }

}

export const roleModel = new RoleModel();
