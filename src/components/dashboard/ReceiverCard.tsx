"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { formatDate } from "@/lib/utils";

interface ReceiverCardProps {
  receiver: {
    id: number;
    nama: string;
    email: string;
    total_surat: number;
    created_at: string;
  };
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export default function ReceiverCard({
  receiver,
  onEdit,
  onDelete,
}: ReceiverCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
    >
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {receiver.nama}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{receiver.email}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {receiver.total_surat} surat
          </span>
        </div>

        <div className="mt-4 text-sm text-gray-700">
          <p>Added: {formatDate(receiver.created_at)}</p>
        </div>

        <div className="mt-4 flex space-x-2">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(receiver.id)}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onDelete(receiver.id)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
