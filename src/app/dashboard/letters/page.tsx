"use client";

import { useState } from "react";
import useAuth from "@/lib/hooks/useAuth";
import LetterCard from "@/components/dashboard/LetterCard";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { dummyLetters } from "@/lib/dummy";

export default function LettersPage() {
  const { user } = useAuth();
  const [letters, setLetters] = useState(dummyLetters);

  const filteredLetters =
    user?.id === 0
      ? letters
      : letters.filter((l) => l.penerima_id === user?.id);

  const updateLetterStatus = (id: number, status: "diterima" | "pending") => {
    setLetters((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  return (
    <div className="ml-64 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Surat Masuk</h1>
        {user?.id === 0 && (
          <Link href="/dashboard/letters/add">
            <Button>+ Tambah Surat</Button>
          </Link>
        )}
      </div>

      {filteredLetters.length === 0 ? (
        <AnimatedDiv className="text-center py-12">
          <p className="text-gray-500">Belum ada surat yang tercatat</p>
        </AnimatedDiv>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filteredLetters.map((letter, index) => (
            <AnimatedDiv key={letter.id} delay={index * 0.05}>
              <LetterCard letter={letter} onStatusChange={updateLetterStatus} />
            </AnimatedDiv>
          ))}
        </motion.div>
      )}
    </div>
  );
}
