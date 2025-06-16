"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiClient } from "@/app/api/client";

export default function useAuth() {
  const [user, setUser] = useState<{ username: string; name: string } | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const { data } = await apiClient.get("/users/current", token);
        setUser(data);
      } catch (error) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const { data } = await apiClient.post("/users/login", {
        username,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser({ username: data.username, name: data.name });
      return data;
    } catch (error) {
      throw error instanceof Error ? error : new Error("Login failed");
    }
  };
  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await apiClient.delete("/users/current", token);
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return { user, loading, login, logout };
}
