"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/api/client";
import LetterForm from "@/components/dashboard/LetterForm";
import { User } from "@/types";
import { formatToDDMMYYYY } from "@/utils/dateFormat";

export default function LetterEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const [letter, setLetter] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch letter data
        const { data: letterData } = await apiClient.get(`/api/surat/${id}`);
        setLetter(letterData);

        // Fetch users list
        const { data: usersData } = await apiClient.get("/api/users");
        setUsers(usersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (formData: FormData) => {
    try {
      setLoading(true);
      await apiClient.put(`/api/surat/${id}`, formData);
      router.push("/dashboard/letters");
      router.refresh();
    } catch (err) {
      throw err instanceof Error ? err : new Error("Failed to update letter");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!letter) {
    return <div className="text-center py-12">Letter not found</div>;
  }

  // Format tanggal untuk form
  const initialFormData = {
    ...letter,
    tanggal_surat: formatToDDMMYYYY(letter.tanggal_surat),
    tanggal_masuk: formatToDDMMYYYY(letter.tanggal_masuk),
    user_id: letter.penerima?.user_id || letter.user_id,
  };

  return (
    <div className="ml-64 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Surat</h1>
      <LetterForm
        onSubmit={handleSubmit}
        users={users}
        loading={loading}
        initialData={initialFormData}
      />
    </div>
  );
}
