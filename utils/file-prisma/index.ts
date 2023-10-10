import { PrismFileWithAdditionalFile } from "@/hooks/types/type";
import axios from "axios";

export async function createFile({
  name,
  description,
  fileSize,
  fileType,
  firestoreZipUrl,
  resolution,
  profileId,
}: PrismFileWithAdditionalFile) {
  return await axios
    .post("/api/file", {
      fileData: {
        name,
        description,
        fileSize,
        fileType,
        firestoreZipUrl,
        resolution,
        profileId,
      },
    })
    .then((response) => response.data)
    .catch((error) => console.error("error when creating file: ", { error }));
}
