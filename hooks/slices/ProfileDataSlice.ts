import { StateCreator } from "zustand";
import { ProfileDataSliceType } from "../types/type";
import { Profile } from "@prisma/client";
const createProfileDataSlice: StateCreator<ProfileDataSliceType> = (
  set,
  get
) => ({
  profileData: {
    id: "",
    userId: "",
    name: "",
    imageUrl: "",
    email: "",
    youtubeAccessToken: "",
    youtubeRefreshToken: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  setProfileData(profileData: Profile) {
    set((state) => ({ profileData }));
  },
});
export default createProfileDataSlice;
