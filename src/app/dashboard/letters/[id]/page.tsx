"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/api/client";
import { Letter } from "@/types";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import LetterStatusBadge from "@/components/dashboard/LetterStatusBadge";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { dummyLetters } from "@/lib/dummy";

export default function LetterDetailPage() {
  const { id } = useParams();
  const [letter, setLetter] = useState<Letter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  // useEffect(() => {
  //   const fetchLetter = async () => {
  //     try {
  //       const { data } = await apiClient.get(`/surat/${id}`, token);
  //       setLetter(data);
  //     } catch (err) {
  //       setError(err instanceof Error ? err.message : "Failed to fetch letter");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchLetter();
  // }, [id, token]);

  useEffect(() => {
    const regId = Number(id);
    const found = dummyLetters.find((l) => l.nomor_registrasi === regId);
    if (found) {
      setLetter(found);
    } else {
      setError("Surat tidak ditemukan");
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!letter) {
    return <div className="text-center py-12">Letter not found</div>;
  }

  return (
    <div className="ml-64 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Letter Details</h1>
        <Link href="/dashboard/letters">
          <Button variant="outline">Back to Letters</Button>
        </Link>
      </div>

      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {letter.perihal}
            </h2>
            <LetterStatusBadge status={letter.status} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Sender</h3>
                <p className="mt-1 text-gray-900">{letter.pengirim}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">Recipient</h3>
                <p className="mt-1 text-gray-900">{letter.tujuan}</p>
                {letter.penerima && (
                  <p className="mt-1 text-sm text-gray-600">
                    {letter.penerima.nama} ({letter.penerima.email})
                  </p>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Letter Number
                </h3>
                <p className="mt-1 text-gray-900">{letter.nomor_surat}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Letter Date
                </h3>
                <p className="mt-1 text-gray-900">
                  {formatDate(letter.tanggal_surat)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Received Date
                </h3>
                <p className="mt-1 text-gray-900">
                  {formatDate(letter.tanggal_masuk)}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Registration Number
                </h3>
                <p className="mt-1 text-gray-900">{letter.nomor_registrasi}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-500">File</h3>
            <a
              href={letter.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-blue-600 hover:underline"
            >
              View Document
            </a>
          </div>

          <div className="mt-6 flex space-x-3">
            {}
            <Link href={`/dashboard/letters/${id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
          </div>
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
