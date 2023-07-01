import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { IComments, IPost, likes } from "../../../types";
import { typographyStyles } from "../../../constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../screens";
import useAuth, { authValue } from "../../../hooks/useAuth";
import { User } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Caption from "./Caption";
import AddCommentModal from "../../Shared/AddCommentModal";
type props = {
  caption: string;
  username: string;
  id: string;
};
export default function PostFooter({ caption, username, id }: props) {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Main">>();
  const { user } = useAuth() as authValue;
  const [comments, setComments] = useState<IComments[]>([]);
  const [likes, setLikes] = useState<number>(0);
  const [hasLiked, setHasLiked] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  // check the likes array to see if the userRef is in it.
  // if not liked add userRef to firebase.
  // if liked remove userRef from firebase and change staet accordingly
  useEffect(() => {
    const docRef = collection(db, "posts", id, "comments");
    const unSub = onSnapshot(docRef, (snapshot) => {
      const comments = snapshot.docs as unknown as IComments[];
      setComments([...comments]);
    });
    return unSub;
  }, [user, id]);
  useEffect(() => {
    const docRef = doc(db, "posts", id);
    const unSub = onSnapshot(docRef, (snapshot) => {
      const { likes } = snapshot.data() as IPost;
      const userLiked: boolean =
        likes.findIndex((userLike) => userLike === (user as User).uid) !== -1;
      setHasLiked(userLiked);
      setLikes(likes.length);
    });
    return unSub;
  }, [user, id]);
  async function handleLike() {
    try {
      const updatedLikes = hasLiked
        ? arrayRemove(user?.uid)
        : arrayUnion(user?.uid);
      await updateDoc(doc(db, "posts", id), {
        likes: updatedLikes,
      });
    } catch (err) {}
  }
  return (
    <View>
      <View style={postFooterStyles.iconsContainer}>
        <View style={postFooterStyles.iconsContainerLeft}>
          <TouchableOpacity onPress={handleLike}>
            {!hasLiked ? (
              <Entypo name="heart-outlined" size={25} color="white" />
            ) : (
              <Entypo name="heart" size={25} color="red" />
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="message-circle" size={25} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="paper-plane-outline" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Feather name="bookmark" size={25} color="white" />
        </TouchableOpacity>
      </View>
      {/* Likes count */}
      <View style={postFooterStyles.likesContainer}>
        <Text style={[postFooterStyles.likesText, typographyStyles.bold]}>
          {likes === 0 ? "no" : likes.toLocaleString("en")}
        </Text>
        <Text style={[postFooterStyles.likesText, typographyStyles.bold]}>
          like{likes > 1 ? "s" : likes === 0 ? "s" : ""}
        </Text>
      </View>
      <View style={postFooterStyles.captionContainer}>
        <Caption>
          {
            <>
              <Text style={[postFooterStyles.username, typographyStyles.bold]}>
                {username}{" "}
              </Text>
              {caption}
            </>
          }
        </Caption>
      </View>
      {/* Comment Link */}
      {comments.length !== 0 && (
        <TouchableOpacity
          style={postFooterStyles.commentContainer}
          onPress={() => navigation.navigate("Comments", { id })}
        >
          <Text style={[postFooterStyles.comment, typographyStyles.bold]}>
            View {comments.length > 1 ? "all" : ""} {comments.length} comment
            {comments.length > 1 ? "s" : ""}
          </Text>
        </TouchableOpacity>
      )}
      {/* Add Comment button */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        style={postFooterStyles.addCommentContainer}
      >
        <View style={postFooterStyles.userImage}>
          <Image
            style={{ height: 25, width: 25 }}
            source={{
              uri:
                user?.photoURL ??
                "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png",
            }}
          />
        </View>
        <Text style={[postFooterStyles.addCommentInput, typographyStyles.bold]}>
          {" "}
          Add Comment...
        </Text>
      </TouchableOpacity>
      {/* Add Comment Modal */}
      <AddCommentModal
        isVisible={showModal}
        toggleVisible={setShowModal}
        id={id}
      />
    </View>
  );
}
const postFooterStyles = StyleSheet.create({
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 10,
  },
  iconsContainerLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 0.3,
  },
  captionContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    flex: 1,
    marginTop: 5,
  },
  username: {
    color: "#fff",
    fontSize: 17,
  },
  likesText: {
    color: "white",
    fontSize: 16,
    marginRight: 2,
  },
  likesContainer: {
    flexDirection: "row",
    paddingLeft: 15,
    marginTop: 10,
    flex: 1,
  },
  commentContainer: {
    paddingLeft: 15,
    marginTop: 5,
  },
  comment: {
    color: "#bbb",
    fontSize: 16,
    marginRight: 1,
  },
  addCommentContainer: {
    flexDirection: "row",
    marginTop: 10,
    paddingHorizontal: 15,
  },
  userImage: {
    marginRight: 10,
    height: 25,
    width: 25,
    overflow: "hidden",
    borderRadius: 12.5,
  },
  addCommentInput: {
    color: "#bbb",
    fontSize: 14,
    alignSelf: "center",
  },
});
