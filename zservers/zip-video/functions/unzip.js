const fs = require("fs");
const path = require("path");
const StreamZip = require("node-stream-zip");

const unzipAndDelete = async (zipFilePath) => {
  console.log("Unzipping");
  return new Promise(async (resolve, reject) => {
    try {
      const directoryPath = path.dirname(zipFilePath);

      const zip = new StreamZip({
        file: zipFilePath,
        storeEntries: true,
      });

      zip.on("ready", () => {
        zip.extract(null, directoryPath, (err, count) => {
          if (err) {
            console.error("Error unzipping:", err);
            zip.close();
            reject({ success: false, path: undefined });
          } else {
            zip.close();

            // Delete the zip file after unzipping
            fs.unlink(zipFilePath, (err) => {
              if (err) {
                console.error("Error deleting zip file:", err);
              }
            });

            resolve({ success: true, path: directoryPath });
          }
        });

        zip.on("error", (err) => {
          console.error("Error opening zip file:", err);
          reject({ success: false, path: undefined });
        });
      });
    } catch (error) {
      console.error("Error:", error);
      reject({ success: false, path: undefined });
    }
  });
};

module.exports = unzipAndDelete;
