import { apiClient } from "@/app/api/client";

export const letterService = {
  async createLetter(formData: FormData) {
    return apiClient.upload("/api/surat", formData);
  },

  async getLetters(forCurrentUser = false) {
    const endpoint = forCurrentUser ? "/api/surat/me" : "/api/surat";
    return apiClient.get(endpoint);
  },

  async getLetterDetails(nomorRegistrasi: number) {
    return apiClient.get(`/api/surat/${nomorRegistrasi}`);
  },

  async updateLetterStatus(
    nomorRegistrasi: number,
    status: "pending" | "diterima"
  ) {
    return apiClient.patch(`/api/surat/${nomorRegistrasi}/status`, { status });
  },

  async updateLetter(nomorRegistrasi: string | number, formData: FormData) {
    const id =
      typeof nomorRegistrasi === "string"
        ? parseInt(nomorRegistrasi, 10)
        : nomorRegistrasi;

    if (isNaN(id)) {
      throw new Error("Invalid nomor registrasi");
    }

    return apiClient.put(`/api/surat/${id}`, formData);
  },

  async downloadLetterFile(nomorRegistrasi: number) {
    try {
      const response = await fetch(`/api/surat/${nomorRegistrasi}/file`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const contentDisposition = response.headers.get("content-disposition");
      const filename = contentDisposition
        ? contentDisposition.split("filename=")[1].replace(/"/g, "")
        : `surat-${nomorRegistrasi}.pdf`;

      return { blob, filename };
    } catch (error) {
      console.error("Download error:", error);
      throw new Error(
        "Koneksi gagal. Periksa:\n" +
          "1. Koneksi internet Anda\n" +
          "2. Apakah server API sedang online\n" +
          "3. Ekstensi browser yang mungkin memblokir request"
      );
    }
  },

  async deleteLetter(nomorRegistrasi: number) {
    return apiClient.delete(`/api/surat/${nomorRegistrasi}`);
  },
};
