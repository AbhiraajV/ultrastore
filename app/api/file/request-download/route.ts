import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { Publisher } from "@/utils/rabbitmq/publisher";
import prisma from "@/lib/prisma";
export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { fileId } = await req.json();

    const file = await prisma.file.findFirst({
      where: {
        id: fileId,
        profileId: profile.id,
      },
    });
    if (!file?.youtubeUrl)
      return new NextResponse("File isnt ready for download", { status: 400 });
    const publisher = new Publisher();

    const { out, success } = await publisher.publishMessage("decode-video", {
      file,
      profile,
    });
    if (!success)
      return new NextResponse("File couldnt be enqueued", { status: 500 });
    const startDownload = await prisma.file.update({
      where: {
        id: fileId,
        profileId: profile.id,
      },
      data: {
        decodedFileFirestoreUrl: "____STATUS:Download Request Enqueued",
      },
    });
    return NextResponse.json({ file: startDownload, out });
  } catch (error) {
    console.log("FILE_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
