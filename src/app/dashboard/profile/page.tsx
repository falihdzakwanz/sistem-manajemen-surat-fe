"use client";

import { motion } from "framer-motion";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import Button from "@/components/ui/Button";
import { FiEdit, FiKey, FiLogOut } from "react-icons/fi";
import { dummyUser, dummyLetters } from "@/lib/dummy";

export default function ProfilePage() {
  // Simulasi login: ambil user pertama dari dummy
  const currentUser = dummyUser.find((u) => u.role === "admin") || dummyUser[0];

  // Hitung jumlah surat masuk berdasarkan user (berdasarkan nama pengguna sebagai penerima)
  const userSuratMasuk = dummyLetters.filter(
    (l) => l.tujuan === currentUser.email_instansi
  );

  // Dummy last login tetap
  const lastLogin = "2025-06-17T10:30:00Z";

  const logout = () => {
    alert("Logout clicked (dummy mode)");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Profil Pengguna
          </h1>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm text-gray-500">
                Nama Lengkap / email_instansi
              </h3>
              <p className="text-lg text-gray-800 font-medium">
                {currentUser?.name} ({currentUser?.email_instansi})
              </p>
            </div>

            <div>
              <h3 className="text-sm text-gray-500">Peran</h3>
              <p className="text-gray-700 capitalize">{currentUser?.role}</p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <FiKey /> Ganti Password
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 text-sm"
              >
                <FiEdit /> Edit Profil
              </Button>
              <Button
                variant="danger"
                className="flex items-center gap-2 text-sm"
                onClick={logout}
              >
                <FiLogOut /> Logout
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatedDiv>

      <AnimatedDiv delay={0.1}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Aktivitas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-blue-600">
                {userSuratMasuk.length}
              </p>
              <p className="text-gray-600">Surat Masuk</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">0</p>
              <p className="text-gray-600">Surat Keluar</p>
            </div>
            <div>
              <p className="text-md text-gray-700">
                {new Date(lastLogin).toLocaleString("id-ID", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <p className="text-gray-600">Terakhir Login</p>
            </div>
          </div>
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
