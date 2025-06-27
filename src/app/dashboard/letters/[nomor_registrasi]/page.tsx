"use client";

import { useParams } from "next/navigation";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import LetterStatusBadge from "@/components/dashboard/LetterStatusBadge";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";
import useLetterDetail from "@/hooks/useLetterDetail";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import LetterDetailSection from "@/components/dashboard/LetterDetailSection";

export default function LetterDetailPage() {
  const { nomor_registrasi } = useParams();
  const { letter, loading, error } = useLetterDetail(nomor_registrasi as string);

  if (loading) {
    return <LoadingSpinner />
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
            <LetterDetailSection title="Sender" value={letter.pengirim} />
            <LetterDetailSection
              title="Recipient"
              value={letter.tujuan}
              additionalValue={
                letter.penerima &&
                `${letter.penerima.nama_instansi} (${letter.penerima.email_instansi})`
              }
            />
            <LetterDetailSection
              title="Letter Number"
              value={letter.nomor_surat}
            />
            <LetterDetailSection
              title="Letter Date"
              value={formatDate(letter.tanggal_surat)}
            />
            <LetterDetailSection
              title="Received Date"
              value={formatDate(letter.tanggal_masuk)}
            />
            <LetterDetailSection
              title="Registration Number"
              value={letter.nomor_registrasi}
            />
          </div>

          <FileViewerSection fileUrl={letter.file_url} />

          <ActionButtons letterId={nomor_registrasi as string} />
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}

function FileViewerSection({ fileUrl }: { fileUrl: string }) {
  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-500">File</h3>
      <a
        href={`${
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
        }/${fileUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center text-blue-600 hover:underline"
      >
        View Document
      </a>
    </div>
  );
}

function ActionButtons({ letterId }: { letterId: string }) {
  return (
    <div className="mt-6 flex space-x-3">
      <Link href={`/dashboard/letters/${letterId}/edit`}>
        <Button variant="outline">Edit</Button>
      </Link>
    </div>
  );
}
