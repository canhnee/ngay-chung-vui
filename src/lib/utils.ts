/**
 * Utility functions for the wedding invitation website
 */

/**
 * Format date to readable string
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Parse Vietnamese date format (DD/MM/YYYY) to Date object
 */
function parseVietnameseDate(dateString: string): Date {
  // Check if already in ISO format
  if (dateString.includes('-')) {
    return new Date(dateString);
  }
  
  // Parse DD/MM/YYYY format
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed
    const year = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }
  
  // Fallback
  return new Date(dateString);
}

/**
 * Calculate countdown to a specific date
 */
export function getCountdown(targetDate: string) {
  try {
    const now = new Date().getTime();
    const target = parseVietnameseDate(targetDate).getTime();
    
    // Check if date is valid
    if (isNaN(target)) {
      console.error('Invalid target date:', targetDate);
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPast: false,
      };
    }
    
    const difference = target - now;

    if (difference < 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isPast: true,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
      isPast: false,
    };
  } catch (error) {
    console.error('Error calculating countdown:', error);
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: false,
    };
  }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Smooth scroll to element
 */
export function scrollToElement(elementId: string, offset = 0) {
  const element = document.getElementById(elementId);
  if (!element) return;

  const y = element.getBoundingClientRect().top + window.pageYOffset - offset;

  window.scrollTo({ top: y, behavior: 'smooth' });
}

/**
 * Get responsive image URL (placeholder for future optimization)
 */
export function getImageUrl(url: string): string {
  // For now, return the original URL
  // In the future, this can be enhanced with image optimization service
  return url;
}
