"use client";

import { useState, useEffect } from "react";
import { Letter } from "@/types";
import { letterService } from "@/services/letterService";
import useAuth from "./useAuth";

export default function useLetters() {
  const { user } = useAuth();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const updateLetterStatus = async (
    id: number,
    status: "diterima" | "pending"
  ) => {
    try {
      await letterService.updateLetterStatus(id, status);
      setLetters((prev) =>
        prev.map((l) => (l.nomor_registrasi === id ? { ...l, status } : l))
      );
      return true;
    } catch (err) {
      setError("Failed to update letter status");
      console.error("Failed to update letter status:", err);
      return false;
    }
  };

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await letterService.getLetters(user?.role === "user");
        setLetters(response.data);
      } catch (err) {
        setError("Failed to fetch letters");
        console.error("Failed to fetch letters:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLetters();
  }, [user?.role]);

  return {
    letters,
    loading,
    error,
    updateLetterStatus,
    isAdmin: user?.role === "admin",
    currentUserId: user?.id,
  };
}
