import { redirect } from "next/navigation";
import Loading from "@/components/Loading";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";
import { uploadVideoToYouTube } from "@/utils/youtube/upload";

async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const code = searchParams?.code as string;
  const refresh = searchParams?.refresh as string;
  const expiry_date = searchParams?.expiry_date as string;
  const fileid = searchParams?.fileid as string;
  const profile = await currentProfile();
  const file = await prisma.file.findFirst({
    where: {
      profileId: profile?.id,
      id: fileid,
    },
  });
  if (!profile || !code || code.length === 0) {
    return redirectToSignIn();
  }

  console.log({ profile, code, refresh, expiry_date });

  const updatedProfile = await prisma.profile.update({
    where: { id: profile.id },
    data: {
      youtubeAccessToken: code,
      youtubeRefreshToken: refresh,
      youtubeTokenExpiry: new Date(parseInt(expiry_date, 10)).toISOString(),
    },
  });
  console.log({ updatedProfile });

  if (updatedProfile) redirect("/your-files/");

  return <Loading />;
}

export default Page;
