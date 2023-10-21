import { initiateProfile } from "@/lib/initiate-profile";
import Workspace from "../components/workspace/Workspace";
import FileInfoFormModal from "@/components/modal/FormDialogue";
import { redirectToSignIn } from "@clerk/nextjs";
import axios from "axios";
export default async function Home() {
  const profile = await initiateProfile();
  console.log({ profile });
  if (!profile) redirectToSignIn();
  return (
    <div className="max-w-[100vw]">
      <FileInfoFormModal />
      <Workspace profile={profile} />
    </div>
  );
}
