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
  return `${year}-${month}-${day}`; // Format yang bisa dipahami Date
};

// utils/dateUtils.ts
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