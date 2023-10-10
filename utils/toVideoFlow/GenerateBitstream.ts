import { ProgressSliceType } from "@/hooks/types/type";
import { generateImagesFromBitstream } from "./GenerateImages";

function arrayBufferToBase64(arrayBuffer: ArrayBuffer) {
  const uint8Array = new Uint8Array(arrayBuffer);
  const chunkSize = 8192;
  const chunks = [];

  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, i + chunkSize);
    const chunkArray = Array.from(chunk);
    chunks.push(String.fromCharCode.apply(null, chunkArray));
  }
  const base64String = btoa(chunks.join(""));
  console.log("ArrayBuffer converted to base64", { arrayBuffer, base64String });
  return base64String;
}

function base64ToArrayBuffer(base64String: string) {
  const binaryString = atob(base64String);
  const length = binaryString.length;
  const uint8Array = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }
  console.log("Base64 converted to ArrayBuffer", {
    base64String,
    buffer: uint8Array.buffer,
  });
  return uint8Array.buffer;
}
function base64ToBinary(base64String: string): string {
  // console.log({base64StringLen: base64String.length})
  try {
    const binaryData = Buffer.from(base64String, "base64");
    const byteArray = Array.from(binaryData);
    let binaryString = "";
    for (const byte of byteArray) {
      binaryString += byte.toString(2).padStart(8, "0");
    }
    console.log("Base64 converted to bitstream", {
      base64String,
      binaryString,
    });
    return binaryString;
  } catch (error) {
    console.error("Error decoding base64 string:", error);
    return "";
  }
}

function binaryToBase64(binaryString: string): string {
  try {
    if (binaryString.length % 8 !== 0) {
      throw new Error("Binary string length must be a multiple of 8.");
    }

    const bytes = [];
    for (let i = 0; i < binaryString.length; i += 8) {
      const byte = parseInt(binaryString.substr(i, 8), 2);
      bytes.push(byte);
    }

    const binaryData = Buffer.from(bytes);
    const base64String = binaryData.toString("base64");

    console.log("Binary Bits converted to Base64", {
      binaryString,
      base64String,
    });
    return base64String;
  } catch (error) {
    console.error("Error encoding binary string to base64:", error);
    return "";
  }
}

export type BitstreamAndBlob = {
  bitstream: string;
  decodedBlob: Blob;
};

export const conversionFunctions = {
  "2-64": binaryToBase64,
  "64-2": base64ToBinary,
  "64-arrayBuffer": base64ToArrayBuffer,
  "arrayBuffer-64": arrayBufferToBase64,
  "bitstream-image": generateImagesFromBitstream,
};

export const conversionFlows = {
  flowDown: (arrayBuffer: ArrayBuffer) =>
    base64ToBinary(arrayBufferToBase64(arrayBuffer)),
  flowUp: (bitstream: string) => base64ToArrayBuffer(binaryToBase64(bitstream)),
};

export const getBitstream = async (
  file: any,
  setProgressObject: ProgressSliceType["setProgressObject"]
): Promise<BitstreamAndBlob> => {
  return new Promise(async (resolve) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;

      await delay(500);
      setProgressObject("Blob Generated");

      await delay(500);
      const base64 = arrayBufferToBase64(arrayBuffer);
      setProgressObject("ArrayBuffer Generated");

      await delay(500);
      const bitstream = base64ToBinary(base64);
      setProgressObject("BitStream Generated");
      await delay(500);

      const decodedArrayBuffer = conversionFlows.flowUp(
        bitstream
      ) as ArrayBuffer;
      const decodedBlob = new Blob([decodedArrayBuffer], { type: file.type });

      resolve({ bitstream, decodedBlob });
    };

    reader.readAsArrayBuffer(file);
  });
};

export async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
