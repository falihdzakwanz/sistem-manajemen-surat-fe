"use client";

import { useRouter } from "next/navigation";
import ReceiverForm from "@/components/dashboard/UserForm";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import { userService } from "@/services/userService";

export default function AddUserPage() {
  const router = useRouter();

  const handleSubmit = async (data: {
    nama_instansi: string;
    email_instansi: string;
    password: string;
    role: "user";
  }) => {
    try {
      await userService.register({
        nama_instansi: data.nama_instansi,
        email_instansi: data.email_instansi,
        password: data.password,
        role: "user",
      });
      router.push("/dashboard/receivers");
    } catch (error) {
      console.error("Failed to create receiver:", error);
      throw error; // This will be caught in the form component
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Add New User
          </h1>
          <ReceiverForm onSubmit={handleSubmit} />
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
