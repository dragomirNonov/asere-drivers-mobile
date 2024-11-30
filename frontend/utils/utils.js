export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digits first
  const cleaned = phoneNumber.replace(/\D/g, "");
  // Format as (XXX) XXX-XXXX
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]}-${match[3]}`;
  }
  // Return original if it doesn't match the expected format
  return phoneNumber;
};
