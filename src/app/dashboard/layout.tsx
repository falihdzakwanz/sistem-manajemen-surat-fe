"use client";

import { useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  FiInbox,
  FiUsers,
  FiFilePlus,
  FiUserPlus,
  FiHome,
  FiMenu,
  FiX,
} from "react-icons/fi";
import Navbar from "@/components/dashboard/Navbar";
import useAuth from "@/hooks/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import Link from "next/link";
import { routePermissions } from "@/types/routes";
import { UserRole } from "@/types";
import { CgProfile } from "react-icons/cg";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      const isAllowed = checkRouteAccess(pathname, user.role);
      if (!isAllowed) router.push("/dashboard");
    }
  }, [loading, user, pathname, router]);

  if (loading) return <LoadingSpinner />;
  if (!user) {
    router.push("/login");
    return null;
  }

  const navItems = [
    { href: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    {
      href: "/dashboard/profile",
      icon: <CgProfile />,
      label: "Profil Pengguna",
    },
    { href: "/dashboard/letters", icon: <FiInbox />, label: "Kotak Surat" },
    ...(user?.role === "admin"
      ? [
          {
            href: "/dashboard/letters/add",
            icon: <FiFilePlus />,
            label: "Tambah Surat",
          },
          { href: "/dashboard/users", icon: <FiUsers />, label: "Penerima" },
          {
            href: "/dashboard/users/add",
            icon: <FiUserPlus />,
            label: "Tambah Penerima",
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="fixed top-0 left-0 right-0 h-16 z-50 bg-white shadow flex items-center px-4">
        <Navbar user={user} />
      </div>

      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow z-40 transition-all duration-300 overflow-y-auto ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className="text-xl px-2">
          <div className="flex items-center p-3 rounded-lg">
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 text-black rounded"
            >
              {isCollapsed ? <FiMenu /> : <FiX />}
            </button>
          </div>
        </div>

        <nav className="space-y-2 px-2">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <div
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="text-xl px-2 ">{item.icon}</span>
                <span
                  className={`ml-3 transition-all duration-300 whitespace-nowrap overflow-hidden
    ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
  `}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* ✅ Konten bergeser sesuai sidebar */}
      <main
        className={`pt-16 transition-all duration-300 p-6 ${
          isCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        {children}
      </main>
    </div>
  );
}

function checkRouteAccess(currentPath: string, userRole: UserRole): boolean {
  const exactMatch = routePermissions.find(
    (p) => p.exact && currentPath === p.path
  );
  if (exactMatch) return exactMatch.roles.includes(userRole);

  const wildcard = routePermissions
    .filter((p) => !p.exact)
    .sort((a, b) => b.path.length - a.path.length);

  for (const p of wildcard) {
    if (currentPath.startsWith(p.path)) return p.roles.includes(userRole);
  }

  return userRole === UserRole.ADMIN;
}
