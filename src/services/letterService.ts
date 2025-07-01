import { apiClient } from "@/app/api/client";

export const letterService = {
  async createLetter(formData: FormData) {
    return apiClient.upload("/api/surat", formData);
  },

  async getLetters(forCurrentUser = false) {
    const endpoint = forCurrentUser ? "/api/surat/me" : "/api/surat";
    return apiClient.get(endpoint);
  },

  async getLetterDetails(nomorRegistrasi: number) {
    return apiClient.get(`/api/surat/${nomorRegistrasi}`);
  },

  async updateLetterStatus(
    nomorRegistrasi: number,
    status: "pending" | "diterima"
  ) {
    return apiClient.patch(`/api/surat/${nomorRegistrasi}/status`, { status });
  },

  async updateLetter(nomorRegistrasi: string | number, formData: FormData) {
    const id =
      typeof nomorRegistrasi === "string"
        ? parseInt(nomorRegistrasi, 10)
        : nomorRegistrasi;

    if (isNaN(id)) {
      throw new Error("Invalid nomor registrasi");
    }

    return apiClient.put(`/api/surat/${id}`, formData);
  },

  async downloadLetterFile(nomorRegistrasi: number) {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token not found");
    }
  
    try {
      // Gunakan URL dari environment variable atau fallback ke origin saat ini
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || window.location.origin;
      const url = `${apiUrl}/api/surat/${nomorRegistrasi}/file`;
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "X-API-TOKEN": token,
          // Tidak perlu Content-Type untuk GET request download file
        },
        // credentials: 'include', // Sesuaikan dengan kebutuhan CORS backend
        mode: 'cors', // Pastikan mode CORS
        cache: 'no-store' // Hindari cache untuk file yang selalu update
      });
  
      // Handle error responses
      if (!response.ok) {
        // Coba parse error message dari response JSON
        let errorMessage = `Failed to download file (${response.status})`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.warn("Failed to parse error response", e);
        }
        throw new Error(errorMessage);
      }
  
      // Verifikasi content type
      const contentType = response.headers.get("content-type");
      const validContentTypes = [
        'application/pdf',
        'application/octet-stream',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ];
      
      if (contentType && !validContentTypes.some(t => contentType.includes(t))) {
        throw new Error(`Invalid file type: ${contentType}`);
      }
  
      // Ekstrak nama file dari header
      const contentDisposition = response.headers.get("content-disposition");
      let filename = `surat-${nomorRegistrasi}`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename\*?=['"]?(?:UTF-\d['"]*)?([^;\r\n"']*)['"]?/i);
        if (filenameMatch && filenameMatch[1]) {
          filename = decodeURIComponent(filenameMatch[1]);
        } else {
          const fallbackMatch = contentDisposition.match(/filename=['"]?([^'"]+)['"]?/i);
          if (fallbackMatch && fallbackMatch[1]) {
            filename = fallbackMatch[1];
          }
        }
      }
  
      // Tambahkan ekstensi jika belum ada
      if (!filename.includes('.')) {
        const extension = contentType?.split('/')[1] || 'pdf';
        filename += `.${extension}`;
      }
  
      const blob = await response.blob();
      
      return {
        blob,
        filename,
        contentType: contentType || 'application/octet-stream',
        size: blob.size
      };
    } catch (error) {
      console.error('Download error:', error);
      
      // Tambahkan pesan error yang lebih spesifik
      if (error instanceof TypeError) {
        if (error.message === 'Failed to fetch') {
          throw new Error(
            'Koneksi gagal. Periksa: \n' +
            '1. Koneksi internet Anda\n' +
            '2. Apakah server API sedang online\n' +
            '3. Ekstensi browser yang mungkin memblokir request'
          );
        }
      }
      
      throw error instanceof Error ? error : new Error('Unknown download error');
    }
  },

  async deleteLetter(nomorRegistrasi: number) {
    return apiClient.delete(`/api/surat/${nomorRegistrasi}`);
  },
};
