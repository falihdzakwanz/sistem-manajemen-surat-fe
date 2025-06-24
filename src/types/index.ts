export interface User {
  id: number;
  email_instansi: string;
  nama_instansi: string;
  token?: string;
  role: "admin" | "user";
  total_surat: number;
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
  penerima?: User;
  created_at?: string | Date;
  updated_at?: string | Date;
}