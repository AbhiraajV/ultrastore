import { error } from "console";
import { ImageSizeObjectKeyType } from "../helpers/sizeBitsObject";
import axios from "axios";
export const BitstreamToImagesEndPoint = async (
  resolution: ImageSizeObjectKeyType | undefined,
  bitstream: string
) => {
  return axios
    .post("/api/processor/bitstream-images", { resolution, bitstream })
    .then((response) => {
      console.log(response.data);
      const buffers = response.data;
      const blobs: Blob[] = [];
      buffers.forEach((bufferData: { type: string; data: number[] }) => {
        const blob = new Blob([new Uint8Array(bufferData.data)], {
          type: "image/png",
        });
        blobs.push(blob);
      });
      console.log({ blobs });
      return blobs;
    })
    .catch((error) => {
      console.log({ error });
      return [];
    });
};
