import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { simpleFirestoreZipToFile } from "@/utils/fromVideoFlow/simpleFirestoreZipToFile";
import { downloadFileFromFirestore } from "@/utils/firebase/firebase";
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
    if (!file || !file?.youtubeUrl)
      return new NextResponse("File isnt ready for upload", { status: 400 });

    const blob = await downloadFileFromFirestore(file.firestoreZipUrl);
    console.log({ blob });
    return NextResponse.json({ blob: blob });
  } catch (error) {
    console.log("FILE_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
