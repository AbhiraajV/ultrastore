import { ImageSizeObjectKeyType, image_size } from "../helpers/sizeBitsObject";
import Jimp from "jimp/es";

let width = 3840;
let height = 2160;

export async function generateImagesFromBitstream(
  bitstream: string,
  optimalResolution: ImageSizeObjectKeyType | undefined = undefined
): Promise<Blob[]> {
  if (optimalResolution !== undefined) {
    width = image_size[optimalResolution].w_h.width;
    height = image_size[optimalResolution].w_h.height;
  }
  let pixelsProcessed = 0;
  let imageNumber = 0; // Initialize as 0
  const buffers = [];

  try {
    while (pixelsProcessed < bitstream.length) {
      const image = new Jimp(width, height);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (pixelsProcessed < bitstream.length) {
            const color =
              bitstream[pixelsProcessed] === "1" ? 0xffffffff : 0x000000ff; // white or black
            image.setPixelColor(color, x, y);
            pixelsProcessed++;
          } else {
            image.setPixelColor(0xffc0cb, x, y);
          }
        }
      }
      const buffer = await image.getBufferAsync(Jimp.MIME_PNG);
      buffers.push(buffer);
      imageNumber++;
    }

    return buffers;
  } catch (error) {
    console.error("Error generating images:", error);
    throw error; // Re-throw the error to handle it elsewhere if needed
  }
}
export const clientSideGenerateImagesFromBitstream = async (
  bitstream: string,
  optimalResolution: ImageSizeObjectKeyType | undefined = undefined
) => {
  const buffers = await generateImagesFromBitstream(
    bitstream,
    optimalResolution
  );
  const blobs: Blob[] = [];

  buffers.forEach((buffer) => {
    const blob = new Blob([buffer], { type: "image/png" });
    blobs.push(blob);
  });

  return blobs;
};
