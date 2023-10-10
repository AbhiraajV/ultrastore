import { redirect } from "next/navigation";
import Loading from "@/components/Loading";
import prisma from "@/lib/prisma";
import { currentProfile } from "@/lib/current-profile";
import { redirectToSignIn } from "@clerk/nextjs";

async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const code = searchParams?.code as string;
  const refresh = searchParams?.refresh as string;
  const profile = await currentProfile();

  if (!profile || !code || code.length === 0) {
    return redirectToSignIn();
  }

  console.log({ profile, code });

  const updatedProfile = await prisma.profile.update({
    where: { id: profile.id },
    data: {
      youtubeAccessToken: code,
      youtubeRefreshToken: refresh,
    },
  });
  console.log({ updatedProfile });

  if (updatedProfile) redirect("/your-files");

  return <Loading />;
}

export default Page;
