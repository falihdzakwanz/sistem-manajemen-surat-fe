"use client";

import LetterCard from "@/components/dashboard/LetterCard";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";
import useLetters from "@/hooks/useLetters";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function LettersPage() {
  const {
    letters,
    loading,
    error,
    updateLetterStatus,
    isAdmin,
    currentUserId,
  } = useLetters();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="ml-64 flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Kotak Surat</h1>
        {isAdmin && (
          <Link href="/dashboard/letters/add">
            <Button>+ Tambah Surat</Button>
          </Link>
        )}
      </div>

      {letters.length === 0 ? (
        <AnimatedDiv className="text-center py-12">
          <p className="text-gray-500">Belum ada surat yang tercatat</p>
        </AnimatedDiv>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {letters
            .filter((letter) => {
              if (isAdmin) return true;
              return letter.user?.id === currentUserId;
            })
            .map((letter, index) => (
              <AnimatedDiv key={letter.nomor_registrasi} delay={index * 0.05}>
                <LetterCard
                  letter={letter}
                  onStatusChange={updateLetterStatus}
                  isAdmin={isAdmin}
                />
              </AnimatedDiv>
            ))}
        </motion.div>
      )}
    </div>
  );
}
