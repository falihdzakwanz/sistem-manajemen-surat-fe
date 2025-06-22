"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import useAuth from "@/lib/hooks/useAuth";

export default function LoginForm() {
  const [email_instansi, setEmail_instansi] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email_instansi, password);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 text-red-700 p-3 rounded-md"
        >
          {error}
        </motion.div>
      )}

      <Input
        label="Email"
        type="text"
        value={email_instansi}
        onChange={(e) => setEmail_instansi(e.target.value)}
        required
        className="text-black"
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="text-black"
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}
