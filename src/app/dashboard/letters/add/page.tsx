"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LetterForm from "@/components/dashboard/LetterForm";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import useReceivers from "@/lib/hooks/useReceivers";
import useAuth from "@/lib/hooks/useAuth";
import { apiClient } from "@/app/api/client";

export default function AddLetterPage() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const { receivers, loading: receiversLoading } = useReceivers(token);
  const { user } = useAuth();

  const [error, setError] = useState("");

  const handleSubmit = async (formData: FormData) => {
    try {
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

          <LetterForm
            onSubmit={handleSubmit}
            receivers={receivers}
            loading={receiversLoading}
            defaultPengirim={user?.name || ""}
          />
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
