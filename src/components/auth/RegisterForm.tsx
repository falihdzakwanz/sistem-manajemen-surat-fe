"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email_instansi: "",
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_instansi: formData.email_instansi,
          name: formData.name,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      router.push("/login?registered=true");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        label="email_instansi"
        name="email_instansi"
        type="text"
        value={formData.email_instansi}
        onChange={handleChange}
        required
        minLength={3}
        className="text-black"
      />

      <Input
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        required
        className="text-black"
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={6}
        className="text-black"
      />

      <Input
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        required
        minLength={6}
        className="text-black"
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
}
