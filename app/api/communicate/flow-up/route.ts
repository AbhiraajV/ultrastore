import EmailTemplate from "@/components/email-template/EmailTemplate";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Resend } from "resend";
export async function POST(req: Request) {
  const { file, profile, uploaded_id } = await req.json();
  try {
    const dbProfile = await prisma.profile.findFirst({
      where: {
        id: profile.id,
      },
    });
    const dbFile = await prisma.file.findFirst({
      where: {
        id: file.id,
        profileId: dbProfile?.id,
      },
    });
    if (!dbProfile || !dbFile)
      return new NextResponse("File or Profile not found", { status: 404 });
    const resend = new Resend(process.env.RESEND_APIKEY);

    const data = await resend.emails.send({
      from: "Ultrastore <onboarding@resend.dev>",
      to: [dbProfile.email],
      subject: "Ultrastore has sent you an update! 🚀",
      react: EmailTemplate({
        profile: dbProfile,
        file: dbFile,
      }) as React.ReactElement,
    });

    const updatedFile = await prisma.file.update({
      where: {
        id: file.id,
        profileId: profile.id,
      },
      data: {
        youtubeUrl: uploaded_id || "",
      },
    });
    return NextResponse.json({ dbProfile, updatedFile });
  } catch (error) {
    console.log("FILE_POST", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
