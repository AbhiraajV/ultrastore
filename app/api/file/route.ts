import { currentProfile } from "@/lib/current-profile";
import prisma from "@/lib/prisma";
import { deleteFile } from "@/utils/firebase/firebase";
import { Publisher } from "@/utils/rabbitmq/publisher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });
    const {
      fileData: {
        name,
        description,
        fileSize,
        fileType,
        firestoreZipUrl,
        resolution,
        profileId,
      },
    } = await req.json();

    const file = await prisma.file.create({
      data: {
        name,
        description,
        fileSize,
        fileType,
        firestoreZipUrl,
        resolution,
        profileId: profile.id,
      },
    });
    const publisher = new Publisher();

    const { out, success } = await publisher.publishMessage("zip-video", {
      file,
      profile,
    });
    if (!success) {
      const delete_file = await prisma.file.delete({
        where: {
          id: file.id,
          profileId,
        },
      });
      return new NextResponse("File couldnt be enqueued", { status: 500 });
    }
    return NextResponse.json({ file, out });
  } catch (error) {
    console.log("FILE_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) return new NextResponse("Unauthorized", { status: 401 });

    const { firestoreZipUrl, fileId } = await req.json();

    console.log({ firestoreZipUrl, fileId });
    const { fileDeleted, message } = await deleteFile(firestoreZipUrl);

    if (!fileDeleted)
      return new NextResponse(message as string, { status: 400 });
    const deleted_file_prisma = await prisma.file.delete({
      where: {
        id: fileId,
        profileId: profile.id,
      },
    });
    console.log({ message });
    return NextResponse.json({
      deleted_file_prisma,
      fileDeleted,
      fileId,
      message,
    });
  } catch (error) {
    console.log("FILE_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
