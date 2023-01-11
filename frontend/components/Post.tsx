import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PostProps } from "../types/Post";


const Post = (post: any) => {
    
    useEffect(() => {
        console.log(post)
    },[])
  
    return (
    <View style={styles.item}>
        <Text>{post.item.title}</Text>
        <Text>{post.item.body}</Text>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
    item: {
        flex: 1,
        backgroundColor: '#E5A9AA',
        width: Dimensions.get('window').width - 100,
        height: Dimensions.get('window').height / 3,
        margin: Dimensions.get('window').height / 20,
        borderRadius: 7,
    },
});