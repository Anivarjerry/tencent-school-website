import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSubdomain() {
  if (typeof window === 'undefined') return null;
  
  const hostname = window.location.hostname;
  
  // Handle local development or specific Cloud Run URLs
  // If the hostname is something like aps.vidyasetu.com, subdomain is 'aps'
  // If it's ais-dev-..., it might not have a subdomain in the traditional sense
  // We can also check for a query param 'school' for testing purposes
  
  const urlParams = new URLSearchParams(window.location.search);
  const schoolParam = urlParams.get('school');
  if (schoolParam) return schoolParam;

  const parts = hostname.split('.');
  
  // Simple logic: if more than 2 parts, the first part is the subdomain
  // e.g., aps.vidyasetu.com -> ['aps', 'vidyasetu', 'com'] -> 'aps'
  // e.g., localhost -> ['localhost'] -> null
  if (parts.length > 2) {
    // Check if it's not a common suffix like .run.app or .github.io
    const suffix = parts.slice(-2).join('.');
    if (suffix === 'run.app' || suffix === 'github.io') {
      // For ais-dev-jzfbbhngpgiltys4y3mqrq-64306444511.asia-east1.run.app
      // It's hard to detect subdomain here without knowing the base domain.
      // Let's assume for now that if it's a dev URL, we might use a default or param.
      return null;
    }
    return parts[0];
  }
  
  return null;
}
