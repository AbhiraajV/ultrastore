const firebaseConfig = {
  apiKey: "AIzaSyC5nSbnSe5QzOatP8-wXdPtZeC0nCA52kg",
  authDomain: "ultrastore.firebaseapp.com",
  projectId: "ultrastore",
  storageBucket: "ultrastore.appspot.com",
  messagingSenderId: "159040339947",
  appId: "1:159040339947:web:f69d4a31cb53cd1332a3ae",
  measurementId: "G-L66TLDKHBC",
};
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL } = require("firebase/storage");
const axios = require("axios");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const downloadFile = async (filePath, destinationPath) => {
  try {
    const fileRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(fileRef);

    console.log("Downloading");
    const response = await axios.get(downloadURL, { responseType: "stream" });

    // Save the file to the destination path
    const writer = response.data.pipe(
      require("fs").createWriteStream(destinationPath)
    );

    return new Promise((resolve, reject) => {
      writer.on("finish", () =>
        resolve({ success: true, path: destinationPath })
      );
      writer.on("error", (error) => {
        console.error("Error downloading file:", error);
        resolve({ success: false, path: undefined });
      });
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return { success: false, path: undefined };
  }
};

module.exports = downloadFile;
