import { StateCreator } from "zustand";
import {
  ProgressObject,
  ProgressSliceType,
  Steps,
  stepContribution,
} from "../types/type";
const createProgressTrackerSlice: StateCreator<ProgressSliceType> = (
  set,
  get
) => ({
  progressObject: {
    currentStep: Steps["__"],
    justFinished: Steps["__"],
    progress: 0,
  },
  stepContribution: stepContribution,
  setProgressObject(step: keyof typeof Steps) {
    set((state) => ({
      progressObject: {
        currentStep: Steps[step] + 1,
        justFinished: Steps[step],
        progress: state.progressObject.progress + stepContribution[Steps[step]],
      },
    }));
  },
});
export default createProgressTrackerSlice;
