import {
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Modal,
  TextInput,
  Image,
} from "react-native";
import { useState } from "react";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { comments } from "../../../types";
import { theme, typographyStyles } from "../../../constants";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import CommentModal from "../../Shared/CommentModal";
import { RootStackParamList } from "../../../screens";
type props = {
  comments: comments[];
  likes: number;
  caption: string;
  username: string;
  userRef: string;
};
type captionProps = {
  children: React.ReactNode;
};
function Caption({ children }: captionProps) {
  const [showMore, setShowMore] = useState(false);
  return (
    <View style={CaptionStyles.captionContainer}>
      <Text
        style={[CaptionStyles.caption]}
        numberOfLines={showMore ? undefined : 1}
      >
        {children}
        {!showMore ? "..." : ""}
      </Text>
      {!showMore && (
        <TouchableOpacity
          onPress={() => setShowMore((prevState) => !prevState)}
        >
          <Text style={[CaptionStyles.moreBtn, typographyStyles.bold]}>
            more
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const CaptionStyles = StyleSheet.create({
  captionContainer: {
    flexDirection: "row",
    flex: 0.9,
  },
  caption: {
    color: "#fff",
    fontWeight: "300",
    fontSize: 16,
    marginRight: 1,
    fontFamily: "Os_Condensed-regular",
  },
  moreBtn: {
    fontSize: 16,
    color: "#fff",
  },
});

export default function PostFooter({
  comments,
  likes,
  caption,
  username,
  userRef,
}: props) {
  const navigation = useNavigation<NavigationProp<RootStackParamList, "Main">>();
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  return (
    <View>
      <View style={postFooterStyles.iconsContainer}>
        <View style={postFooterStyles.iconsContainerLeft}>
          <TouchableOpacity onPress={() => setLiked((prevState) => !prevState)}>
            {!liked ? (
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
          {(liked ? likes + 1 : likes).toLocaleString("en")}
        </Text>
        <Text style={[postFooterStyles.likesText, typographyStyles.bold]}>
          like{likes > 1 ? "s" : ""}
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
          onPress={() => navigation.navigate("Comments", { userRef })}
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
              uri: "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png",
            }}
          />
        </View>
        <Text
          style={[postFooterStyles.addCommentInput, typographyStyles.bold]}
        > Add Comment...</Text>
      </TouchableOpacity>
      {/* Add Comment Modal */}
      <CommentModal isVisible={showModal} toggleVisible={setShowModal} />
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
    alignSelf:'center'
  },
});
