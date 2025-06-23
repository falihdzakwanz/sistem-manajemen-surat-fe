"use client";

import auth from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Letter } from "@/types";
import LetterStatusBadge from "./LetterStatusBadge";
import { formatDate } from "@/lib/utils";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { FiEye, FiEdit2, FiFileText, FiInbox } from "react-icons/fi";
import useAuth from "@/hooks/useAuth";

interface LetterCardProps {
  letter: Letter;
  onStatusChange?: (id: number, status: "diterima" | "pending") => void;
  onEdit?: (id: number) => void;
}

export default function LetterCard({
  letter,
  onStatusChange,
}: LetterCardProps) {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {letter.perihal}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {letter.nomor_surat} • {letter.pengirim}
            </p>
          </div>
          <LetterStatusBadge status={letter.status} />
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <p>Tujuan: {letter.tujuan}</p>
          <p className="mt-1">
            Tanggal Surat: {formatDate(letter.tanggal_surat)}
          </p>
          <p className="mt-1">
            Tanggal Masuk: {formatDate(letter.tanggal_masuk)}
          </p>
        </div>

        <div className="mt-4 flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-1"
            onClick={() =>
              router.push(`/dashboard/letters/${letter.nomor_registrasi}`)
            }
          >
            <FiEye /> Detail
          </Button>
          <Button
            size="sm"
            className="flex items-center gap-1 bg-slate-600 hover:bg-slate-700 focus:ring-slate-500"
            onClick={() => window.open(letter.file_url, "_blank")}
          >
            <FiFileText /> Lihat File
          </Button>
          {user?.id === 0 && (
            <Button
              size="sm"
              className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
              onClick={() =>
                router.push(
                  `/dashboard/letters/${letter.nomor_registrasi}/edit`
                )
              }
            >
              <FiEdit2 /> Edit
            </Button>
          )}

          {user?.id !== 0 && letter.status === "pending" && (
            <Button
              variant="success"
              size="sm"
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 focus:ring-green-500"
              onClick={() =>
                onStatusChange?.(letter.nomor_registrasi, "diterima")
              }
            >
              {" "}
              <FiInbox />
              Terima
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
