import { File } from "@prisma/client";
import { FromVideo } from "./FromVideoFlow";
import { downloadFileFromFirestore } from "../firebase/firebase";
import JSZip from "jszip";

export const simpleFirestoreZipToFile = async ({ file }: { file: File }) => {
  const zipFileBlob = await downloadFileFromFirestore(file.firestoreZipUrl);
  if (!zipFileBlob) return;
  console.log({ zipFileBlob });
  const imageBlobs = await extractImagesFromZip(zipFileBlob);
  console.log({ imageBlobs });
  const fileBlob = await FromVideo(imageBlobs, file.fileType, file.resolution);
  console.log({ fileBlob });
  return fileBlob;
};

async function extractImagesFromZip(zipBlob: Blob) {
  const zip = new JSZip();

  // Load the ZIP data
  const loadedZip = await zip.loadAsync(zipBlob);

  const imageBlobs = [];

  for (const relativePath in loadedZip.files) {
    const zipEntry = loadedZip.files[relativePath];

    if (zipEntry.name.startsWith("image") && !zipEntry.dir) {
      // Read the image data
      const imageData = await zipEntry.async("blob");

      // Push the image Blob into the array
      imageBlobs.push(imageData);
    }
  }

  return imageBlobs;
}
