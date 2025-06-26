"use client";

import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import LetterCard from "@/components/dashboard/LetterCard";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { letterService } from "@/services/letterService";
import { Letter } from "@/types";

export default function LettersPage() {
  const { user } = useAuth();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        setLoading(true);
        const response = await letterService.getLetters(user?.role === "user");
        setLetters(response.data);
      } catch (error) {
        console.error("Failed to fetch letters:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, [user?.role]);

  const updateLetterStatus = async (
    id: number,
    status: "diterima" | "pending"
  ) => {
    try {
      await letterService.updateLetterStatus(id, status);
      setLetters((prev) =>
        prev.map((l) => (l.nomor_registrasi === id ? { ...l, status } : l))
      );
    } catch (error) {
      console.error("Failed to update letter status:", error);
    }
  };

  if (loading) {
    return (
      <div className="ml-64 flex justify-center items-center h-screen">
        <p>Loading letters...</p>
      </div>
    );
  }

  return (
    <div className="ml-64 space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Surat Masuk</h1>
        {user?.role === "admin" && (
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
              if (user?.role === "admin") return true;
              return letter.penerima_id === user?.id;
            })
            .map((letter, index) => (
              <AnimatedDiv key={letter.nomor_registrasi} delay={index * 0.05}>
                <LetterCard
                  letter={letter}
                  onStatusChange={updateLetterStatus}
                  isAdmin={user?.role === "admin"}
                />
              </AnimatedDiv>
            ))}
        </motion.div>
      )}
    </div>
  );
}
