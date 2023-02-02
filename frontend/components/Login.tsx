import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";

import { AsyncStorage } from "react-native";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
} from "firebase/auth";

import {
  getDatabase,
  ref,
  onValue,
  onChildAdded,
  set,
  push,
} from "firebase/database";

import auth, { app } from "../firebaseConfig";

import { useFonts } from "expo-font";

import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

import * as Notifications from "expo-notifications";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    "Raleway-regular": require("../assets/fonts/Raleway/static/Raleway-Regular.ttf"),
    "Raleway-bold": require("../assets/fonts/Raleway/static/Raleway-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isAddedToDb, setIsAddedToDb] = useState(false);

  const [pushToken, setPushToken] = useState(null);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      expoClientId:
        "788859697758-m2pje4uie5ncned04o10tq6km06thvlp.apps.googleusercontent.com",
      scopes: ["email"],
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  // mal for alert
  const createAlert = (title: string, message: string) =>
    Alert.alert(title, message, [
      {
        text: "OK",
        onPress: () => {},
      },
    ]);

  const addVerifiedUserToDatabase = async (user) => {
    try {
      let token;

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      //console.log(token);

      const db = getDatabase(app);
      const reference = ref(db, "users");

      const newUserRef = push(reference);

      set(newUserRef, {
        //created: user.created,
        //email: user.email,
        //expoNotificationToken: user.token
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        expoPushToken: token,
      });
      console.log("ADDED");
      setIsAddedToDb(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const signIn = async () => {
      if (response?.type === "success") {
        try {
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token);
          const res = await signInWithCredential(auth, credential);

          console.log(res.user.displayName);

          await addVerifiedUserToDatabase(res.user);

          //setIsLoggedIn(true);

          navigation.navigate("Feed");
        } catch (error) {
          createAlert(
            "Feil",
            "Det er kun brukere med UKA-mail som kan bruke appen!"
          );
        }
      }
    };
    signIn();
  }, [response]);

  const logOut = async () => {
    await signOut(auth);
    console.log("SIGNED OUT");
    setIsLoggedIn(false);
  };

  // MED MIN VANLIGE GMAIL IOS: 788859697758-0dvjg775trqaim2kmhp4lja8pmj6c2ld.apps.googleusercontent.com

  //IOS MIN MED UKA MAIL: 59684920735-grvq4ts69uioh1col84ld3f0qf17uku9.apps.googleusercontent.com

  //MIN MED UKA MAIL: 59684920735-3pl6ir0vi0afiq2f95697t132v69f7fr.apps.googleusercontent.com

  //MIN VANLIGE GMAIL EXPO: 788859697758-m2pje4uie5ncned04o10tq6km06thvlp.apps.googleusercontent.com

  //HÅKON SIN: 294801479611-hfpvt6d2fb0g2uhkpu0v0hrfejehl6h1.apps.googleusercontent.com

  const signIn = async () => {
    await promptAsync();
    if (response?.type === "success") {
      console.log("LOGGED IN!!");
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      const res = await signInWithCredential(auth, credential);
      console.log("REEES: " + res.user);
    } else {
      console.log(response);
    }
  };

  const leggtil = async () => {
    const db = getDatabase(app);
    const reference = ref(db, "notifications");

    const newUserRef = push(reference);

    set(newUserRef, {
      name: "testtest",
    });
    console.log("ADDED");
  };

  /*
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...

        console.log(errorMessage);
      });

      */

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>BeUKA</Text>
      </View>
      <View style={styles.bottomContainer}>
        {isAddedToDb ? <Text>YESSIR</Text> : <></>}
        <TouchableOpacity
          disabled={!request}
          style={styles.button}
          onPress={() => {
            promptAsync();
          }}
        >
          <Text style={styles.buttonText}>Logg inn</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>Laget av Diginn!</Text>
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
};

/*

        <TouchableOpacity
          disabled={!request}
          style={[styles.button, { marginTop: 20 }]}
          onPress={() => {
            leggtil();
          }}
        >
          <Text style={styles.buttonText}>Test</Text>
        </TouchableOpacity>

*/
export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F9B148",
  },
  button: {
    backgroundColor: "#EC6553",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 25,
    fontWeight: "700",
    color: "white",
  },
  headerText: {
    fontSize: 60,
    marginVertical: 30,
    fontFamily: "Raleway-regular",
    color: "white",
    textShadowColor: "#EC6553",
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
    paddingHorizontal: 30,
  },
  topContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomText: {
    color: "white",
    fontFamily: "Raleway-regular",
    textShadowColor: "#EC6553",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    paddingHorizontal: 10,
  },
});
