import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  Button, 
  Platform
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
      <View>
        <Text style={styles.title}>{post.item.title}</Text>
        <Text style={styles.body}>{post.item.body}</Text>
        <Button title="Pick an image from camera roll" onPress={openCamera}/>
        <ImageBackground source={image ? {uri: image} : require("../assets/Bb_blue.jpg")}>
          {image ? null :
          <Image
          style={styles.image}
          source={require("../assets/Red_flag.svg.png")}
        ></Image>
        }
        </ImageBackground>
      </View>
      <View>
        <Text style = {styles.description}>{post.item.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales molestie nisl, a elementum leo congue tempor. Aliquam erat volutpat. Aenean id pharetra orci.</Text>
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: "#E5A9AA",
    width: Dimensions.get("window").width - 50,
    marginBottom: 120,
    height: Dimensions.get("window").height / 2.5,
    borderRadius: 7,
    
  },
  title: {
    fontSize: 20,
    fontFamily: "Raleway-bold",
    flex: 1,
    flexDirection: "column",
  },
  body: {
    fontSize: 16,
    fontFamily: "Raleway-regular",
    flex: 1,
    flexDirection: "column",
  },
  image: {
    marginTop: 20,
    alignSelf: "center",
    borderRadius: 7,
    width: "100%",
    height: "100%",
    // aspectRatio: Platform.OS === "ios" ? 4/3 : 0.75,
    resizeMode: "contain",
    backgroundColor: "white",
    opacity: 0.9,
    flex: 3,
    flexDirection: "column",
  },
  description: {
    fontSize: 16,
    fontFamily: "Raleway-regular",
    backgroundColor: "#E5A9AA",
    flex: 3,
    flexDirection: "column",
  },
  
});
