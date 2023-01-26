import { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
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

import auth from "../firebaseConfig";

import { useFonts } from "expo-font";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    "Raleway-regular": require("../assets/fonts/Raleway/static/Raleway-Regular.ttf"),
    "Raleway-bold": require("../assets/fonts/Raleway/static/Raleway-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      expoClientId:
        "788859697758-m2pje4uie5ncned04o10tq6km06thvlp.apps.googleusercontent.com",
      scopes: ["email"],
      redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    },
    { useProxy: true }
  );

  useEffect(() => {
    const signIn = async () => {
      if (response?.type === "success") {
        const { id_token } = response.params;
        const credential = GoogleAuthProvider.credential(id_token);
        const res = await signInWithCredential(auth, credential);
        navigation.navigate("feed");
      }
    };
    signIn();
  }, [response]);

  const logOut = async () => {
    await signOut(auth);
    console.log("SIGNED OUT");
    setIsLoggedIn(false);
  };

  if (!fontsLoaded) {
    return null;
  }

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

  return (
    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.topContainer}>
        <Text style={styles.headerText}>BeUKA</Text>
      </View>
      <View style={styles.bottomContainer}>
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
      <Text style={styles.bottomText}>Laget av diginn!</Text>
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
};

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
