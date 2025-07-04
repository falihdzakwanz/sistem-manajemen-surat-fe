"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiInbox, FiUsers, FiFilePlus } from "react-icons/fi";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 flex items-center justify-center px-4">
      <section className="w-full max-w-5xl space-y-12 py-16 text-center">
        <div className="space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold text-blue-700"
          >
            Selamat Datang di SIMAS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            SIMAS (Sistem Manajemen Surat) adalah sistem berbentuk website
            digital yang digunakan untuk mengelola surat SENAPATI secara modern,
            aman, dan efisien.
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold text-blue-700"
          >
            <Link href="/login">
              <button className="mt-4 px-7 py-3 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition font-medium text-base">
                Masuk ke SIMAS
              </button>
            </Link>
          </motion.h1>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
            {[
              {
                icon: (
                  <FiInbox className="text-blue-600 text-4xl mb-3 mx-auto" />
                ),
                title: "Manajemen Surat",
                desc: "Kelola manajemen surat secara terstruktur.",
              },
              {
                icon: (
                  <FiUsers className="text-purple-600 text-4xl mb-3 mx-auto" />
                ),
                title: "Manajemen Penerima",
                desc: "Atur data instansi penerima dengan mudah.",
              },
              {
                icon: (
                  <FiFilePlus className="text-yellow-600 text-4xl mb-3 mx-auto" />
                ),
                title: "Input Surat Baru",
                desc: "Tambahkan surat baru hanya dalam beberapa klik.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white border rounded-xl p-6 text-center shadow-sm hover:shadow-md"
              >
                {feature.icon}
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          <footer className="text-xs text-gray-500 mt-4 text-center pt-6">
            &copy; {new Date().getFullYear()} SIMAS - KOMINFO Pemerintah Kota
            Bandar Lampung.
            <br />
            Dikembangkan oleh tim magang: Falih, Bayu, Sakti, Fadhil dari
            Institut Teknologi Sumatera.{" "}
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Lihat di GitHub
            </a>
          </footer>
        </motion.div>
      </section>
    </main>
  );
}
