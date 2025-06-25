"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { User } from "@/types";
import {
  convertDDMMYYYYToYYYYMMDD,
  formatToDDMMYYYY,
} from "@/utils/dateFormat";

interface LetterFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  users: User[];
  loading: boolean;
  initialData?: any;
}

export default function LetterForm({
  onSubmit,
  users,
  loading,
  initialData,
}: LetterFormProps) {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);

    // Konversi tanggal sebelum dikirim
    const rawTanggalSurat = formData.get("tanggal_surat") as string;
    const rawTanggalMasuk = formData.get("tanggal_masuk") as string;

    // Format ke dd-mm-yyyy
    formData.set("tanggal_surat", formatToDDMMYYYY(rawTanggalSurat));
    formData.set("tanggal_masuk", formatToDDMMYYYY(rawTanggalMasuk));

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
          defaultValue={initialData?.pengirim}
          required
          className="text-black"
        />

        <Input
          label="Nomor Surat"
          name="nomor_surat"
          defaultValue={initialData?.nomor_surat}
          required
          className="text-black"
        />

        <Input
          label="Tanggal Surat"
          name="tanggal_surat"
          type="date"
          defaultValue={
            initialData?.tanggal_surat?.includes("-")
              ? convertDDMMYYYYToYYYYMMDD(initialData.tanggal_surat)
              : initialData?.tanggal_surat?.split("T")[0]
          }
          required
          className="text-black"
        />

        <Input
          label="Tanggal Masuk"
          name="tanggal_masuk"
          type="date"
          defaultValue={
            initialData?.tanggal_masuk?.includes("-")
              ? convertDDMMYYYYToYYYYMMDD(initialData.tanggal_masuk)
              : initialData?.tanggal_masuk?.split("T")[0]
          }
          required
          className="text-black"
        />

        <div className="space-y-1 text-black">
          <label className="block text-sm font-medium text-gray-700">
            Penerima
          </label>
          <select
            name="user_id" // Changed to match API spec
            defaultValue={
              initialData?.penerima?.user_id || initialData?.user_id
            }
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            disabled={loading}
          >
            <option value="">Pilih Penerima</option>
            {users
              .filter((user) => user.role !== "admin")
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.nama_instansi} ({user.email_instansi})
                </option>
              ))}
          </select>
        </div>

        <Input
          label="Tujuan"
          name="tujuan"
          defaultValue={initialData?.tujuan}
          required
          className="text-black"
        />
      </div>

      <Input
        label="Perihal"
        name="perihal"
        defaultValue={initialData?.perihal}
        required
        className="text-black"
      />

      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          File Surat (PDF/Docx)
        </label>
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx"
          className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required={!initialData?.file_url} // Only required for new letters
          disabled={loading}
        />
        {initialData?.file_url && (
          <p className="text-sm text-gray-500 mt-1">
            Current file: {initialData.file_url.split("/").pop()}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan Surat"}
        </Button>
      </div>
    </form>
  );
}
