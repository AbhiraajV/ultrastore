import { OAuth2Client } from "google-auth-library";
import { redirect } from "next/navigation";

export async function GET(req: Request, res: Response) {
  const oauth2Client = new OAuth2Client(
    process.env.OAUTH2_CLIENTID,
    process.env.OAUTH2_CLIENT_SECRET,
    process.env.REDIREC_URI
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/youtube.upload"],
  });
  return redirect(authUrl);
}
