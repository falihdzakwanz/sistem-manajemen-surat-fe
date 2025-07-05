import { useState } from "react";
import { FiFileText } from "react-icons/fi";

export function FilePreviewDownload({
  nomorRegistrasi,
}: {
  nomorRegistrasi: number;
}) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsDownloading(true);

    try {
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
      const token = Cookies.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/surat/${nomorRegistrasi}/file`,
        {
          headers: {
            "X-API-TOKEN": `${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengunduh file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `surat-${nomorRegistrasi}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Terdapat kesalahan saat mengunduh file", err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <a
      href="#"
      onClick={handleDownload}
      className={`inline-flex items-center gap-1 px-3 py-1.5 ${
        isDownloading ? "bg-slate-400" : "bg-slate-600 hover:bg-slate-700"
      } focus:ring-2 focus:ring-slate-500 text-white text-sm font-medium rounded-md transition`}
    >
      <FiFileText className={isDownloading ? "animate-spin" : ""} />
      {isDownloading ? "Mengunduh..." : "Lihat File"}
    </a>
  );
}
