import FileDescription from "@/components/workspace/FileDescription";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { currentProfile } from "@/lib/current-profile";
import { storage } from "@/utils/firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { redirect } from "next/navigation";
import React from "react";
import UploadToYouteButton from "./UploadToYouteButton";
import { uploadVideoToYouTube } from "@/utils/youtube/upload";
import prisma from "@/lib/prisma";
import { SpinnerCircular } from "spinners-react";
import VideoPlayer from "@/components/youtubePlayer";
import DisplayBlob from "@/components/workspace/DisplayBlob";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
  params: { [key: string]: string | string[] | undefined };
};

async function Page({ searchParams, params }: Props) {
  const { redirect_status } = searchParams;
  const { fileid } = params;
  const profile = await currentProfile();

  if (!fileid || !profile?.id) return redirect("/your-files");

  const file = !redirect_status
    ? await prisma?.file.findFirst({
        where: {
          id: fileid[0] as string,
          profileId: profile.id as string,
        },
      })
    : await prisma?.file.update({
        where: {
          id: fileid[0] as string,
          profileId: profile.id as string,
        },
        data: {
          priority: redirect_status === "succeeded",
        },
      });
  console.log({ file });

  const video_path = file?.youtubeUrl?.includes("__FIREBASE__:")
    ? file.youtubeUrl.replace("__FIREBASE__:", "")
    : undefined;
  const videoRef = video_path ? ref(storage, video_path) : undefined;
  const videoUrl = videoRef ? await getDownloadURL(videoRef) : undefined;

  const youtubeUrl = file?.youtubeUrl?.includes("__YOUTUBE_URL__:")
    ? `https://www.youtube.com/watch?v=${file?.youtubeUrl?.replace(
        "__YOUTUBE_URL__:",
        ""
      )}`
    : undefined;
  return (
    <div className="pl-5 md:pl-0 flex flex-col lg:flex-row">
      <FileDescription fileData={file} onlyDescription={true} />
      {videoUrl ? (
        <div className="w-[300px] h-[300px] flex flex-col gap-1">
          <video src={videoUrl} controls />
          <UploadToYouteButton file={file} profile={profile} />
        </div>
      ) : youtubeUrl ? (
        <div className="w-[300px] h-[300px] flex flex-col gap-1">
          <VideoPlayer id={file!.youtubeUrl!.replace("__YOUTUBE_URL__:", "")} />
          <DisplayBlob
            fileDisplayBlob={undefined}
            decoded={true}
            causeDecode={true}
            file={file!}
          />
        </div>
      ) : (
        <SpinnerCircular
          size={20}
          thickness={180}
          speed={120}
          still={false}
          color="rgba(57, 76, 172, 1)"
          secondaryColor="#394cac0"
          enabled={true}
        />
      )}
    </div>
  );
}

export default Page;
