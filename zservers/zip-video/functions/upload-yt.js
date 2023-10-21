const { google } = require("googleapis");

const fs = require("fs");
async function uploadVideoToYouTube(videoInfo) {
  const { name, description, path, accessToken } = videoInfo;

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({
    access_token:
      "ya29.a0AfB_byDpxsd2pZF0peSH4TpI1z6Y2foa4QOVPwfsAXwHgJ2hu43yGMuwaKbgu1ETwuqwoUv62wQ7GqKi-bTzYUG7LTeClrOCEtb-UtazQ1MHnfQYDoDNMnkLBz6ENPg2X90lo3k_isGeN79xXOMr6qQXzNzTUC_r-bD3aCgYKASwSARESFQGOcNnCzAld2vZkJb4YcShaw5YLRQ0171",
  });
  const youtube = google.youtube({ version: "v3", auth: oauth2Client });
  try {
    console.log("Uploading to YouTube...");
    const res = await youtube.videos.insert({
      auth: oauth2Client,
      part: "snippet,status",
      resource: {
        snippet: {
          title: name,
          description: description,
        },
        status: {
          privacyStatus: "private",
        },
      },
      media: {
        body: fs.createReadStream(path),
      },
    });

    console.log("Video upload started:", res.data);
    return { success: true, data: res.data, uploaded_id: res.data.id };
  } catch (error) {
    console.log({ error });
    return { success: false, data: error };
  }
}

module.exports = uploadVideoToYouTube;
