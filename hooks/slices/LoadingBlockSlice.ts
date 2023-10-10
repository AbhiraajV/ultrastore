import { StateCreator } from "zustand";
import { FormModalToggleSliceType, LoadingBlockSliceType } from "../types/type";
const createLoadingBlockSlice: StateCreator<LoadingBlockSliceType> = (
  set,
  get
) => ({
  isLoading: false,
  toggleLoading() {
    set((state) => ({ isLoading: !state.isLoading }));
  },
});
export default createLoadingBlockSlice;
