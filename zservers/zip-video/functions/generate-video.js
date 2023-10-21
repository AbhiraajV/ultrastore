const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");

const image_size = {
  R_240p: {
    total_pixels: 320 * 240,
    w_h: { width: 320, height: 240 },
    min_size: 819200,
    max_size: 4096000,
    videoSize: "320x240",
    common_name: "SD",
  },
  R_360p: {
    total_pixels: 480 * 360,
    w_h: { width: 480, height: 360 },
    min_size: 1440000,
    max_size: 8192000,
    videoSize: "480x360",
    common_name: "HD 360p",
  },
  R_480p: {
    total_pixels: 640 * 480,
    w_h: { width: 640, height: 480 },
    min_size: 1920000,
    max_size: 12288000,
    videoSize: "640x480",
    common_name: "HD 480p",
  },
  R_720p: {
    total_pixels: 1280 * 720,
    w_h: { width: 1280, height: 720 },
    min_size: 3840000,
    max_size: 20971520,
    videoSize: "1280x720",
    common_name: "HD 720",
  },
  R_1080p: {
    total_pixels: 1920 * 1080,
    w_h: { width: 1920, height: 1080 },
    min_size: 7680000,
    max_size: 41943040,
    videoSize: "1920x1080",
    common_name: "Full HD",
  },
  R_1440p: {
    total_pixels: 2560 * 1440,
    w_h: { width: 2560, height: 1440 },
    min_size: 11520000,
    max_size: 62914560,
    videoSize: "2560x1440",
    common_name: "Quad HD",
  },
  R_2160p: {
    total_pixels: 3840 * 2160,
    w_h: { width: 3840, height: 2160 },
    min_size: 23040000,
    max_size: 125829120,
    videoSize: "3840x2160",
    common_name: "4K",
  },
  R_4320p: {
    total_pixels: 7680 * 4320,
    w_h: { width: 7680, height: 4320 },
    min_size: 46080000,
    max_size: 251658240,
    videoSize: "7680x4320",
    common_name: "8K",
  },
};
const createLosslessVideoFromImages = async (
  imageDir,
  outputVideoPath,
  videoResolution
) => {
  videoResolution = image_size[videoResolution].videoSize;
  try {
    const imagePaths = fs.readdirSync(imageDir).filter((file) => {
      return (
        file.toLowerCase().endsWith(".png") ||
        file.toLowerCase().endsWith(".jpeg") ||
        file.toLowerCase().endsWith(".jpg")
      );
    });

    if (imagePaths.length === 0) {
      return {
        success: false,
        message: "No image files found in the directory.",
      };
    }

    return new Promise((resolve) => {
      const fps = 1; // Adjust the frame rate as needed
      const videoSize = videoResolution; // Use the desired resolution, e.g., '1920x1080' for Full HD

      ffmpeg()
        .input(`${imageDir}/image%d.png`)
        .inputFPS(fps)
        .videoCodec("libx264") // Use a lossless codec
        .outputOptions([
          "-vf",
          `scale=${videoSize}`,
          "-pix_fmt yuv444p", // Preserve pixel format
          "-crf 0", // Set the quality to the maximum (lossless)
          "-b:v 100M", // Set a high bitrate
        ])
        .output(outputVideoPath)
        .on("start", (cmd) => {
          console.log("Conversion started:", cmd);
        })
        .on("progress", (info) => {
          console.log("Conversion progress:", info.percent + "%");
        })
        .on("end", () => {
          console.log("Conversion finished.");
          resolve({ success: true, path: outputVideoPath });
        })
        .on("error", (err, stdout, stderr) => {
          console.error("Error:", err, "Std Error:", stderr);
          resolve({ success: false, message: "Video creation failed." });
        })
        .run();
    });
  } catch (error) {
    console.error("Error creating lossless video from images:", error);
    return {
      success: false,
      message: "An error occurred while processing the images.",
    };
  }
};

module.exports = createLosslessVideoFromImages;
