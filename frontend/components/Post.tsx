import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground } from "react-native";
import { PostProps } from "../types/Post";

const Post = (post: any) => {
  useEffect(() => {
    console.log(post);
  }, []);

  return (
    <View style={styles.item}>
      <Text style={styles.title}>{post.item.title}</Text>
      <Text style={styles.body}>{post.item.body}</Text>
      <ImageBackground source={require("../assets/MEMES/hildeGcut_out.png")}>
        <Image
            style={styles.image}
            source={require("../assets/VISJONSlogo_rød.png")}
        ></Image>
      </ImageBackground>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: "#E5A9AA",
    width: Dimensions.get("window").width - 50,
    marginBottom: 20,
    height: Dimensions.get("window").height / 2.5,
    borderRadius: 7,
  },
  title: {
    fontSize: 20,
    fontFamily: "Raleway-bold",
  },
  body: {
    fontSize: 16,
    fontFamily: "Raleway-regular",
  },
  image: {
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 7,
    width: "100%",
    height: undefined,
    aspectRatio: 1,
    resizeMode: "contain",
    backgroundColor: "white",
    opacity: 0.9,
  },
});
