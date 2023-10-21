const firebaseConfig = {
  apiKey: "AIzaSyC5nSbnSe5QzOatP8-wXdPtZeC0nCA52kg",
  authDomain: "ultrastore.firebaseapp.com",
  projectId: "ultrastore",
  storageBucket: "ultrastore.appspot.com",
  messagingSenderId: "159040339947",
  appId: "1:159040339947:web:f69d4a31cb53cd1332a3ae",
  measurementId: "G-L66TLDKHBC",
};
const { readFile } = require("fs/promises");

const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes } = require("firebase/storage");

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadFile = async (sourcePath, storagePath) => {
  try {
    const fileRef = ref(storage, storagePath);

    const bytes = new Uint8Array(await readFile(sourcePath));
    return await uploadBytes(fileRef, bytes)
      .then((snapshot) => {
        console.log({ snapshot });
        return { success: true, path: snapshot.metadata.fullPath };
      })
      .catch((error) => {
        console.log({ error });
        return { success: false, path: "" };
      });
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, path: "" };
  }
};

module.exports = uploadFile;
