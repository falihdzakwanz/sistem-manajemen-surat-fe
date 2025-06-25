"use client";

import { useState, useEffect } from "react";
import UserCard from "@/components/dashboard/UserCard";
import LetterCard from "@/components/dashboard/LetterCard";
import Modal from "@/components/ui/Modal";
import { apiClient } from "@/app/api/client";
import { motion } from "framer-motion";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Letter, User } from "@/types";
import { useRouter } from "next/navigation";

export default function ReceiverList() {
  const [users, setUsers] = useState<User[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch all users (admin-only endpoint)
        const usersResponse = await apiClient.get("/api/users");
        // Filter out admin users
        const userReceivers = usersResponse.data.filter(
          (user: User) => user.role !== "admin"
        );
        setUsers(userReceivers);

        // Fetch all letters (admin-only endpoint)
        const lettersResponse = await apiClient.get("/api/surat");
        setLetters(lettersResponse.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Gagal memuat data penerima"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const lettersForReceiver = selectedUser
    ? letters.filter((letter) => letter.penerima_id === selectedUser.id)
    : [];

  if (loading) {
    return (
      <div className="relative p-6 ml-64 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative p-6 ml-64">
        <div className="bg-red-100 text-red-700 p-4 rounded-md">{error}</div>
      </div>
    );
  }

  return (
    <div className="relative p-6 ml-64">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
            onEdit={(id) => router.push(`/dashboard/users/${id}/edit`)}
          />
        ))}
      </motion.div>

      {/* Modal popup tampil jika selectedUser ada */}
      {selectedUser && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedUser(null)}
          title={`Surat untuk ${selectedUser.nama_instansi}`}
        >
          <div className="space-y-4">
            {lettersForReceiver.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Belum ada surat untuk penerima ini.
              </p>
            ) : (
              lettersForReceiver.map((letter) => (
                <LetterCard key={letter.id} letter={letter} />
              ))
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
