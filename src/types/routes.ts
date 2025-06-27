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
    exact: false, // Allow all subroutes
  },
  {
    path: "/dashboard/letters/edit",
    roles: [UserRole.ADMIN], // Hanya admin yang bisa akses edit
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
  // Fallback untuk semua route dashboard
  {
    path: "/dashboard",
    roles: [UserRole.ADMIN], // Admin bisa akses semua subroute
    exact: false,
  },
];
