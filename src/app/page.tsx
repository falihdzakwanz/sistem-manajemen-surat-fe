"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiInbox, FiSend, FiUsers, FiFilePlus } from "react-icons/fi";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="bg-white py-16 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-4"
        >
          Kelola Surat Masuk & Keluar dengan Mudah
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-gray-600 max-w-xl mx-auto"
        >
          Sistem manajemen surat digital untuk efisiensi kerja dan pelacakan
          dokumen secara real-time.
        </motion.p>
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/login">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Masuk
            </button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-14 px-6">
        <h2 className="text-2xl font-bold text-center mb-10">Fitur Unggulan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: <FiInbox className="text-blue-600 text-3xl mb-3" />,
              title: "Surat Masuk",
              desc: "Kelola surat masuk secara efisien dan terorganisir.",
            },
            {
              icon: <FiSend className="text-green-600 text-3xl mb-3" />,
              title: "Surat Keluar",
              desc: "Kirim surat keluar dengan mudah dan cepat.",
            },
            {
              icon: <FiUsers className="text-purple-600 text-3xl mb-3" />,
              title: "Manajemen Penerima",
              desc: "Tambahkan dan atur daftar penerima surat.",
            },
            {
              icon: <FiFilePlus className="text-yellow-600 text-3xl mb-3" />,
              title: "Tambah Surat",
              desc: "Input surat masuk atau keluar hanya dalam hitungan detik.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow p-6 text-center"
            >
              {f.icon}
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Sistem Manajemen Surat. All rights
        reserved.
      </footer>
    </main>
  );
}
