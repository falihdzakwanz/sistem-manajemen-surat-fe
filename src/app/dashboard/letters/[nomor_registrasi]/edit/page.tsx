"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import LetterForm from "@/components/dashboard/LetterForm";
import { parseDDMMYYYYToDate } from "@/utils/dateFormat";
import useUsers from "@/hooks/useUsers";
import useLetterDetail from "@/hooks/useLetterDetail";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { apiClient } from "@/app/api/client";

export default function LetterEditPage() {
  const { nomor_registrasi } = useParams();
  const router = useRouter();
  const {
    letter,
    loading: letterLoading,
    error: letterError,
  } = useLetterDetail(nomor_registrasi as string);
  const { users, loading: usersLoading, error: usersError } = useUsers();

  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    try {
      setSubmitLoading(true);
      setSubmitError(null);

      await apiClient.put(`/api/surat/${nomor_registrasi}`, formData);

      router.push("/dashboard/letters");
      router.refresh();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to update letter";
      setSubmitError(errorMessage);
      throw err;
    } finally {
      setSubmitLoading(false);
    }
  };

  const isLoading = letterLoading || usersLoading;

  const error = letterError || usersError || submitError;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!letter) {
    return <div className="text-center py-12">Letter not found</div>;
  }

  const initialFormData = {
    ...letter,
    tanggal_surat: parseDDMMYYYYToDate(letter.tanggal_surat),
    tanggal_masuk: parseDDMMYYYYToDate(letter.tanggal_masuk),
  };

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Surat</h1>
      <LetterForm
        onSubmit={handleSubmit}
        users={users}
        loading={submitLoading}
        initialData={initialFormData}
      />
    </div>
  );
}
