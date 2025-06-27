"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "@/components/dashboard/Navbar";
import Sidebar from "@/components/dashboard/Sidebar";
import useAuth from "@/hooks/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { routePermissions } from "@/types/routes";
import { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && user) {
      const isAllowed = checkRouteAccess(pathname, user.role);

      if (!isAllowed) {
        router.push("/dashboard");
      }
    }
  }, [loading, user, pathname, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function checkRouteAccess(currentPath: string, userRole: UserRole): boolean {
  const exactMatch = routePermissions.find(
    (p) => p.exact && currentPath === p.path
  );

  if (exactMatch) return exactMatch.roles.includes(userRole);

  const wildcardPermissions = routePermissions
    .filter((p) => !p.exact)
    .sort((a, b) => b.path.length - a.path.length);

  for (const permission of wildcardPermissions) {
    if (currentPath.startsWith(permission.path)) {
      return permission.roles.includes(userRole);
    }
  }

  return userRole === UserRole.ADMIN;
}
