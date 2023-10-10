import { ProgressSliceType } from "@/hooks/types/type";
import JSZip from "jszip";

export async function createZipFileFromBlobs(
  imageBlobs: Blob[],
  setProgressObject: ProgressSliceType["setProgressObject"]
): Promise<Blob> {
  try {
    const zip = new JSZip();

    imageBlobs.forEach((blob, index) => {
      zip.file(`image${index}.png`, blob);
    });
    setProgressObject("Zip Blob Generated");
    const zipBlob = await zip.generateAsync({ type: "blob" });
    setProgressObject("Zip File Generated");

    return zipBlob;
  } catch (error) {
    console.error("Error creating zip file:", error);
    throw error;
  }
}
