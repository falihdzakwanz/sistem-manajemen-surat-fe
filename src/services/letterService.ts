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

  async deleteLetter(nomorRegistrasi: number) {
    return apiClient.delete(`/api/surat/${nomorRegistrasi}`);
  },
};
