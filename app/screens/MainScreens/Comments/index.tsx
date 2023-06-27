import { StyleSheet, Text, View, FlatList, Image} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../../components/Shared/Screen";
import CommentModal from "../../../components/Shared/CommentModal";
import { StackScreenProps } from "@react-navigation/stack";
import { IPost, comments } from "../../../types";
import { typographyStyles } from "../../../constants";
import { RootStackParamList } from "../..";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Loader from "../../../components/Shared/Loader";
type commentBoxProps = {
  url: string;
  username: string;
  comment: string;
  timestamp : string;
};
function CommentBox({ url, username, comment, timestamp }: commentBoxProps) {
  return (
    <View style={CommentBoxStyles.container}>
      <Image style={CommentBoxStyles.image} source={{ uri: url }} />
      <View>
        <Text style={[CommentBoxStyles.username, typographyStyles.md]}>
          {username}
          {"  "} <Text style={CommentBoxStyles.createdAt}>{timestamp}</Text>
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
    marginTop: 5,
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
 /** @todo format timestamp */
  const { id } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<comments[]>([]);
  const [caption, setCaption] = useState({
    caption: "",
    photoUrl: "",
    username: "",
    timestamp:""
  });
  useEffect(() => {
    const unSubscribe = onSnapshot(
      doc(db,'posts',id),(snapshot)=>{
        if(snapshot.exists()){
          let {
            caption,
            comments,
            user: { photoUrl, username },
            timestamp
          } = snapshot.data() as IPost;
          photoUrl =
            photoUrl.length === 0
              ? "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png"
              : photoUrl;
          setCaption({
            caption,
            photoUrl,
            username,
            timestamp: timestamp as string
          });
          setComments([...comments]);
        }  
    });
    return unSubscribe();
  }, [db,id]);

  return (
    <>
      {loading && <Loader />}
      <Screen>
        <View style={styles.commentHeader}>
          <CommentBox
            url={caption.photoUrl}
            username={caption.username}
            comment={caption.caption}
            timestamp={caption.timestamp}
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
                timestamp={item.timestamp as string}
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
        <CommentModal isVisible={true} id={id} />
      </Screen>
    </>
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
