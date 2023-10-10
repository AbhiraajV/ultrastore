import Jimp from "jimp/es";

export async function processBuffers(
  buffers: ArrayBuffer[],
  width: number = 3840,
  height: number = 2160
): Promise<string> {
  async function extractBlackAndWhitePixels(
    buffer: ArrayBuffer
  ): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      var image_bitstream = "";
      try {
        var image = new Jimp(buffer, function (
          err: any,
          image: { getPixelColor: (arg0: number, arg1: number) => any }
        ) {
          for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
              image_bitstream +=
                image.getPixelColor(x, y) === 4294967295
                  ? "1"
                  : image.getPixelColor(x, y) === 255
                  ? "0"
                  : "";
            }
          }
          resolve(image_bitstream);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  const stringPromises: Promise<string>[] = buffers.map((buffer) =>
    extractBlackAndWhitePixels(buffer)
  );

  const strings = await Promise.all(stringPromises);
  return strings.join(""); // Concatenate all strings
}
