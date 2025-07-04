import { UserRole } from ".";

export type RoutePermission = {
  path: string;
  roles: Array<UserRole>;
  exact?: boolean;
};

export const routePermissions: RoutePermission[] = [
  {
    path: "/dashboard",
    roles: [UserRole.USER, UserRole.ADMIN],
  },
  {
    path: "/dashboard/letters",
    roles: [UserRole.USER, UserRole.ADMIN],
    exact: false,
  },
  {
    path: "/dashboard/letters/edit",
    roles: [UserRole.ADMIN],
  },
  {
    path: "/dashboard/profile",
    roles: [UserRole.USER, UserRole.ADMIN],
  },
  {
    path: "/dashboard/users",
    roles: [UserRole.ADMIN],
  },
  {
    path: "/dashboard",
    roles: [UserRole.USER, UserRole.ADMIN],
    exact: true,
  },
  {
    path: "/dashboard",
    roles: [UserRole.ADMIN],
    exact: false,
  },
];
