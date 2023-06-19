import React from "react";
import PostFooter from "./PostFooter";
import PostImages from "./PostImage";
import PostHeader from './PostHeader'
import { View ,StyleSheet} from "react-native";
import { IPost } from "../../../types";

function Post({
    user: { username, photoUrl },
    images,
    comments,
    caption,
  }: IPost) {
    return (
      <View style={PostStyles.container}>
        <PostHeader username={username} photoUrl={photoUrl} />
        <PostImages images={images} />
        <PostFooter comments={comments} caption={caption} likes={3000} />
      </View>
    );
  }
  const PostStyles = StyleSheet.create({
    container: {
      marginBottom: 30,
      borderTopColor: "#ccc",
      borderTopWidth: 2,
      borderStyle: "solid",
    },
  });