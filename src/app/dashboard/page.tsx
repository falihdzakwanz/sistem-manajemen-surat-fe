"use client";

import useAuth from "@/hooks/useAuth";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="ml-64 space-y-6">
      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            You can manage your letters and receivers from here
          </p>
        </motion.div>
      </AnimatedDiv>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatedDiv delay={0.1}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-blue-50 rounded-lg p-6 border border-blue-100"
          >
            <h2 className="text-lg font-semibold text-blue-800">Letters</h2>
            <p className="text-blue-600 mt-2">
              Manage incoming and outgoing letters
            </p>
          </motion.div>
        </AnimatedDiv>

        <AnimatedDiv delay={0.2}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-green-50 rounded-lg p-6 border border-green-100"
          >
            <h2 className="text-lg font-semibold text-green-800">Receivers</h2>
            <p className="text-green-600 mt-2">Manage your letter recipients</p>
          </motion.div>
        </AnimatedDiv>
      </div>
    </div>
  );
}
