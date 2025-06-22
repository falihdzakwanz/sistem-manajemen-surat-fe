"use client";

import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { motion } from "framer-motion";

interface ReceiverFormProps {
  initialData?: {
    id?: number;
    nama_instansi: string;
    email_instansi: string;
    email_instansi: string;
    role: "user";
    password: string;
    created_at?: string;
    updated_at?: string;
  };
  onSubmit: (data: {
    nama_instansi: string;
    email_instansi: string;
    password: string;
    role: "user";
  }) => Promise<void>;
  loading?: boolean;
}

export default function ReceiverForm({
  initialData,
  onSubmit,
  loading,
}: ReceiverFormProps) {
  const now = new Date().toISOString();

  const [formData, setFormData] = useState({
    nama_instansi: initialData?.nama_instansi || "",
    email_instansi: initialData?.email_instansi || "",
    email_instansi: initialData?.email_instansi || "",
    password: initialData?.password || "",
    created_at: initialData?.created_at || now,
    updated_at: now,
    role: initialData?.role || "user",
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.nama_instansi || !formData.email_instansi) {
      setError("Nama dan email harus diisi");
      return;
    }

    try {
      await onSubmit({
        nama_instansi: formData.nama_instansi,
        email_instansi: formData.email_instansi,
        password: formData.password,
        role: formData.role,
      });
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
        label="Nama Instansi"
        value={formData.nama_instansi}
        onChange={(e) =>
          setFormData({ ...formData, nama_instansi: e.target.value })
        }
        required
        className="text-black"
      />

      <Input
        label="Email"
        type="email"
        value={formData.email_instansi}
        onChange={(e) =>
          setFormData({ ...formData, email_instansi: e.target.value })
        }
        required
        className="text-black"
      />

      <Input
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
        className="text-black"
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
