"use client";
import { ImageSizeObjectKeyType } from "../helpers/sizeBitsObject";
import { getBitstream } from "./GenerateBitstream";
import {
  clientSideGenerateImagesFromBitstream,
  generateImagesFromBitstream,
} from "./GenerateImages";
import { createZipFileFromBlobs } from "./zip";
import {
  ProgressObject,
  ProgressSliceType,
  StepNames,
} from "@/hooks/types/type";
import { BitstreamToImagesEndPoint } from "./HandleImageGeneration";
const USE_CLIENT_CONVERTOR_LIMIT = 82000000; // close to 10MBs
export const toVideoFlow = async (
  file: any,
  setProgressObject: ProgressSliceType["setProgressObject"],
  pre_bitstream: string | undefined = undefined,
  getOnlyBitstream: boolean = false,
  optimalResolution: ImageSizeObjectKeyType | undefined = undefined
): Promise<
  { bitstream: string } | { blobs: Blob[]; zip: Blob; bitstreamLength: number }
> => {
  console.log({
    file,
    setProgressObject,
    pre_bitstream,
    getOnlyBitstream,
    optimalResolution,
  });
  let bitstream;

  if (pre_bitstream) {
    bitstream = pre_bitstream;
  } else {
    const { bitstream: generatedBitstream, decodedBlob } = await getBitstream(
      file,
      setProgressObject
    );
    bitstream = generatedBitstream;
    console.log({ bitstreamLength: bitstream.length });
  }

  if (getOnlyBitstream) {
    return { bitstream };
  }

  console.log("Generating Blobs");
  const blobs =
    bitstream.length > USE_CLIENT_CONVERTOR_LIMIT
      ? await BitstreamToImagesEndPoint(optimalResolution, bitstream)
      : await clientSideGenerateImagesFromBitstream(
          bitstream,
          optimalResolution
        );
  setProgressObject("Bitstream Image Maps Generated");
  console.log("Zipping");
  const zip = await createZipFileFromBlobs(blobs, setProgressObject);

  console.log({ zip });

  return { blobs, zip, bitstreamLength: bitstream.length };
};

export const getEarlyBitstream = async (
  file: any,
  setProgressObject: ProgressSliceType["setProgressObject"]
): Promise<{ bitstream: string }> => {
  const res = await toVideoFlow(file, setProgressObject, undefined, true);
  if ("bitstream" in res) return { bitstream: res.bitstream };
  return { bitstream: "" };
};
export const preBitstreamToVideoFlow = async (
  pre_bitstream: string,
  setProgressObject: ProgressSliceType["setProgressObject"],
  optimalResolution: ImageSizeObjectKeyType | undefined = undefined
): Promise<
  { blobs: Blob[]; zip: Blob; bitstreamLength: number } | undefined
> => {
  console.log("PRE_BITSTREAM");
  const res = await toVideoFlow(
    undefined,
    setProgressObject,
    pre_bitstream,
    false,
    optimalResolution
  );
  if (!("bitstream" in res)) return res;
  return undefined;
};
