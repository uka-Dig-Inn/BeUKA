import express from "express";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { readFileSync } from "fs";

/**
 * Config fil for å uploade til mitt firebase proskjekt sin backend.
 */
const firebaseConfig = {
  storageBucket: "gs://beuka-backend.appspot.com",
  projectId: "beuka-backend",
};

/**
 * Starter opp firebase backenden
 */
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const app = express();
app.use(express.json());

const PORT = 3000;

/**
 * Enkelt endepunkt som tar imot en fil og lagrer den i firebase storage.
 */
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get("/test/upload_sliten", (_req, res) => {
  const file = readFileSync(__dirname + "/assets/sliten_haakon.png");
  const storageRef = ref(storage, "sliten_haakon.png");
  uploadBytes(storageRef, file)
    .then(() => {
      res.send("Uploaded");
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
