import React, { useEffect, useState, useCallback } from "react";
import { Text, View, StyleSheet, Dimensions, FlatList, StatusBar, SafeAreaView, ScrollView } from "react-native";
import Post from "./Post";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

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
    }
];

const Feed = () => {
  
  const [fontsLoaded] = useFonts({
    'Raleway-regular': require('../assets/fonts/Raleway/static/Raleway-Regular.ttf'),
    'Raleway-bold': require('../assets/fonts/Raleway/static/Raleway-Bold.ttf'),
  
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  
  
  const renderPost = (post) => <Post key={post.id} {...post} />;


  return (

    <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
     <FlatList
        data={initialPosts}
        renderItem={renderPost}
        keyExtractor={post => post.id.toString()}
      /> 
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    }
});
