import { apiClient } from "@/app/api/client";
import { User } from "@/types";

export const userService = {
  async register(data: {
    email_instansi: string;
    password: string;
    nama_instansi: string;
    role: "admin" | "user";
  }) {
    return apiClient.post("/api/users", data);
  },

  async updateProfile(data: { nama_instansi?: string; password?: string }) {
    return apiClient.patch("/api/users/current", data);
  },

  // For admin only
  async getAllUsers() {
    return apiClient.get("/api/users");
  },

  // ✅ Tambahan: Get user by ID (for admin)
  async getById(id: number): Promise<User> {
    const response = await apiClient.get(`/api/users/${id}`);
    return response.data;
  },

  // ✅ Tambahan: Update user by ID (for admin)
  async update(
    id: number,
    data: {
      nama_instansi?: string;
      email_instansi?: string;
      password?: string;
      role?: "admin" | "user";
    }
  ) {
    return apiClient.put(`/api/users/${id}`, data);
  },

  // For admin only
  async deleteUser(id: number) {
    return apiClient.delete(`/api/users/${id}`);
  },
};
