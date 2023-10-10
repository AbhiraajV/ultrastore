import { StateCreator } from "zustand";
import { FormModalToggleSliceType } from "../types/type";
const createFormModalToggleSlice: StateCreator<FormModalToggleSliceType> = (
  set,
  get
) => ({
  isOpen: false,
  toggle() {
    set((state) => ({ isOpen: !state.isOpen }));
  },
});
export default createFormModalToggleSlice;
