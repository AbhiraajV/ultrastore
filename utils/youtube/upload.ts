import oauth2Client from "@/lib/oauth-yt";
import { File, Profile } from "@prisma/client";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebase/firebase";

import { google } from "googleapis";
import { Readable } from "stream";

export async function uploadVideoToYouTube({
  file,
  accessToken,
}: {
  file: File;
  accessToken: string;
}): Promise<{ success: boolean; data?: any; error?: any }> {
  console.log({ accessToken });
  // Download the video from Firestore.
  const video_path = file?.youtubeUrl?.startsWith("__FIREBASE__:")
    ? file.youtubeUrl.replace("__FIREBASE__:", "")
    : undefined;
  if (!video_path) return { success: false, error: "No video path generated" };
  const video = await downloadFromFirestore({ file: video_path });
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  // Create a new YouTube client.
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  //create video stream

  const videoStream = new Readable();
  videoStream._read = () => {};
  videoStream.push(video);
  videoStream.push(null);

  // Try to upload the video to YouTube.
  try {
    console.log("Uploading to YouTube...");
    const res = await youtube.videos.insert({
      part: ["snippet", "status"],
      requestBody: {
        snippet: {
          title: file.name,
          description: file.description,
        },
        status: {
          privacyStatus: "public",
        },
      },
      media: {
        body: videoStream,
      },
    });

    console.log("Video upload started:", res.data);
    return {
      success: true,
      data: res.data,
    };
  } catch (error) {
    console.log({ error });
    return {
      success: false,
      error: error,
    };
  }
}

export async function downloadFromFirestore({
  file,
}: {
  file: string;
}): Promise<Buffer> {
  const downloadURL = await getDownloadURL(ref(storage, file));

  const response = await fetch(downloadURL);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log({ buffer });
  return buffer;
}
