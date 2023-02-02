import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Button, 
  Platform,
  TouchableOpacity
} from "react-native";
import { PostProps } from "../types/Post";
import * as ImagePicker from "expo-image-picker";


/**
 * Komponent for å vise en post.
 * Tar inn post data og displayer en post.
 * Enkel kravspec:
 * - Viser tittel og innhold
 * - Laste inn bilde fra databasen
 * - Hvis beUKA prompten ikke er skjedd enda, 
 * - Vis UKA logo over bilde som er lastet inn
 * - Vis isåfall en prompt om å ta bilde ved å trykke på UKA-logoen,
 * - Når den trykkes på, skal man få de seksti sekundene på å ta et bilde
 * - Her er grove docs å bruke : https://docs.expo.dev/versions/latest/sdk/imagepicker/
 * 
 * @param post - posten som tas inn
 * 
 * TODO
 * - Fikse at ved å trykke på logo kickes countdown og 
 * 
 */
const Post = (post: any) => {

  const [isShowingText, setIsShowingText] = useState(true);
  
  const [image, setImage] = useState(null);
  
  useEffect(() => {
    console.log(post);
  }, [image]);


  const openCamera = async () => {

    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
      if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your photos!");

      } else {
        const result: any = await ImagePicker.launchCameraAsync(
          {
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
          }
        );
    
        if (!result.cancelled) {
          setImage(result.uri);
        }
        return result;
      }
    }

  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <Text style={styles.title}>{post.item.title}</Text>
        <Text>{post.item.body}</Text>
      </View>
      <View style={styles.body}>
        <ImageBackground style={styles.image} source={image ? {uri: image} : require("../assets/iphone.jpg")}>
          <ImageBackground style={[styles.image, styles.button]} source={image ? {uri: image} : require("../assets/UKA_Sub.jpg")}>
            {isShowingText ? <TouchableOpacity style={styles.buttonContent} onPress={() => {
                openCamera();
                if (image != null) {
                  setIsShowingText(false);
                }
                }}>
                <Text>
                  Pick an image from camera roll
                </Text>
              </TouchableOpacity> : <></>}
                  
          </ImageBackground>        
        </ImageBackground>
      </View>
      <View style={styles.footer}>
        <Text>{post.item.description} Lorem ipsum dolor sit amet.</Text>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#E5A9AA",
    width: Dimensions.get("window").width - 50,
    marginBottom: 50,
    height: Dimensions.get("window").height / 1.35,
    // borderRadius: 7,
    // flexDirection: "column",
    
  },
  header: {
    // fontSize: 20,
    // fontFamily: "Raleway-bold",
    // // flexDirection: "column",
    backgroundColor: "red",
    height: "10%",
  },
  body: {
    // fontSize: 16,
    // fontFamily: "Raleway-regular",
    // // flexDirection: "column",
    height: "80%",

  },
  footer: {
    height: "10%",
    backgroundColor: "green",

  },
  title: {

  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    
  },
  buttonContent: {
    backgroundColor: "blue",

  },
  image: {
    // marginTop: 20,
    // alignSelf: "center",
    // borderRadius: 7,
    width: "100%",
    height: "100%",
    // // aspectRatio: Platform.OS === "ios" ? 4/3 : 0.75,
    // resizeMode: "contain",
    // backgroundColor: "white",
    // opacity: 0.9,
    // flexDirection: "column",
    padding: 0
  },
  description: {
    // fontSize: 16,
    // fontFamily: "Raleway-regular",
    backgroundColor: "#E5A9AA",
    // flex: 2,
    // height: "10%",
    // // flexDirection: "column",
  },
  
});
