"use client";

import { useRouter } from "next/navigation";
import ReceiverForm from "@/components/dashboard/ReceiverForm";
import AnimatedDiv from "@/components/ui/AnimatedDiv";
import { motion } from "framer-motion";
import useReceivers from "@/lib/hooks/useReceivers";

export default function AddReceiverPage() {
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  const { createReceiver } = useReceivers(token);

  const handleSubmit = async (data: { nama: string; email: string }) => {
    try {
      await createReceiver(data);
      router.push("/dashboard/receivers");
    } catch (error) {
      console.error("Failed to create receiver:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <AnimatedDiv>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-md p-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Add New Receiver
          </h1>
          <ReceiverForm onSubmit={handleSubmit} />
        </motion.div>
      </AnimatedDiv>
    </div>
  );
}
