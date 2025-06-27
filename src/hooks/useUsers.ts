"use client";

import { useState, useEffect } from "react";
import { User } from "@/types";
import { apiClient } from "@/app/api/client";

export default function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await apiClient.get("/api/users");
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
  };
}
