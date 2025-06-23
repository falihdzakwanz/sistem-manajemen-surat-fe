"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/app/api/client";

export default function useLetters(token: string) {
  const [letters, setLetters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get("/surat", token);
        setLetters(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch letters"
        );
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      fetchLetters();
    }
  }, [token]);

  const addLetter = async (formData: FormData) => {
    try {
      const response = await apiClient.upload("/surat", formData, token);
      setLetters([response.data, ...letters]);
      return response.data;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to add letter");
    }
  };

  const updateLetterStatus = async (
    nomorRegistrasi: number,
    status: string
  ) => {
    try {
      await apiClient.patch(
        `/surat/${nomorRegistrasi}/status`,
        { status },
        token
      );
      setLetters(
        letters.map((letter) =>
          letter.nomor_registrasi === nomorRegistrasi
            ? { ...letter, status }
            : letter
        )
      );
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update status");
    }
  };

  const deleteLetter = async (nomorRegistrasi: number) => {
    try {
      await apiClient.delete(`/surat/${nomorRegistrasi}`, token);
      setLetters(letters.filter((l) => l.nomor_registrasi !== nomorRegistrasi));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete letter");
    }
  };

  return {
    letters,
    loading,
    error,
    // fetchLetters,
    addLetter,
    updateLetterStatus,
    deleteLetter,
  };
}
