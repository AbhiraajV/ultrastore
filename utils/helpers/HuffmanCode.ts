export function base64ToBase85(base64: string): string {
  const BASE64_ALPHABET =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const BASE85_ALPHABET =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~";

  let result = "";
  let value = 0;
  let bits = 0;

  for (let i = 0; i < base64.length; i++) {
    const char = base64[i];
    const charValue = BASE64_ALPHABET.indexOf(char);

    if (charValue === -1) {
      throw new Error("Invalid Base64 character: " + char);
    }

    value = (value << 6) | charValue;
    bits += 6;

    while (bits >= 5) {
      const index85 = (value >>> (bits - 5)) & 0x1f;
      result += BASE85_ALPHABET[index85];
      bits -= 5;
    }
  }

  // Add padding characters if needed.
  if (bits > 0) {
    const index85 = (value << (5 - bits)) & 0x1f;
    result += BASE85_ALPHABET[index85];
  }

  return result;
}

// Example usage:
const base64String = "SGVsbG8gd29ybGQ="; // Example Base64 string
const base85String = base64ToBase85(base64String);
console.log("Base85:", base85String);
