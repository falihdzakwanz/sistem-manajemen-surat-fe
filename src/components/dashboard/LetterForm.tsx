"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { Receiver } from "@/types";

interface LetterFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  receivers: Receiver[];
  loading: boolean;
  defaultPengirim?: string;
  initialData?: any;
}

export default function LetterForm({
  onSubmit,
  receivers,
  loading,
  defaultPengirim = "",
  initialData,
}: LetterFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      await onSubmit(formData);
      router.push("/dashboard/letters");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save letter");
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Pengirim"
          name="pengirim"
          defaultValue={initialData?.pengirim || defaultPengirim}
          required
        />

        <Input
          label="Tujuan"
          name="tujuan"
          defaultValue={initialData?.tujuan}
          required
        />

        <Input
          label="Nomor Surat"
          name="nomor_surat"
          defaultValue={initialData?.nomor_surat}
          required
        />

        <Input
          label="Tanggal Surat"
          name="tanggal_surat"
          type="date"
          defaultValue={initialData?.tanggal_surat}
          required
        />

        <Input
          label="Tanggal Masuk"
          name="tanggal_masuk"
          type="date"
          defaultValue={initialData?.tanggal_masuk}
          required
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Penerima
          </label>
          <select
            name="penerima_id"
            defaultValue={initialData?.penerima_id}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Pilih Penerima</option>
            {receivers.map((receiver) => (
              <option key={receiver.id} value={receiver.id}>
                {receiver.nama} ({receiver.email})
              </option>
            ))}
          </select>
        </div>
      </div>

      <Input
        label="Perihal"
        name="perihal"
        defaultValue={initialData?.perihal}
        required
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          File Surat (PDF/Docx)
        </label>
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx"
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required={!initialData}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Letter"}
        </Button>
      </div>
    </form>
  );
}
