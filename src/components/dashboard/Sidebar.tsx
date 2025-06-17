"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiInbox,
  FiSend,
  FiUsers,
  FiFilePlus,
  FiUserPlus,
} from "react-icons/fi";

const navItems = [
  { href: "/dashboard", icon: <FiInbox />, label: "Surat Masuk" },
  {
    href: "/dashboard/letters/add",
    icon: <FiFilePlus />,
    label: "Tambah Surat",
  },
  { href: "/dashboard/receivers", icon: <FiUsers />, label: "Penerima" },
  {
    href: "/dashboard/receivers/add",
    icon: <FiUserPlus />,
    label: "Tambah Penerima",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden md:block w-64 bg-white shadow-md fixed h-full"
    >
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Menu</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <motion.div
                whileHover={{ x: 5 }}
                className={`flex items-center p-3 rounded-lg transition-colors ${
                  pathname === item.href
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </motion.div>
            </Link>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
