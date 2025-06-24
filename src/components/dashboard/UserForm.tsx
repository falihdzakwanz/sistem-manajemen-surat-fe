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
    role: "user";
    password: string;
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
  loading = false,
}: ReceiverFormProps) {
  const [formData, setFormData] = useState({
    nama_instansi: initialData?.nama_instansi || "",
    email_instansi: initialData?.email_instansi || "",
    password: initialData?.password || "",
    role: "user" as const,
  });

  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (
      !formData.nama_instansi ||
      !formData.email_instansi ||
      !formData.password
    ) {
      setError("Semua field harus diisi");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password harus minimal 6 karakter");
      return;
    }

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Gagal menyimpan user. Silakan coba lagi."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-100 text-red-700 p-3 rounded-md text-sm"
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
        label="Email Instansi"
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
        minLength={6}
        className="text-black"
      />

      <Button
        type="submit"
        disabled={loading}
        className="w-full"
        variant="primary"
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Menyimpan...
          </span>
        ) : initialData?.id ? (
          "Update Penerima"
        ) : (
          "Tambah Penerima"
        )}
      </Button>
    </form>
  );
}
