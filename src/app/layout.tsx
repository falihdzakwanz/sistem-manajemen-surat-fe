import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SIMAS - Sistem Manajemen Surat Dinas KOMINFO Bandar Lampung",
  description:
    "Sistem Manajemen Surat Dinas Dinas Komunikasi dan Informatika Kota Bandar Lampung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">{children}</body>
    </html>
  );
}
