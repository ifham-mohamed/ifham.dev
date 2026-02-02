/**
 * Format a date string or Date object
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Format a date for display as relative time (e.g., "2 days ago")
 */
export function formatRelativeDate(date: string | Date): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffInMs = now.getTime() - dateObj.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
}

/**
 * Format date range (e.g., "Jan 2023 - Present")
 */
export function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const startFormatted = startDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  if (end === "Present" || end === "present") {
    return `${startFormatted} - Present`;
  }

  const endDate = new Date(end);
  const endFormatted = endDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return `${startFormatted} - ${endFormatted}`;
}

export default formatDate;
