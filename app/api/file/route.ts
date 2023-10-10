import { currentProfile } from "@/lib/current-profile";
import prisma from "@/lib/prisma";
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
    return NextResponse.json(file);
  } catch (error) {
    console.log("FILE_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
