const Publisher = require("../queue/publisher");
const deleteFilesInDirectory = require("./dir-files-delete");
const downloadFile = require("./download-files");
const createLosslessVideoFromImages = require("./generate-video");
const consolidateImagesToVideo = require("./generate-video");
const unzipAndDelete = require("./unzip");
const uploadFile = require("./upload-file-firebase");
const uploadVideoToYouTube = require("./upload-yt");
const BASE_IMAGES_FOLDER = "./images/";
const handler = async (message, channel) => {
  const publisher = new Publisher();
  if (!message) {
    console.log("Received an undefined message. Dequeued!");
    channel.ack(message);
    return;
  }

  const data = JSON.parse(message.content);

  const { file, profile } = data.message;
  console.log("Received workload ", { file, profile });
  if (!file || !profile) {
    console.log("Promp cannot be null removing");
    console.log("Dequeued!");
    return;
  }
  deleteFilesInDirectory(BASE_IMAGES_FOLDER);
  console.log("Cleared Media Folder");

  try {
    const { success, path } = await downloadFile(
      file.firestoreZipUrl,
      BASE_IMAGES_FOLDER + file.firestoreZipUrl.split("/")[1]
    );
    if (!success) {
      console.log("############## PROCESS FAILED MID_WAY ###################");
      return;
    }
    console.log("Downloaded file", { success, path });
    const { success: unzip_sucess, path: new_path } = await unzipAndDelete(
      path
    );
    if (!unzip_sucess) {
      console.log("############## PROCESS FAILED MID_WAY ###################");
      return;
    }
    console.log("Unzipped file", { unzip_sucess, new_path });
    const {
      success: video_generation_success,
      path: video_generated_path,
      message: consolidate_msg,
    } = await createLosslessVideoFromImages(
      BASE_IMAGES_FOLDER,
      BASE_IMAGES_FOLDER + "video.mp4",
      file.resolution
    );
    if (!video_generation_success) {
      console.log("############## PROCESS FAILED MID_WAY ###################");
      return;
    }
    console.log({
      success: video_generation_success,
      video_generated_path,
      consolidate_msg,
    });
    const { success: firebase_upload_success, path: firebase_path } =
      await uploadFile(
        BASE_IMAGES_FOLDER + "video.mp4",
        file.firestoreZipUrl.split("-images.zip")[0] + "-video.mp4",
        3
      );
    if (!firebase_upload_success) {
      console.log("############## PROCESS FAILED MID_WAY ###################");
      return;
    }
    // console.log({ firebase_upload_success, downloadUrl });
    console.log("DONE! :D, Communicating to Database...");
    const { out, success: publish_success } = await publisher.publishMessage(
      "communicate",
      {
        file,
        profile,
        uploaded_id: "__FIREBASE__:" + firebase_path,
      }
    );
    if (!publish_success) {
      console.log("############## PROCESS FAILED MID_WAY ###################");
      return;
    }
    console.log("Informed DB!");
    channel.ack(message);
    console.log("Dequeued!");
  } catch (err) {
    console.log({ unknown_error: err });
  }
};

module.exports = handler;

// const {
//   success: youtube_upload_success,
//   data,
//   uploaded_id,
// } = await uploadVideoToYouTube({
//   name: file.name,
//   description: file.description,
//   path: BASE_IMAGES_FOLDER + "/video.mp4",
//   accessToken: profile.youtubeAccessToken,
// });
// if (!youtube_upload_success) {
// }
// console.log({ data, uploaded_id });
