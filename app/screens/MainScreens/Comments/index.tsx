import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../../components/Shared/Screen";
import CommentModal from "../../../components/Shared/CommentModal";
import { StackScreenProps } from "@react-navigation/stack";
import data from "../../../data/data.json";
import { comments } from "../../../types";
import { typographyStyles } from "../../../constants";
import { RootStackParamList } from "../..";
type commentBoxProps = {
  url: string;
  username: string;
  comment: string;
};
function CommentBox({ url, username, comment }: commentBoxProps) {
  return (
    <View style={CommentBoxStyles.container}>
      <Image style={CommentBoxStyles.image} source={{ uri: url }} />
      <View>
        <Text style={[CommentBoxStyles.username, typographyStyles.md]}>
          {username}{"  "} <Text style={CommentBoxStyles.createdAt}>10h</Text>
        </Text>
        <Text style={[CommentBoxStyles.comment, typographyStyles.md]}>
          {comment}
        </Text>
      </View>
    </View>
  );
}
const CommentBoxStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
  },
  image: {
    height: 30,
    width: 30,
    overflow: "hidden",
    borderRadius: 15,
    marginRight: 10,
    marginTop:5
  },
  username: {
    fontSize: 14,
    marginBottom: 4,
    color: "#fff",
  },
  createdAt: {
    color: "#555",
  },
  comment: {
    fontSize: 16,
    color: "#fff",
    paddingRight: 50,
  },
});
export default function Comments({
  route,
}: StackScreenProps<RootStackParamList, "Comments">) {
  const { userRef } = route.params;
  const [comments, setComments] = useState<comments[]>([]);
  const [caption, setCaption] = useState({
    caption: "",
    photoUrl: "",
    username: "",
  });
  useEffect(() => {
    const post = data.posts.find((item) => item.userRef === userRef);
    if (post) {
      const {
        caption,
        comments,
        user: { photoUrl, username },
      } = post;
      setCaption({
        caption,
        photoUrl,
        username,
      });
      setComments([...comments]);
    }
  }, [userRef]);

  return (
    <Screen>
      <View style={styles.commentHeader}>
        <CommentBox
          url={caption.photoUrl}
          username={caption.username}
          comment={caption.caption}
        />
      </View>
      {comments.length ? (
        <FlatList
          data={comments}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <CommentBox
              url={item.user.photoUrl}
              username={item.user.username}
              comment={item.comment}
            />
          )}
        />
      ) : (
        <View style={styles.noCommentContainer}>
          <Text
            style={[{ color: "#fff", fontSize: 17 }, typographyStyles.bold]}
          >
            No Comments
          </Text>
        </View>
      )}
      <CommentModal isVisible={true} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  commentHeader: {
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  noCommentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
