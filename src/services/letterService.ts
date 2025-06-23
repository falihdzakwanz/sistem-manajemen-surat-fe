import { apiClient } from "@/app/api/client";

export const letterService = {
  async createLetter(formData: FormData) {
    return apiClient.upload("/surat", formData);
  },

  async getLetters(forCurrentUser = false) {
    const endpoint = forCurrentUser ? "/surat/me" : "/surat";
    return apiClient.get(endpoint);
  },

  async getLetterDetails(nomorRegistrasi: number) {
    return apiClient.get(`/surat/${nomorRegistrasi}`);
  },

  async updateLetterStatus(
    nomorRegistrasi: number,
    status: "pending" | "diterima"
  ) {
    return apiClient.patch(`/surat/${nomorRegistrasi}/status`, { status });
  },

  async updateLetter(nomorRegistrasi: number, formData: FormData) {
    return apiClient.upload(`/surat/${nomorRegistrasi}`, formData);
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
    return apiClient.delete(`/surat/${nomorRegistrasi}`);
  },
};
