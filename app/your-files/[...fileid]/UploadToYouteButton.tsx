"use client";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import useStore from "@/hooks/useStore";
import { uploadVideoToYouTube } from "@/utils/youtube/upload";
import { File, Profile } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  file: File | undefined | null;
  profile: Profile;
};

function UploadToYouteButton({ file, profile }: Props) {
  const router = useRouter();
  console.log({ file, profile });
  const { toggleLoading } = useStore((state) => state);

  const handleUpload = async () => {
    toggleLoading();
    if (!file || !file.id) return;
    axios
      .post("/api/file/upload", { fileId: file.id })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        toggleLoading();
        window.location.reload();
      });
  };
  if (
    !profile.youtubeTokenExpiry ||
    new Date(profile.youtubeTokenExpiry) < new Date()
  )
    return (
      <Button
        style={{ width: "300px" }}
        onClick={() => router.push("/api/auth?fileid=" + file?.id)}
      >
        Permit Upload
      </Button>
    );
  return (
    <Button style={{ width: "300px" }} onClick={handleUpload}>
      Upload to Youtube
    </Button>
  );
}

export default UploadToYouteButton;
