"use client";

import { motion } from "framer-motion";
import Button from "../ui/Button";
import { formatDate } from "@/lib/utils";
import { User } from "@/types";
import { FiEdit2 } from "react-icons/fi";

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
      className="cursor-pointer hover:shadow-md transition h-full"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 h-full flex flex-col"
      >
        <div className="p-4 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {user.nama_instansi}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {user.email_instansi}
              </p>
            </div>
            <span className="bg-blue-100 text-blue-800 text-xs px-5 py-1 rounded-full whitespace-nowrap">
              {user.total_surat} surat
            </span>
          </div>

          <div className="mt-4 text-sm text-gray-700">
            <p>Added: {formatDate(user.created_at || new Date())}</p>
          </div>

          <div className="mt-4 flex space-x-2">
            {onEdit && (
              <Button
                size="sm"
                className="flex items-center gap-1 bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(user.id);
                }}
              >
                <FiEdit2 /> Edit
              </Button>
            )}
            {onDelete && (
              <Button
                variant="danger"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(user.id);
                }}
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
