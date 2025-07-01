"use client";

import { useRouter } from "next/navigation";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Link from "next/link";
import useUserOperations from "@/hooks/useUserOperations";
import DeleteUserModal from "@/components/dashboard/DeleteUserModal";
import { useState } from "react";
import { formatToLocaleDate } from "@/utils/dateUtils";

export default function ReceiverDetailPage() {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {
    userData: user,
    loading,
    error,
    deleteUser,
    isDeleting,
    deleteError,
    setDeleteError,
  } = useUserOperations();

  const handleDeleteConfirm = async () => {
    if (!user) return;

    const success = await deleteUser(user.id, (user.total_surat || 0) > 0);

    if (success) {
      router.push("/dashboard/receivers");
    } else {
      setIsDeleteModalOpen(true); // Keep modal open if error occurs
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || deleteError) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md mx-4 my-6"
      >
        <p className="font-medium">Terjadi Kesalahan</p>
        <p>{error || deleteError}</p>
      </motion.div>
    );
  }

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 text-gray-600"
      >
        Data penerima tidak ditemukan
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <motion.h1
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-2xl font-bold text-gray-800"
        >
          Detail Penerima
        </motion.h1>
        <Link href="/dashboard/users">
          <Button variant="primary">Kembali ke Daftar Penerima</Button>
        </Link>
      </div>

      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
        >
          <div className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-500">
                Nama Instansi
              </h3>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {user.nama_instansi}
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="text-sm font-medium text-gray-500">
                Email Instansi
              </h3>
              <p className="mt-1 text-lg text-gray-900">
                {user.email_instansi}
              </p>
            </motion.div>

            {user.total_surat && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-sm font-medium text-gray-500">
                  Total Surat
                </h3>
                <p className="mt-1 text-lg text-gray-900">{user.total_surat}</p>
              </motion.div>
            )}

            {user.created_at && (
              <motion.div
                whileHover={{ scale: 1.01 }}
                className="p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-sm font-medium text-gray-500">
                  Tanggal Dibuat
                </h3>
                <p className="mt-1 text-lg text-gray-900">
                  {formatToLocaleDate(user.created_at)}
                </p>
              </motion.div>
            )}
          </div>

          <div className="mt-6 flex space-x-3">
            <Link href={`/dashboard/receivers/${user.id}/edit`}>
              <Button variant="warning">Edit</Button>
            </Link>
            <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
              Hapus
            </Button>
          </div>
        </motion.div>
      </AnimatedDiv>

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteError("");
        }}
        user={user}
        isDeleting={isDeleting}
        error={deleteError}
        onConfirm={handleDeleteConfirm}
      />
    </motion.div>
  );
}
