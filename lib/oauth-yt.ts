import { OAuth2Client } from "google-auth-library";

const oauth2Client = new OAuth2Client(
  process.env.OAUTH2_CLIENTID,
  process.env.OAUTH2_CLIENT_SECRET,
  process.env.REDIREC_URI
);

export default oauth2Client;
