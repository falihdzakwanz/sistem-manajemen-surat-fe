"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import LetterForm from "@/components/dashboard/LetterForm";
import useUsers from "@/hooks/useUsers";
import useLetterDetail from "@/hooks/useLetterDetail";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { convertDateFormat } from "@/utils/dateUtils";
import { letterService } from "@/services/letterService";
import { motion } from "framer-motion";
import AnimatedDiv from "@/components/ui/AnimatedDiv";

export default function LetterEditPage() {
  const { nomor_registrasi } = useParams();
  const router = useRouter();
  const {
    letter,
    loading: letterLoading,
    error: letterError,
  } = useLetterDetail();
  const { users, loading: usersLoading, error: usersError } = useUsers();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      setSubmitLoading(true);
      setSubmitError(null);

      if (!nomor_registrasi) {
        throw new Error("Nomor registrasi tidak ditemukan");
      }

      const response = await letterService.updateLetter(
        nomor_registrasi.toString(),
        formData
      );

      if (!response.data) {
        throw new Error("No data returned from server");
      }

      router.push("/dashboard/letters");
      router.refresh();
    } catch (err) {
      console.error("Error submitting form:", err);
      setSubmitError("Gagal mengupdate surat.");
      throw err;
    } finally {
      setSubmitLoading(false);
    }
  };

  const isLoading = letterLoading || usersLoading;
  const error = letterError || usersError || submitError;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  if (!letter) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        Surat tidak ditemukan
      </div>
    );
  }

  const initialFormData = {
    ...letter,
    tanggal_surat: convertDateFormat(
      letter.tanggal_surat,
      "DD-MM-YYYY",
      "YYYY-MM-DD"
    ),
    tanggal_masuk: convertDateFormat(
      letter.tanggal_masuk,
      "DD-MM-YYYY",
      "YYYY-MM-DD"
    ),
  };

  return (
    <div className="max-w-3xl mx-auto mt-6">
      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Surat</h1>

          {submitError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 text-red-700 p-3 rounded-md mb-4"
            >
              {submitError}
            </motion.div>
          )}

          <LetterForm
            onSubmit={handleSubmit}
            users={users}
            loading={submitLoading}
            initialData={initialFormData}
          />
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
