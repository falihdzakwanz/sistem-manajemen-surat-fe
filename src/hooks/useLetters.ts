"use client";

import { useState, useEffect } from "react";
import { Letter, User } from "@/types";
import { letterService } from "@/services/letterService";
import { apiClient } from "@/app/api/client";

export default function useLetters() {
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

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
    const fetchUserAndLetters = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch user
        const userResponse = await apiClient.get("/api/users/current");
        const currentUser = userResponse.data;
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));

        const letterResponse = await letterService.getLetters(
          currentUser.role === "user"
        );
        setLetters(letterResponse.data);
      } catch (err) {
        setError("Failed to fetch user or letters");
        console.error("Error:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndLetters();
  }, []);

  return {
    letters,
    loading,
    error,
    updateLetterStatus,
    isAdmin: user?.role === "admin",
    currentUserId: user?.id,
  };
}
