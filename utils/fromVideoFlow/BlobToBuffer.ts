import { Buffer } from "buffer";

async function blobToBuffer(blob: Blob): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const buffer = Buffer.from(reader.result as ArrayBuffer);
      resolve(buffer);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(blob);
  });
}

export async function processBlobs(blobs: Blob[]): Promise<Buffer[]> {
  const bufferPromises: Promise<Buffer>[] = blobs.map((blob) =>
    blobToBuffer(blob)
  );
  return Promise.all(bufferPromises);
}
