"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { apiClient } from "@/app/api/client";
import { Receiver } from "@/types";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ReceiverDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [receiver, setReceiver] = useState<Receiver | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    const fetchReceiver = async () => {
      try {
        const { data } = await apiClient.get(`/penerima/${id}`, token);
        setReceiver(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch receiver"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReceiver();
  }, [id, token]);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this receiver?")) {
      try {
        await apiClient.delete(`/penerima/${id}`, token);
        router.push("/dashboard/receivers");
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to delete receiver"
        );
      }
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

  if (!receiver) {
    return <div className="text-center py-12">Receiver not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Receiver Details</h1>
        <Link href="/dashboard/receivers">
          <Button variant="outline">Back to Receivers</Button>
        </Link>
      </div>

      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1 text-gray-900">{receiver.nama}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Email</h3>
              <p className="mt-1 text-gray-900">{receiver.email}</p>
            </div>

            {receiver.total_surat && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Letters
                </h3>
                <p className="mt-1 text-gray-900">{receiver.total_surat}</p>
              </div>
            )}

            {receiver.created_at && (
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Created At
                </h3>
                <p className="mt-1 text-gray-900">
                  {formatDate(receiver.created_at)}
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 flex space-x-3">
            <Link href={`/dashboard/receivers/${id}/edit`}>
              <Button variant="outline">Edit</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
