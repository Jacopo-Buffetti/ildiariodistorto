export const validateEmail = (email: string): boolean => {
  const normalizedEmail = String(email).trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]{1,253}\.[^\s@]{2,63}$/;
  return emailRegex.test(normalizedEmail);
};
