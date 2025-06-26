export const formatToDDMMYYYY = (dateString: string | undefined | Date): string => {
  if (!dateString) return "";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export const parseDDMMYYYYToDate = (ddmmyyyy: string): string => {
  if (!ddmmyyyy) return "";

  const [day, month, year] = ddmmyyyy.split("-");
  return `${year}-${month}-${day}`;
};

export function convertDDMMYYYYToYYYYMMDD(dateString: string): string {
  if (!dateString) return "";
  
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString; // Return as-is if format invalid
  
  const [day, month, year] = parts;
  
  // Validate day, month, year
  if (day.length !== 2 || month.length !== 2 || year.length !== 4) {
    return dateString;
  }
  
  return `${year}-${month}-${day}`;
}

export function formatToMMDDYYYY(dateString: string): string {
  const parts = dateString.split("-");

  if (
    parts.length !== 3 ||
    parts[0].length !== 2 ||
    parts[1].length !== 2 ||
    parts[2].length !== 4
  ) {
    throw new Error("Format tanggal tidak valid. Harus dd-mm-yyyy");
  }

  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  return `${month}-${day}-${year}`;
}
