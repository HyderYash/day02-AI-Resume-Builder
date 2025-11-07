/**
 * Format date string to "MMM YYYY" format (e.g., "Jan 2020")
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  
  // If already in "MMM YYYY" format, return as is
  if (/^[A-Za-z]{3}\s\d{4}$/.test(dateString.trim())) {
    return dateString.trim();
  }
  
  // Try to parse various date formats
  const date = new Date(dateString);
  
  // Check if date is valid
  if (isNaN(date.getTime())) {
    // If not a valid date, try to extract month and year
    const monthYearMatch = dateString.match(/(\d{1,2})[\/\-](\d{4})|(\d{4})[\/\-](\d{1,2})|([A-Za-z]+)\s+(\d{4})/i);
    if (monthYearMatch) {
      let month: number;
      let year: number;
      
      if (monthYearMatch[1] && monthYearMatch[2]) {
        // MM/YYYY or M/YYYY
        month = parseInt(monthYearMatch[1]);
        year = parseInt(monthYearMatch[2]);
      } else if (monthYearMatch[3] && monthYearMatch[4]) {
        // YYYY/MM or YYYY/M
        month = parseInt(monthYearMatch[4]);
        year = parseInt(monthYearMatch[3]);
      } else if (monthYearMatch[5] && monthYearMatch[6]) {
        // MonthName YYYY
        const monthName = monthYearMatch[5].toLowerCase();
        const monthMap: { [key: string]: number } = {
          january: 1, jan: 1, february: 2, feb: 2, march: 3, mar: 3,
          april: 4, apr: 4, may: 5, june: 6, jun: 6, july: 7, jul: 7,
          august: 8, aug: 8, september: 9, sep: 9, october: 10, oct: 10,
          november: 11, nov: 11, december: 12, dec: 12
        };
        month = monthMap[monthName] || 1;
        year = parseInt(monthYearMatch[6]);
      } else {
        return dateString; // Return original if can't parse
      }
      
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${monthNames[month - 1]} ${year}`;
    }
    
    return dateString; // Return original if can't parse
  }
  
  // Format valid date
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

/**
 * Format phone number to (XXX) XXX-XXXX format
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return "";
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "");
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === "1") {
    // US number with country code
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  // Return original if can't format
  return phone;
}

/**
 * Format URL to ensure it has protocol
 */
export function formatURL(url: string): string {
  if (!url) return "";
  
  // If already has protocol, return as is
  if (/^https?:\/\//i.test(url)) {
    return url;
  }
  
  // Add https:// if it looks like a URL
  if (url.includes(".") && !url.includes(" ")) {
    return `https://${url}`;
  }
  
  return url;
}

/**
 * Format year (for education)
 */
export function formatYear(year: string): string {
  if (!year) return "";
  
  // If it's already a 4-digit year, return as is
  if (/^\d{4}$/.test(year.trim())) {
    return year.trim();
  }
  
  // Try to extract year from date string
  const yearMatch = year.match(/\d{4}/);
  if (yearMatch) {
    return yearMatch[0];
  }
  
  return year;
}

