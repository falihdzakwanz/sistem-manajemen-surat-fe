import { apiClient } from "@/app/api/client";

export const userService = {
  async register(data: {
    email_instansi: string;
    password: string;
    nama_instansi: string;
    role: "admin" | "user";
  }) {
    return apiClient.post("/users", data);
  },

  async updateProfile(data: { nama_instansi?: string; password?: string }) {
    return apiClient.patch("/users/current", data);
  },

  // For admin only
  async getAllUsers() {
    return apiClient.get("/users");
  },

  // For admin only
  async deleteUser(id: number) {
    return apiClient.delete(`/users/${id}`);
  },
};
