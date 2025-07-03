"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiInbox,
  FiUsers,
  FiFilePlus,
  FiUserPlus,
  FiHome,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import useAuth from "@/hooks/useAuth";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const { user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: <FiHome />, label: "Dashboard" },
    {
      href: "/dashboard/Profile",
      icon: <FiInbox />,
      label: "Profile Pengguna",
    },
    { href: "/dashboard/letters", icon: <FiInbox />, label: "Surat" },
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
    <motion.div
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ duration: 0.3 }}
      className="bg-white shadow-md h-screen fixed top-0 left-0 z-40 pt-16 overflow-hidden"
    >
      {/* Collapse button */}
      <div className="flex justify-end p-2">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-600 hover:bg-gray-100 p-1 rounded"
        >
          {isCollapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 px-2">
        {navItems.map((item) => (
          <Link href={item.href} key={item.href}>
            <div
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                pathname === item.href
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </div>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
