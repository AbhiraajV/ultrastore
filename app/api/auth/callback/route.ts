import oauth2Client from "@/lib/oauth-yt";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: NextResponse) {
  console.log(req.url);
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const fileid = searchParams.get("fileid");

  const { tokens } = await oauth2Client.getToken(code || "");
  oauth2Client.setCredentials(tokens);
  console.log({ tokens });
  redirect(
    "http://localhost:3000/upload?code=" +
      tokens.access_token +
      "&refresh_token=" +
      tokens.refresh_token +
      "&fileid=" +
      fileid +
      "&expiry_date=" +
      tokens.expiry_date
  );
}
