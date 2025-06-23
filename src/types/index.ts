export interface User {
  id: number;
  email_instansi: string;
  nama_instansi: string;
  token?: string;
  role: "admin" | "user";
}

export interface Receiver {
  id: number;
  nama: string;
  email: string;
  total_surat?: number;
  created_at?: string;
  updated_at?: string;
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
