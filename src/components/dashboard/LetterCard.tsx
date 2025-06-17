"use client";

import { motion } from "framer-motion";
import { Letter } from "@/types";
import LetterStatusBadge from "./LetterStatusBadge";
import { formatDate } from "@/lib/utils";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

interface LetterCardProps {
  letter: Letter;
  onStatusChange?: (id: number, status: string) => void;
  onDelete?: (id: number) => void;
}

export default function LetterCard({
  letter,
  onStatusChange,
  onDelete,
}: LetterCardProps) {
  const router = useRouter();

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
            variant="outline"
            size="sm"
            onClick={() =>
              router.push(`/dashboard/letters/${letter.nomor_registrasi}`)
            }
          >
            Detail
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(letter.file_url, "_blank")}
          >
            Lihat File
          </Button>
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(letter.nomor_registrasi)}
            >
              Hapus
            </Button>
          )}
        </div>

        {onStatusChange && letter.status === "pending" && (
          <div className="mt-3 flex space-x-2">
            <Button
              variant="success"
              size="sm"
              onClick={() =>
                onStatusChange(letter.nomor_registrasi, "diterima")
              }
            >
              Terima
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => onStatusChange(letter.nomor_registrasi, "ditolak")}
            >
              Tolak
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
