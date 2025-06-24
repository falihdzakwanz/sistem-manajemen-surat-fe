// import { Receiver } from "@/types";

// Dummy Data File for Letters and Receivers
export interface User {
  id: number;
  nama_instansi: string;
  token?: string;
  role: "admin" | "user";
  password: string;
  email_instansi?: string;
  total_surat?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
}
export interface Letter {
  id: number;
  nomor_registrasi: number;
  pengirim: string;
  tujuan: string;
  nomor_surat: string;
  tanggal_masuk: string | Date;
  tanggal_surat: string | Date;
  perihal: string;
  file_url: string;
  status: "pending" | "diterima";
  penerima_id: number;
  penerima?: Receiver;
  created_at?: string | Date;
  updated_at?: string | Date;
}

export const dummyUser: User[] = [
  {
    id: 0,
    nama_instansi: "Kominfo Bandar Lampung",
    role: "admin",
    password: "rahasia",
    email_instansi: "kominfobalam@lampung.go.id",
    total_surat: 0,
    created_at: "2025-06-10T10:15:00Z",
  },
  {
    id: 1,
    nama_instansi: "Dinas Pendidikan",
    role: "user",
    password: "rahasia2",
    email_instansi: "dikbud@lampung.go.id",
    total_surat: 2,
    created_at: "2025-06-10T10:15:00Z",
  },
  {
    id: 2,
    nama_instansi: "Dinas Kesehatan",
    role: "user",
    password: "rahasia3",
    email_instansi: "dinkes@lampung.go.id",
    total_surat: 2,
    created_at: "2025-06-08T09:30:00Z",
  },
  {
    id: 3,
    nama_instansi: "Kecamatan Sukamaju",
    role: "user",
    password: "rahasia4",
    email_instansi: "kec.sukamaju@example.com",
    total_surat: 2,
    created_at: "2025-06-05T08:45:00Z",
  },
];

export const dummyLetters: Letter[] = [
  {
    id: 1,
    nomor_registrasi: 1,
    pengirim: "Kemendikbud",
    tujuan: "Dinas Pendidikan",
    nomor_surat: "001/2023",
    tanggal_surat: "2025-06-10",
    tanggal_masuk: "2025-06-14",
    perihal: "Permohonan Data",
    file_url: "http://localhost:3000/uploads/surat-1.pdf",
    status: "pending",
    penerima_id: 1,
    created_at: "2025-06-10T10:00:00Z",
  },
  {
    id: 2,
    nomor_registrasi: 2,
    pengirim: "Kemensos",
    tujuan: "Dinas Kesehatan",
    nomor_surat: "002/2023",
    tanggal_surat: "2025-06-11",
    tanggal_masuk: "2025-06-15",
    perihal: "Permintaan Jadwal Pemeriksaan",
    file_url: "http://localhost:3000/uploads/surat-2.pdf",
    status: "diterima",
    penerima_id: 2,
    created_at: "2025-06-11T09:30:00Z",
    updated_at: "2025-06-11T12:00:00Z",
  },
  {
    id: 3,
    nomor_registrasi: 3,
    pengirim: "Kecamatan Sukamaju",
    tujuan: "Kecamatan Sukamaju",
    nomor_surat: "003/2023",
    tanggal_surat: "2025-06-12",
    tanggal_masuk: "2025-06-16",
    perihal: "Permohonan Data Penduduk",
    file_url: "http://localhost:3000/uploads/surat-3.pdf",
    status: "pending",
    penerima_id: 3,
    created_at: "2025-06-12T08:00:00Z",
    updated_at: "2025-06-12T08:30:00Z",
  },
  {
    id: 4,
    nomor_registrasi: 4,
    pengirim: "Kemenhub",
    tujuan: "Dinas Pendidikan",
    nomor_surat: "004/2023",
    tanggal_surat: "2025-06-13",
    tanggal_masuk: "2025-06-17",
    perihal: "Permintaan Pemasangan Rambu",
    file_url: "http://localhost:3000/uploads/surat-4.pdf",
    status: "pending",
    penerima_id: 1,
    created_at: "2025-06-13T11:15:00Z",
  },
  {
    id: 5,
    nomor_registrasi: 5,
    pengirim: "BNPB",
    tujuan: "Dinas Kesehatan",
    nomor_surat: "005/2023",
    tanggal_surat: "2025-06-14",
    tanggal_masuk: "2025-06-18",
    perihal: "Distribusi Bantuan Tahap II",
    file_url: "http://localhost:3000/uploads/surat-5.pdf",
    status: "diterima",
    penerima_id: 2,
    created_at: "2025-06-14T10:30:00Z",
    updated_at: "2025-06-14T12:00:00Z",
  },
  {
    id: 6,
    nomor_registrasi: 6,
    pengirim: "Kecamatan Sukamaju",
    tujuan: "Kecamatan Sukamaju",
    nomor_surat: "006/2023",
    tanggal_surat: "2025-06-15",
    tanggal_masuk: "2025-06-19",
    perihal: "Pemberitahuan Musyawarah RT",
    file_url: "http://localhost:3000/uploads/surat-6.pdf",
    status: "pending",
    penerima_id: 3,
    created_at: "2025-06-15T09:00:00Z",
  },
];
