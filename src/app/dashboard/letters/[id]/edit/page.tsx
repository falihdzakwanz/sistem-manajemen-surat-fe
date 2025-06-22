"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import LetterForm from "@/components/dashboard/LetterForm";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import useReceivers from "@/lib/hooks/useReceivers";
import useAuth from "@/lib/hooks/useAuth";
import { apiClient } from "@/app/api/client";
import { Letter } from "@/types";
import { dummyLetters } from "@/lib/dummy";

export default function EditLetterPage() {
  const { id } = useParams();
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const { receivers, loading: receiversLoading } = useReceivers(token);
  const { user } = useAuth();

  const [letterData, setLetterData] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //   useEffect(() => {
  //     const fetchLetter = async () => {
  //       try {
  //         const { data } = await apiClient.get(`/surat/${id}`, token);
  //         setLetterData(data);
  //       } catch (err) {
  //         setError(err instanceof Error ? err.message : "Failed to fetch letter");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchLetter();
  //   }, [id, token]);

  useEffect(() => {
    const regId = Number(id);

    // Ganti sementara API call dengan dummy lookup
    const found = dummyLetters.find((l) => l.nomor_registrasi === regId);
    if (found) {
      setLetterData(found);
    } else {
      setError("Surat tidak ditemukan (dummy)");
    }
    setLoading(false);
  }, [id]);
  const handleSubmit = async (formData: FormData) => {
    try {
      const response = await apiClient.upload(
        `/surat/${id}`,
        formData,
        token,
        "PUT"
      );
      router.push(`/dashboard/letters/${response.data.nomor_registrasi}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update letter");
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
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Surat </h1>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-100 text-red-700 p-3 rounded-md mb-4"
            >
              {error}
            </motion.div>
          )}

          {!loading && letterData && (
            <LetterForm
              onSubmit={handleSubmit}
              receivers={receivers}
              loading={receiversLoading}
              defaultPengirim={user?.name || ""}
              initialData={letterData}
            />
          )}
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
