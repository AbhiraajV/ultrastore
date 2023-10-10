import { ImageSizeObjectKeyType, image_size } from "../helpers/sizeBitsObject";
import { conversionFunctions } from "../toVideoFlow/GenerateBitstream";
import { processBlobs } from "./BlobToBuffer";
import { processBuffers } from "./ImageToBitstream";

export async function FromVideo(
  blobs: Blob[],
  fileType: string,
  optimalResolution: ImageSizeObjectKeyType | undefined = undefined
): Promise<Blob> {
  const image_buffers = await processBlobs(blobs);
  const width = optimalResolution
    ? image_size[optimalResolution].w_h.width
    : undefined;
  const height = optimalResolution
    ? image_size[optimalResolution].w_h.width
    : undefined;
  console.log({ image_buffers });
  const bitstream = await processBuffers(image_buffers, width, height);
  console.log({ recovered_bitstream: bitstream });
  const base64 = conversionFunctions["2-64"](bitstream);
  console.log({ recovered: base64 });
  const recovered_buffer = conversionFunctions["64-arrayBuffer"](base64);
  console.log({ recovered_buffer });
  const decodedBlob = new Blob([recovered_buffer], { type: fileType });
  console.log({ decodedBlob });
  return decodedBlob;
}
