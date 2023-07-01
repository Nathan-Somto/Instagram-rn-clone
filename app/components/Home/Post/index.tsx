import React from "react";
import PostFooter from "./PostFooter";
import PostImages from "./PostImage";
import PostHeader from "./PostHeader";
import { View, StyleSheet } from "react-native";
import { IPost } from "../../../types";
type props = {
  postData: IPost;
};
export default function Post({ postData }: props) {
  const {
    user: { username, photoUrl },
    images,
    caption,
    id,
  
  } = postData;
  return (
    <View style={PostStyles.container}>
      <PostHeader username={username} photoUrl={photoUrl} />
      <PostImages images={images} />
      <PostFooter
        username={username}
        caption={caption}
        id={id}
      />
    </View>
  );
}
const PostStyles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
