// lib/utils.ts
export function formatDate(dateString: string | Date): string {
  if (dateString instanceof Date) {
    return dateString.toLocaleDateString("id-ID");
  }

  // Handle format DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(dateString)) {
    const [day, month, year] = dateString.split("-");
    const date = new Date(`${year}-${month}-${day}`);
    return date.toLocaleDateString("id-ID");
  }

  // Fallback untuk format lain
  try {
    return new Date(dateString).toLocaleDateString("id-ID");
  } catch {
    return dateString; // Return as-is jika parsing gagal
  }
}

export function formatDateTime(dateString: string | Date) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
