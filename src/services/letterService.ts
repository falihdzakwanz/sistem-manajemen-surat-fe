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

  async updateLetter(nomorRegistrasi: number, formData: FormData) {
    return apiClient.upload(`/api/surat/${nomorRegistrasi}`, formData);
  },

  async downloadLetterFile(nomorRegistrasi: number) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api"
      }/surat/${nomorRegistrasi}/file`,
      {
        headers: {
          "X-API-TOKEN": token || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to download file");
    }

    return response.blob();
  },

  async deleteLetter(nomorRegistrasi: number) {
    return apiClient.delete(`/api/surat/${nomorRegistrasi}`);
  },
};
