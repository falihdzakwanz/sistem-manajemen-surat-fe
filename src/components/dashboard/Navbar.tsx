"use client";

import useAuth from "@/lib/hooks/useAuth";
import { motion } from "framer-motion";
import Button from "../ui/Button";

interface NavbarProps {
  user: { name: string; username: string } | null;
}

export default function Navbar({ user }: NavbarProps) {
  const { logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed w-full bg-white shadow-sm z-10"
    >
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-gray-800">Surat Management</h1>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-gray-700">{user?.name}</span>
          <Button variant="outline" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </motion.nav>
  );
}
