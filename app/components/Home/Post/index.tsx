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
    comments,
    caption,
    id,
    likes
  } = postData;
  return (
    <View style={PostStyles.container}>
      <PostHeader username={username} photoUrl={photoUrl} />
      <PostImages images={images} />
      <PostFooter
        comments={comments}
        username={username}
        caption={caption}
        likes={likes}
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
