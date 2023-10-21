import { StateCreator } from "zustand";
import { PaymentModalToggleSliceType } from "../types/type";
const createPaymentModalToggleSlice: StateCreator<
  PaymentModalToggleSliceType
> = (set, get) => ({
  isPaymentModalOpen: false,
  paymentForFileId: "",
  paymentByUserId: "",
  updatePaymentState({ fileId, userId }) {
    set((state) => ({
      ...state,
      paymentForFileId: fileId,
      paymentByUserId: userId,
    }));
  },
  togglePaymentModalOpen: () => {
    set((state) => ({
      ...state,
      isPaymentModalOpen: !state.isPaymentModalOpen,
    }));
  },
});
export default createPaymentModalToggleSlice;
