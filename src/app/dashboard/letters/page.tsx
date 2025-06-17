import useLetters from "@/lib/hooks/useLetters";
import LetterCard from "@/components/dashboard/LetterCard";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function LettersPage() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const { letters, loading, error, updateLetterStatus, deleteLetter } =
    useLetters(token);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Surat Masuk</h1>
        <Link href="/dashboard/letters/add">
          <Button>+ Tambah Surat</Button>
        </Link>
      </div>

      {letters.length === 0 ? (
        <AnimatedDiv className="text-center py-12">
          <p className="text-gray-500">Belum ada surat yang tercatat</p>
        </AnimatedDiv>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {letters.map((letter, index) => (
            <AnimatedDiv key={letter.id} delay={index * 0.05}>
              <LetterCard
                letter={letter}
                onStatusChange={updateLetterStatus}
                onDelete={deleteLetter}
              />
            </AnimatedDiv>
          ))}
        </motion.div>
      )}
    </div>
  );
}
