"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { formatDate } from "@/lib/utils";
import { User } from "@/types";

interface ReceiverCardProps {
  user: User;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onClick?: () => void;
}

export default function ReceiverCard({
  user,
  onEdit,
  onDelete,
  onClick,
}: ReceiverCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer hover:shadow-md transition"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
      >
        <div className="p-4">
          {/* 👇 Surat badge in top-right corner */}
          <span className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {user.total_surat} surat
          </span>

          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {user.nama_instansi}
            </h3>
            <p className="text-sm text-gray-600 mt-1">{user.email_instansi}</p>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <p>Added: {formatDate(user.created_at || new Date())}</p>
          </div>

          <div className="mt-4 flex space-x-2">
            {onEdit && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  onEdit(user.id);
                }}
              >
                Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(user.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
