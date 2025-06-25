import { apiClient } from "@/app/api/client";

export default function useUsers() {
  const registerUser = async (data: {
    nama_instansi: string;
    email_instansi: string;
    password: string;
    role: "admin" | "user";
  }) => {
    return apiClient.post("/api/users", data);
  };

  return {
    registerUser,
  };
}
