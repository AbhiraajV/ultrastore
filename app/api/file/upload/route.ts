import { currentProfile } from "@/lib/current-profile";
import { NextResponse } from "next/server";
import { Publisher } from "@/utils/rabbitmq/publisher";
import prisma from "@/lib/prisma";
import { uploadVideoToYouTube } from "@/utils/youtube/upload";
import EmailTemplateOnYoutube from "@/components/email-template/EmailTemplateOnYoutube";
import { Resend } from "resend";
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
    if (!profile.youtubeAccessToken)
      return new NextResponse("Access token missing", { status: 400 });
    const upload = await uploadVideoToYouTube({
      file,
      accessToken: profile.youtubeAccessToken!,
    });
    if (!upload.success) {
      return new NextResponse("Couldnt upload file", { status: 500 });
    }
    const updatedFile = await prisma.file.update({
      where: {
        profileId: profile?.id,
        id: file.id as string,
      },
      data: {
        youtubeUrl: "__YOUTUBE_URL__:" + upload.data.id,
      },
    });

    const resend = new Resend(process.env.RESEND_APIKEY);

    await resend.emails.send({
      from: "Ultrastore <onboarding@resend.dev>",
      to: [profile.email],
      subject: "Ultrastore has sent you an update! 🚀",
      react: EmailTemplateOnYoutube({
        profile: profile,
        file: file,
      }) as React.ReactElement,
    });

    return NextResponse.json({ file: updatedFile });
  } catch (error) {
    console.log("FILE_DELETE", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
