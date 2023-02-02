import React, { useEffect, useState, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import Post from "./Post";

import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

import { signOut } from "firebase/auth";
import auth from "../firebaseConfig";

const initialPosts = [
  {
    id: 1,
    title: "Post 1",
    body: "Body 1",
  },
  {
    id: 2,
    title: "Post 2",
    body: "Body 2",
  },
  {
    id: 3,
    title: "Post 3",
    body: "Body 3",
  },
  {
    id: 4,
    title: "Post 4",
    body: "Body 4",
  },
];

const Feed = ({ navigation }) => {
  const renderPost = (post: any) => <Post key={post.id} {...post} />;

  const loggUt = async () => {
    await signOut(auth);
    console.log("Signed out");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={initialPosts}
        renderItem={renderPost}
        keyExtractor={(post) => post.id.toString()}
      />
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingVertical: 10,
          backgroundColor: "#EC6553",
          marginVertical: 20,
          borderRadius: 5,
        }}
        onPress={() => {
          loggUt();
        }}
      >
        <Text
          style={{
            fontSize: 20,
            color: "white",
            fontFamily: "Raleway-regular",
          }}
        >
          Logg ut
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "700",
  },
});
