"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ReceiverForm from "@/components/dashboard/UserForm";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import { userService } from "@/services/userService";
import { User } from "@/types";

export default function AddOrEditUserPage() {
  const params = useParams();
  const router = useRouter();

  const rawId = params?.id;
  const numericId =
    typeof rawId === "string"
      ? parseInt(rawId)
      : Array.isArray(rawId)
      ? parseInt(rawId[0])
      : NaN;

  const isEdit = !isNaN(numericId);
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(isEdit);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;

    const fetchUser = async () => {
      try {
        const data = await userService.getById(numericId);

        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setError("Gagal mengambil data pengguna.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [numericId, isEdit]);

  const handleSubmit = async (data: {
    nama_instansi: string;
    email_instansi: string;
    password: string;
    role: "user";
  }) => {
    try {
      if (isEdit) {
        await userService.update(numericId, data);
      } else {
        await userService.register(data);
      }
      router.push("/dashboard/users");
    } catch (error) {
      console.error("Failed to submit user:", error);
      throw error;
    }
  };

  const initialFormData = userData
    ? {
        id: userData.id,
        nama_instansi: userData.nama_instansi,
        email_instansi: userData.email_instansi,
        role: "user" as const,
        password: "", // kosongkan untuk keamanan
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
            <ReceiverForm
              onSubmit={handleSubmit}
              initialData={initialFormData}
            />
          )}
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
