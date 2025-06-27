"use client";

import UserForm from "@/components/dashboard/UserForm";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import useUserOperations from "@/hooks/useUserOperations";

export default function EditUserPage() {
  const { isEdit, userData, loading, error, handleSubmit } = useUserOperations();

  const initialFormData = userData
    ? {
        id: userData.id,
        nama_instansi: userData.nama_instansi,
        email_instansi: userData.email_instansi,
        role: "user" as const,
        password: "",
      }
    : undefined;

  return (
    <div className="max-w-md mx-auto">
      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            {isEdit ? "Edit User" : "Add New User"}
          </h1>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          {!loading && (
            <UserForm onSubmit={handleSubmit} initialData={initialFormData} />
          )}
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
