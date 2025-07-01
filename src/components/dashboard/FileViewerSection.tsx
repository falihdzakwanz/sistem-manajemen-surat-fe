import { useState } from "react";
import { letterService } from "@/services/letterService";

interface FileViewerSectionProps {
  fileUrl: string;
  nomorRegistrasi: number;
  className?: string;
}

export default function FileViewerSection({
  fileUrl,
  nomorRegistrasi,
  className = "",
}: FileViewerSectionProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      setError("");
      setProgress(0);

      const { blob, filename } = await letterService.downloadLetterFile(
        nomorRegistrasi
      );

      // Membuat URL objek dari blob
      const url = window.URL.createObjectURL(blob);

      // Membuat elemen anchor untuk download
      const a = document.createElement("a");
      a.href = url;
      a.download =
        filename || fileUrl.split("/").pop() || `surat-${nomorRegistrasi}.pdf`;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();

      // Cleanup
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 100);
    } catch (err) {
      console.log(err)
      console.error("Download error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Gagal mengunduh file. Silakan coba lagi."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className={`mt-6 ${className}`}>
      <h3 className="text-sm font-medium text-gray-500">Berkas</h3>
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          {/* Tombol Download */}
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className={`inline-flex items-center text-green-600 hover:underline disabled:opacity-50 ${
              error ? "text-red-600" : ""
            }`}
            aria-label="Unduh dokumen"
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

          {/* Tampilkan ukuran file jika tersedia */}
          {fileUrl && (
            <span className="text-xs text-gray-500">
              {fileUrl.split("/").pop()}
            </span>
          )}
        </div>

        {/* Progress bar */}
        {isDownloading && (
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="bg-green-600 h-1.5 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-500 animate-fade-in">
            {error}
            <button
              onClick={() => setError("")}
              className="ml-2 text-red-400 hover:text-red-600"
              aria-label="Tutup pesan error"
            >
              &times;
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
