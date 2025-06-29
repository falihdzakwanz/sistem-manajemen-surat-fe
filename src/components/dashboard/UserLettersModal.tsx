"use client";

import { Letter, User } from "@/types";
import Modal from "@/components/ui/Modal";
import LetterCard from "@/components/dashboard/LetterCard";

interface UserLettersModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  letters: Letter[];
}

export default function UserLettersModal({
  isOpen,
  onClose,
  user,
  letters,
}: UserLettersModalProps) {
  if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Surat untuk ${user.nama_instansi}`}
    >
      <div className="space-y-4">
        {letters.length === 0 ? (
          <p className="text-gray-500 text-sm">
            Belum ada surat untuk user ini.
          </p>
        ) : (
          letters.map((letter) => (
            <LetterCard key={letter.id} letter={letter} isAdmin={true} />
          ))
        )}
      </div>
    </Modal>
  );
}
