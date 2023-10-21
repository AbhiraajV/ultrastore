import oauth2Client from "@/lib/oauth-yt";
import { redirect } from "next/navigation";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const fileid = searchParams.get("fileid");
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.upload"],
  });
  console.log({ authUrl });
  return redirect(authUrl + "&fileid=" + fileid);
}
