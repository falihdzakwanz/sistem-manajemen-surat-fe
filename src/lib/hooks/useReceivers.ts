"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/app/api/client";
import { Receiver } from "@/types";

export default function useReceivers(token: string) {
  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReceivers = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get("/penerima", token);
        setReceivers(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch receivers"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchReceivers();
    }
  }, [token]);

  const createReceiver = async (receiverData: {
    nama: string;
    email: string;
  }) => {
    try {
      const response = await apiClient.post("/penerima", receiverData, token);
      setReceivers([response.data, ...receivers]);
      return response.data;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to create receiver");
    }
  };

  const updateReceiver = async (
    id: number,
    receiverData: { nama?: string; email?: string }
  ) => {
    try {
      const response = await apiClient.put(
        `/penerima/${id}`,
        receiverData,
        token
      );
      setReceivers(
        receivers.map((receiver) =>
          receiver.id === id ? { ...receiver, ...response.data } : receiver
        )
      );
      return response.data;
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update receiver");
    }
  };

  const deleteReceiver = async (id: number) => {
    try {
      await apiClient.delete(`/penerima/${id}`, token);
      setReceivers(receivers.filter((receiver) => receiver.id !== id));
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to delete receiver");
    }
  };

  const getReceiverById = (id: number) => {
    return receivers.find((receiver) => receiver.id === id);
  };

  return {
    receivers,
    loading,
    error,
    // fetchReceivers,
    createReceiver,
    updateReceiver,
    deleteReceiver,
    getReceiverById,
  };
}
