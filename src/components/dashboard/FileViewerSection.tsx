import { useState } from "react";
import { letterService } from "@/services/letterService";

interface FileViewerSectionProps {
  fileUrl: string;
  nomorRegistrasi: number;
}

export default function FileViewerSection({
  fileUrl,
  nomorRegistrasi,
}: FileViewerSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setError("");

      const blob = await letterService.downloadLetterFile(nomorRegistrasi);

      // Membuat URL objek dari blob
      const url = window.URL.createObjectURL(blob);

      // Membuat elemen anchor untuk download
      const a = document.createElement("a");
      a.href = url;
      a.download = fileUrl.split("/").pop() || `surat-${nomorRegistrasi}.pdf`;
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal mengunduh file");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-500">Berkas</h3>
      <div className="mt-2 flex gap-3">
        {/* Tombol Download */}
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className="inline-flex items-center text-green-600 hover:underline disabled:opacity-50"
        >
          {isDownloading ? "Mengunduh..." : "Unduh Dokumen"}
          {isDownloading && (
            <svg
              className="animate-spin -mr-1 ml-2 h-4 w-4 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
