import { StateCreator } from "zustand";
import { DeleteFileModalToggleSliceType } from "../types/type";
const createDeleteFileModalToggleSlice: StateCreator<
  DeleteFileModalToggleSliceType
> = (set, get) => ({
  isDeleteFileModalOpen: false,
  DeleteFileForFileId: "",
  DeleteFileByUserId: "",
  updateDeleteFileState({ fileId, userId }) {
    set((state) => ({
      ...state,
      DeleteFileForFileId: fileId,
      DeleteFileByUserId: userId,
    }));
  },
  toggleDeleteFileModalOpen: () => {
    set((state) => ({
      ...state,
      isDeleteFileModalOpen: !state.isDeleteFileModalOpen,
    }));
  },
});
export default createDeleteFileModalToggleSlice;
