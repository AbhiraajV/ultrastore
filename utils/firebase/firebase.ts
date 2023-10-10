import { initializeApp } from "firebase/app";
import { v4 as uuidV4 } from "uuid";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { PrismFileWithAdditionalFile } from "@/hooks/types/type";
import { createFile } from "../file-prisma";
import { Profile } from "@prisma/client";
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
// const analytics = getAnalytics(app);
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
