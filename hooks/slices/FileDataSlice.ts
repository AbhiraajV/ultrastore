import { StateCreator } from "zustand";
import { FileDataSliceType, PrismFileWithAdditionalFile } from "../types/type";
const createFileMetadataSlice: StateCreator<FileDataSliceType> = (
  set,
  get
) => ({
  fileData: {
    id: "",
    name: "",
    description: "",
    resolution: "R_1080p",
    fileType: "",
    fileSize: 0,
    youtubeUrl: "",
    firestoreZipUrl: "",
    decodedFileFirestoreUrl: "",
    profileId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    file: undefined,
  },
  setFileData(fileData: PrismFileWithAdditionalFile) {
    set((state) => ({ fileData }));
  },
});
export default createFileMetadataSlice;
