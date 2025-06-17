"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { motion } from "framer-motion";

interface ReceiverFormProps {
  initialData?: {
    id?: number;
    nama: string;
    email: string;
  };
  onSubmit: (data: { nama: string; email: string }) => Promise<void>;
  loading?: boolean;
}

export default function ReceiverForm({
  initialData,
  onSubmit,
  loading,
}: ReceiverFormProps) {
  const [nama, setNama] = useState(initialData?.nama || "");
  const [email, setEmail] = useState(initialData?.email || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!nama || !email) {
      setError("Nama dan email harus diisi");
      return;
    }

    try {
      await onSubmit({ nama, email });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save receiver");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 text-red-700 p-3 rounded-md"
        >
          {error}
        </motion.div>
      )}

      <Input
        label="Nama Penerima"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
        required
      />

      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? "Menyimpan..."
          : initialData?.id
          ? "Update Penerima"
          : "Tambah Penerima"}
      </Button>
    </form>
  );
}
