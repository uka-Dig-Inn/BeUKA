const functions = require("firebase-functions");
const fetch = require("node-fetch");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

initializeApp(functions.config().firebase);

const db = getFirestore();

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.beforeCreate = functions.auth.user().beforeCreate((user, context) => {
  if (user.email.indexOf("@uka.no") === -1) {
    throw new functions.auth.HttpsError("invalid-argument. Unauthorized");
  }
});

exports.beforeSignIn = functions.auth.user().beforeSignIn((user, context) => {
  if (user.email.indexOf("@uka.no") === -1) {
    throw new functions.auth.HttpsError("invalid-argument. Unauthorized");
  }
});

exports.scheduledFunction = functions.pubsub
  .schedule("every day 16:00")
  .timeZone("utc")
  .onRun(() => {
    const addDoc = async () => {
      await db.collection("notifications").add({
        username: "testuser",
        expoPushToken: "Expo[asmmsalkfspmvpk]",
      });
    };
    addDoc();

    return null;
  });

/*
exports.sendPushNotification = functions.database
  .ref("notifications/id")
  .onCreate((event) => {
    const root = event.data.ref.root;
    const messages = [];

    return root
      .child("/users")
      .once("value")
      .then((snapshot) => {
        snapshot.forEach((childSnapshot) => {
          const expoPushToken = childSnapshot.val().expoPushToken;

          if (expoPushToken) {
            messages.push({
              to: expoPushToken,
              body: "New Note Added",
            });
          }
        });
        return Promise.all(messages);
      })
      .then((messages) => {
        fetch("https://exp.host/--/api/v2/push/send", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Accept-Encoding": "gzip, deflate",
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            host: "expo.host",
          },
          body: JSON.stringify(messages),
        });
      });

      
  });
  */
