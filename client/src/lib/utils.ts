import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: string | number): string {
  const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(numericPrice);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function calculateDiscountPercentage(originalPrice: string | number, salePrice: string | number): number {
  const original = typeof originalPrice === 'string' ? parseFloat(originalPrice) : originalPrice;
  const sale = typeof salePrice === 'string' ? parseFloat(salePrice) : salePrice;
  
  if (original <= 0 || sale <= 0 || sale >= original) return 0;
  
  return Math.round(((original - sale) / original) * 100);
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `AF-${timestamp}-${random}`.toUpperCase();
}

export function getVehicleTypeLabel(vehicleType: string): string {
  const labels: Record<string, string> = {
    car: 'Car',
    motorcycle: 'Motorcycle',
    truck: 'Truck',
    suv: 'SUV'
  };
  return labels[vehicleType] || vehicleType;
}

export function getCategoryIcon(categorySlug: string): string {
  const icons: Record<string, string> = {
    'engine-parts': '🔧',
    'brake-system': '🛑',
    'suspension': '🚗',
    'electrical': '⚡',
    'tires-wheels': '🛞',
    'body-parts': '🚙',
    'motorcycle-engine': '🏍️',
    'motorcycle-brakes': '🛑',
    'motorcycle-accessories': '🧰'
  };
  return icons[categorySlug] || '🔧';
}

export function validateProductSKU(sku: string): boolean {
  // SKU format: 3-4 letters followed by dash and 3 digits
  const skuRegex = /^[A-Z]{3,4}-\d{3}$/;
  return skuRegex.test(sku);
}

export function formatShippingEstimate(days: number): string {
  if (days === 1) return 'Next business day';
  if (days <= 2) return `${days} business days`;
  if (days <= 5) return `${days}-${days + 1} business days`;
  return `${days}-${days + 2} business days`;
}

export function getStockStatusLabel(stock: number): { label: string; color: string } {
  if (stock === 0) return { label: 'Out of Stock', color: 'text-red-600' };
  if (stock <= 5) return { label: `Only ${stock} left`, color: 'text-orange-600' };
  if (stock <= 10) return { label: 'Low Stock', color: 'text-yellow-600' };
  return { label: 'In Stock', color: 'text-green-600' };
}

export function calculateShippingCost(subtotal: number, weight?: number): number {
  // Free shipping over $99
  if (subtotal >= 99) return 0;
  
  // Base shipping cost
  let shippingCost = 9.99;
  
  // Additional cost for heavy items
  if (weight && weight > 10) {
    shippingCost += Math.ceil((weight - 10) / 5) * 2.99;
  }
  
  return Math.round(shippingCost * 100) / 100;
}

export function generateProductUrl(slug: string): string {
  return `/product/${slug}`;
}

export function generateCategoryUrl(slug: string): string {
  return `/shop?category=${slug}`;
}

export function generateBrandUrl(slug: string): string {
  return `/shop?brand=${slug}`;
}
