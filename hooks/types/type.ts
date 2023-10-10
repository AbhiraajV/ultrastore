import { File as PrismFileType, Profile } from "@prisma/client";

export type PrismFileWithAdditionalFile = PrismFileType & {
  file: File | undefined;
};

export interface FileDataSliceType {
  fileData: PrismFileWithAdditionalFile;
  setFileData: (fileData: PrismFileWithAdditionalFile) => void;
}
export interface FileGeneratedData {
  bitstream?: string;
  arrayBuffer?: ArrayBuffer;
  generatedImages?: Blob[];
  zipBlob?: Blob;
  user?: string | undefined;
}
export enum Steps {
  "__",
  "File Received",
  "Blob Generated",
  "ArrayBuffer Generated",
  "BitStream Generated",
  "Calculations Done",
  "Bitstream Image Maps Generated",
  "Zip File Generated",
  "Zip Blob Generated",
  "Upload Started",
}

export type StepNames =
  | "__"
  | "File Received"
  | "Blob Generated"
  | "ArrayBuffer Generated"
  | "BitStream Generated"
  | "Calculations Done"
  | "Bitstream Image Maps Generated"
  | "Zip File Generated"
  | "Zip Blob Generated"
  | "Upload Started";

export const stepContribution: Record<Steps, number> = {
  [Steps["__"]]: 0,
  [Steps["File Received"]]: 50 / 7,
  [Steps["Calculations Done"]]: 50 / 7,
  [Steps["ArrayBuffer Generated"]]: 50 / 7,
  [Steps["Blob Generated"]]: 50 / 7,
  [Steps["BitStream Generated"]]: 50 / 7,
  [Steps["Bitstream Image Maps Generated"]]: 50 / 7,
  [Steps["Zip File Generated"]]: 50 / 7,
  [Steps["Zip Blob Generated"]]: 50 / 7,
  [Steps["Upload Started"]]: 50,
};

export type ProgressObject = {
  progress: number;
  justFinished: Steps;
  currentStep: Steps;
};
export interface ProgressSliceType {
  progressObject: ProgressObject;
  stepContribution: typeof stepContribution;
  setProgressObject: (step: keyof typeof Steps) => void;
}

export interface FormModalToggleSliceType {
  isOpen: boolean;
  toggle: () => void;
}

export interface LoadingBlockSliceType {
  isLoading: boolean;
  toggleLoading: () => void;
}

export interface ProfileDataSliceType {
  profileData: Profile;
  setProfileData: (profile: Profile) => void;
}
