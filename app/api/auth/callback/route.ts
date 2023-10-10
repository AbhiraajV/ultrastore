import { OAuth2Client } from "google-auth-library";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const oauth2Client = new OAuth2Client(
    process.env.OAUTH2_CLIENTID,
    process.env.OAUTH2_CLIENT_SECRET,
    process.env.REDIREC_URI
  );
  console.log(req.url);
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");

  const { tokens } = await oauth2Client.getToken(code || "");
  oauth2Client.setCredentials(tokens);
  console.log({ tokens });
  redirect("http://localhost:3000/upload?code=" + tokens.access_token);
}
