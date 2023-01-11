import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, FlatList, StatusBar, SafeAreaView } from "react-native";
import Post from "./Post";

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
  const renderPost = (post) => <Post key={post.id} {...post} />;

  return (
    <SafeAreaView style={styles.container}>
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
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    }
});
