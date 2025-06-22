"use client";

import { useState } from "react";
import ReceiverCard from "@/components/dashboard/ReceiverCard";
import LetterCard from "@/components/dashboard/LetterCard";
import { dummyUser, dummyLetters } from "@/lib/dummy";
import Modal from "@/components/ui/Modal";

export default function DummyReceiverList() {
  const [selectedReceiver, setSelectedReceiver] = useState(null);

  const lettersForReceiver = selectedReceiver
    ? dummyLetters.filter(
        (letter) => letter.penerima_id === selectedReceiver.id
      )
    : [];

  return (
    <div className="relative p-6 ml-64">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyUser
          .filter((user) => user.role !== "admin")
          .map((receiver) => (
            <ReceiverCard
              key={receiver.id}
              receiver={receiver}
              onClick={() => setSelectedReceiver(receiver)}
            />
          ))}
      </div>

      {/* Modal popup tampil jika selectedReceiver ada */}
      {selectedReceiver && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedReceiver(null)}
          title={`Surat untuk ${selectedReceiver.nama_instansi}`}
        >
          <div className="space-y-4">
            {lettersForReceiver.length === 0 ? (
              <p className="text-gray-500 text-sm">
                Belum ada surat untuk penerima ini.
              </p>
            ) : (
              lettersForReceiver.map((letter) => (
                <LetterCard key={letter.id} letter={letter} />
              ))
            )}
          </div>
        </Modal>
      )}
    </div>
  );
}
