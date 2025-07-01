"use client";

import { useState } from "react";
import { User } from "@/types";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { userService } from "@/services/userService"; // Sesuaikan path import

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onProfileUpdate?: (updatedUser: User) => void; // Optional callback untuk update UI
  onSuccess?: () => void; // Optional callback untuk success feedback
}

export default function ProfileModal({
  isOpen,
  onClose,
  user,
  onProfileUpdate,
  onSuccess,
}: ProfileModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!user) return null;

  // Reset form ketika modal dibuka/ditutup
  const handleClose = () => {
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setShowSuccess(false);
    onClose();
  };

  const validatePasswords = () => {
    if (!newPassword.trim()) {
      setError("Password baru tidak boleh kosong.");
      return false;
    }

    if (newPassword.length < 6) {
      setError("Password minimal 6 karakter.");
      return false;
    }

    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi tidak cocok.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setError("");
    setShowSuccess(false);

    if (!validatePasswords()) {
      return;
    }

    setIsLoading(true);

    try {
      // Menggunakan userService yang sudah ada
      const response = await userService.updateProfile({
        password: newPassword,
      });

      // Jika ada callback untuk update UI
      if (onProfileUpdate && response.data) {
        onProfileUpdate(response.data);
      }

      // Tampilkan success message
      setShowSuccess(true);

      // Optional callback untuk success
      if (onSuccess) {
        onSuccess();
      }

      // Auto close setelah 2 detik atau biarkan user close manual
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err: any) {
      // Handle error response dari API
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat mengubah password.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key untuk submit
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Ganti Password"
      size="md"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password Baru
          </label>
          <Input
            label="Password Baru"
            type="password"
            placeholder="Masukkan password baru"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className={`w-full text-gray-600 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Konfirmasi Password
          </label>
          <Input
            label="Konfirmasi Password Baru"
            type="password"
            placeholder="Konfirmasi password baru"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className={`w-full text-gray-600 px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 transition-colors ${
              error
                ? "border-red-500 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-300"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        {showSuccess && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-600 text-sm font-medium flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Password berhasil diubah!
            </p>
          </div>
        )}

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            onClick={handleClose}
            disabled={isLoading}
            className="rounded-xl bg-gray-500 hover:bg-gray-600 text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="rounded-xl bg-green-600 hover:bg-green-700 text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {isLoading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
