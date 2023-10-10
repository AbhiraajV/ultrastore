import create from "zustand";
import {
  FileDataSliceType,
  FormModalToggleSliceType,
  LoadingBlockSliceType,
  ProfileDataSliceType,
  ProgressSliceType,
} from "./types/type";
import createFileMetadataSlice from "./slices/FileDataSlice";
import createProgressTrackerSlice from "./slices/ProgressSlice";
import createLoadingBlockSlice from "./slices/LoadingBlockSlice";
import createFormModalToggleSlice from "./slices/FormModalToggleSlice";
import createProfileDataSlice from "./slices/ProfileDataSlice";
const useStore = create<
  FileDataSliceType &
    ProgressSliceType &
    FormModalToggleSliceType &
    LoadingBlockSliceType &
    ProgressSliceType &
    ProfileDataSliceType
>((...a) => ({
  ...createFileMetadataSlice(...a),
  ...createProgressTrackerSlice(...a),
  ...createFormModalToggleSlice(...a),
  ...createLoadingBlockSlice(...a),
  ...createProfileDataSlice(...a),
}));
export default useStore;
