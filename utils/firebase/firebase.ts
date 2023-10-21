import { initializeApp } from "firebase/app";
import { v4 as uuidV4 } from "uuid";
// import { getAnalytics } from "firebase/analytics";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { PrismFileWithAdditionalFile } from "@/hooks/types/type";
import { createFile } from "../file-prisma";
import { Profile } from "@prisma/client";

import { ReadStream, createReadStream, createWriteStream, readdir } from "fs";
const firebaseConfig = {
  apiKey: "AIzaSyC5nSbnSe5QzOatP8-wXdPtZeC0nCA52kg",
  authDomain: "ultrastore.firebaseapp.com",
  projectId: "ultrastore",
  storageBucket: "ultrastore.appspot.com",
  messagingSenderId: "159040339947",
  appId: "1:159040339947:web:f69d4a31cb53cd1332a3ae",
  measurementId: "G-L66TLDKHBC",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadZipFunction = async (
  zipBlob: Blob | undefined,
  fileData: PrismFileWithAdditionalFile,
  profile: Profile | null
) => {
  console.log({ uploadRequirements: { zipBlob, profile, fileData } });
  if (!profile) return { error: "no profile found" };
  const zipFileRef = ref(
    storage,
    profile.id + "-user/" + uuidV4() + "-images.zip"
  );
  if (zipBlob === undefined) return;
  return await uploadBytes(zipFileRef, zipBlob)
    .then(async (snapshot) => {
      console.log("Zip file uploaded:", snapshot);
      fileData.firestoreZipUrl = snapshot.metadata.fullPath;
      const file = await createFile(fileData);
      return { snapshot, file };
    })
    .catch((error) => {
      console.error("Error uploading zip file:", error);
    });
};
export const deleteFile = async (firestoreZipUrl: string) => {
  try {
    if (!firestoreZipUrl)
      return { fileDeleted: false, message: "firestore file url not found" };
    const deleted = await deleteObject(ref(storage, firestoreZipUrl));
    return { fileDeleted: true, message: deleted };
  } catch (error) {
    console.log({ error });
    return { fileDeleted: false, message: error };
  }
};

export async function downloadFileFromFirestore(filePath: string) {
  try {
    const downloadURL = await getDownloadURL(ref(storage, filePath));
    const response = await fetch(downloadURL);

    if (!response.ok) {
      throw new Error("Failed to download the file.");
    }

    const blob = await response.blob();

    // Get the file name from the path or use a custom name
    const fileName = filePath.split("/").pop();

    // Use the 'file-saver' library to trigger the download
    console.log("File download successful");
    return blob;
  } catch (error) {
    console.error("Error downloading the file:", error);
    return undefined;
  }
}