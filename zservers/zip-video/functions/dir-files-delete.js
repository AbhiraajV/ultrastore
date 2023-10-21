const fs = require("fs");
const path = require("path");

const deleteFilesInDirectory = (directoryPath) => {
  try {
    if (!fs.existsSync(directoryPath)) {
      console.error("Directory does not exist:", directoryPath);
      return { success: false, path: undefined };
    }

    const files = fs.readdirSync(directoryPath);

    files.forEach((file) => {
      const filePath = path.join(directoryPath, file);

      // Check if it's a file (not a subdirectory)
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath); // Delete the file
      }
    });

    return { success: true, path: directoryPath };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, path: undefined };
  }
};

module.exports = deleteFilesInDirectory;
