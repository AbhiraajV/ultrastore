function toFiveBitBinary(num: number): string {
  if (num < 0 || num > 31) {
    throw new Error("Number out of the 0-31 range.");
  }

  return num.toString(2).padStart(5, "0");
}

export function compressString(input: string) {
  if (input.length === 0) {
    return "";
  }

  let compressed = "";
  let currentChar = input[0];
  let charCount = 1;

  for (let i = 1; i < input.length; i++) {
    if (input[i] === currentChar) {
      charCount++;
    }
    if (charCount >= 31 || input[i] !== currentChar) {
      compressed += toFiveBitBinary(charCount) + currentChar;
      currentChar = input[i];
      charCount = 1;
    }
  }

  compressed += toFiveBitBinary(charCount) + currentChar; // Append the last character group.

  console.log({
    precompressionLen: input.length,
    compressedLen: compressed.length,
    savedCharacters: input.length - compressed.length,
  });
  return compressed;
}
