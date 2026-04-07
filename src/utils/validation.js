/**
 * Utility functions for form handling and validation
 */

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\d\s()+-]*$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

export const formatPhone = (phone) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) return phone;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 255);
};
