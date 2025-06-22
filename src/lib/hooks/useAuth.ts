// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { apiClient } from "@/app/api/client";

// export default function useAuth() {
//   const [user, setUser] = useState<{ email_instansi: string; name: string } | null>(
//     null
//   );
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     const fetchUser = async () => {
//       try {
//         const { data } = await apiClient.get("/users/current", token);
//         setUser(data);
//       } catch (error) {
//         localStorage.removeItem("token");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const login = async (email_instansi: string, password: string) => {
//     try {
//       const { data } = await apiClient.post("/users/login", {
//         email_instansi,
//         password,
//       });
//       localStorage.setItem("token", data.token);
//       setUser({ email_instansi: data.email_instansi, name: data.name });
//       return data;
//     } catch (error) {
//       throw error instanceof Error ? error : new Error("Login failed");
//     }
//   };
//   const logout = async () => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         await apiClient.delete("/users/current", token);
//       } catch (error) {
//         console.error("Logout error:", error);
//       }
//     }
//     localStorage.removeItem("token");
//     setUser(null);
//     router.push("/login");
//   };

//   return { user, loading, login, logout };
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { dummyUser } from "@/lib/dummy";

export default function useAuth() {
  const [user, setUser] = useState<{
    email_instansi: string;
    nama_instansi: string;
    role: "admin" | "user";
    id: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email_instansi: string, password: string) => {
    const found = dummyUser.find(
      (u) => u.email_instansi === email_instansi && u.password === password
    );
    if (!found) throw new Error("Email atau password salah");

    // Filter hanya properti penting
    const { nama_instansi, role, id } = found;
    const filteredUser = { email_instansi, nama_instansi, role, id };

    localStorage.setItem("user", JSON.stringify(filteredUser));
    setUser(filteredUser);
    return filteredUser;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return { user, loading, login, logout };
}
