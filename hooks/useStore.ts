import create from "zustand";
import {
  DeleteFileModalToggleSliceType,
  FileDataSliceType,
  FormModalToggleSliceType,
  LoadingBlockSliceType,
  PaymentModalToggleSliceType,
  ProfileDataSliceType,
  ProgressSliceType,
} from "./types/type";
import createFileMetadataSlice from "./slices/FileDataSlice";
import createProgressTrackerSlice from "./slices/ProgressSlice";
import createLoadingBlockSlice from "./slices/LoadingBlockSlice";
import createFormModalToggleSlice from "./slices/FormModalToggleSlice";
import createProfileDataSlice from "./slices/ProfileDataSlice";
import createPaymentModalToggleSlice from "./slices/PaymentModalToggleSlice";
import createDeleteFileModalToggleSlice from "./slices/DeleteFileModalToggleSlice";

const useStore = create<
  FileDataSliceType &
    ProgressSliceType &
    FormModalToggleSliceType &
    LoadingBlockSliceType &
    ProgressSliceType &
    ProfileDataSliceType &
    PaymentModalToggleSliceType &
    DeleteFileModalToggleSliceType
>((...a) => ({
  ...createFileMetadataSlice(...a),
  ...createProgressTrackerSlice(...a),
  ...createFormModalToggleSlice(...a),
  ...createLoadingBlockSlice(...a),
  ...createProfileDataSlice(...a),
  ...createPaymentModalToggleSlice(...a),
  ...createDeleteFileModalToggleSlice(...a),
}));
export default useStore;
