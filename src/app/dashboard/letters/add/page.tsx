"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LetterForm from "@/components/dashboard/LetterForm";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import useAuth from "@/hooks/useAuth";
import { apiClient } from "@/app/api/client";
import { userService } from "@/services/userService";

export default function AddLetterPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        if (user?.id === 0) {
          // Only admin can fetch all users
          const response = await userService.getAllUsers();
          setUsers(response.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [user?.id]);

  const handleSubmit = async (formData: FormData) => {
    try {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token") || ""
          : "";
      const response = await apiClient.upload("/surat", formData, token);
      router.push(`/dashboard/letters/${response.data.nomor_registrasi}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add letter");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Tambah Surat Baru
          </h1>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 text-red-700 p-3 rounded-md mb-4"
            >
              {error}
            </motion.div>
          )}

          <LetterForm onSubmit={handleSubmit} users={users} loading={loading} />
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
