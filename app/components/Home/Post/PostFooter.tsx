import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { comments, likes } from "../../../types";
import { typographyStyles } from "../../../constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CommentModal from "../../Shared/CommentModal";
import { RootStackParamList } from "../../../screens";
import useAuth, { authValue } from "../../../hooks/useAuth";
import { User } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Caption from "./Caption";
type props = {
  comments: comments[];
  likes: likes;
  caption: string;
  username: string;
  id:string;
};
export default function PostFooter({
  comments,
  likes,
  caption,
  username,
  id,
}: props) {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "Main">>();
  const {user} = useAuth() as authValue;
  const [hasLiked, setHasLiked] = useState(-1);
  const [showModal, setShowModal] = useState(false);
  // check the likes array to see if the userRef is in it.
  // if not liked add userRef to firebase.
  // if liked remove userRef from firebase and change staet accordingly
  useEffect(()=>{
    if(user !== null)
    {
      const userLiked = likes.findIndex((userLike)=> userLike === (user as User).uid);
      setHasLiked(userLiked);
    }
  },[likes,user]);
  async function handleLike()
  {
    try{

      const updatedLikes = [...likes];
      // user has liked and wants to unlike
      if(hasLiked !== -1)
      {
       updatedLikes.splice(hasLiked,1); 
      }
      else{
        if(user !== null)
        {
          updatedLikes.push(user.uid);
        }
        }
        await updateDoc(doc(db, 'posts', id),{
          likes:updatedLikes
         });
    }
    catch(err)
    {

    }
  }
  return (
    <View>
      <View style={postFooterStyles.iconsContainer}>
        <View style={postFooterStyles.iconsContainerLeft}>
          <TouchableOpacity onPress={handleLike}>
            {hasLiked === -1 ? (
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
          {likes.length.toLocaleString("en")}
        </Text>
        <Text style={[postFooterStyles.likesText, typographyStyles.bold]}>
          like{likes.length > 1 ? "s" : ""}
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
              uri: user?.photoURL ?? "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png",
            }}
          />
        </View>
        <Text style={[postFooterStyles.addCommentInput, typographyStyles.bold]}>
          {" "}
          Add Comment...
        </Text>
      </TouchableOpacity>
      {/* Add Comment Modal */}
      <CommentModal isVisible={showModal} toggleVisible={setShowModal} id={id} />
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
