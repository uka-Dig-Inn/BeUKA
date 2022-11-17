import express from "express";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  storageBucket: "gs://beuka-backend.appspot.com",
  projectId: "beuka-backend",
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
const app = express();
app.use(express.json());

const PORT = 3000;

app.get("/test/upload_sliten", (_req, res) => {
  const storageRef = ref(storage, "assets/sliten_haakon.png");
  /* uploadBytes(storageRef).then((snapshot) => {
    console.log("Uploaded a blob or file!");
    res.send(snapshot);
  }); */
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
