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
import {
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { theme, typographyStyles } from "../../../constants";
type props = {
  comments: comments[];
  likes: number;
  caption: string;
  username: string;
};
type captionProps = {
  children: React.ReactNode;
};
function Caption({ children }: captionProps) {
  const [showMore, setShowMore] = useState(false);
  return (
    <View style={CaptionStyles.captionContainer}>
      <Text style={[CaptionStyles.caption,typographyStyles.bold]} numberOfLines={showMore ? undefined : 1}>
        {children}
        {!showMore ? "..." : ""}
      </Text>
      {!showMore && (
        <TouchableOpacity onPress={()=> setShowMore(prevState=>!prevState)}>
          <Text style={[CaptionStyles.moreBtn,typographyStyles.bold]}>more</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const CaptionStyles = StyleSheet.create({
  captionContainer:{
    flexDirection:'row',
    flex:0.9,
  },
  caption:{
    color:"#bbb",
    fontSize:17,
    marginRight:1
  },
  moreBtn:{
    fontSize:17,
    color:"#fff"
  }
})
function AddCommentModal({ isVisible }: { isVisible: boolean }) {
  const [comment, setComment] = useState("");
  const emojis = ["😀", "😊", "👍", "❤️", "😂", "🙌", "😎"];
  function handlePost() {
    console.log("clicked");
  }
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={addCommentModalStyles.modalContent}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity
              style={addCommentModalStyles.emojiContainer}
              key={index}
              onPress={() => setComment((prevState) => prevState + emoji)}
            >
              <Text style={addCommentModalStyles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View>
          <View style={addCommentModalStyles.commentBox}>
            <TextInput
              placeholder="Add a Comment"
              placeholderTextColor={"#ccc"}
              value={comment}
              onChangeText={setComment}
              autoCorrect
              keyboardType="default"
            />
            <TouchableOpacity onPress={handlePost}>
              <Text style={addCommentModalStyles.postBtn}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const addCommentModalStyles = StyleSheet.create({
  modalContent: {
    height: "30%",
    bottom: 0,
    position: "absolute",
    borderTopColor: "#ccc",
    borderTopWidth: 1,
    paddingHorizontal: 15,
  },
  emojiContainer: {
    marginHorizontal: 8,
    paddingTop: 3,
    paddingBottom: 6,
  },
  emoji: {
    fontSize: 14,
  },
  commentBox: {
    borderColor: "#ccc",
    width: "70%",
    borderRadius: 30,
    padding: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  postBtn: {
    color: theme.colors.primaryBlue,
    textDecorationLine: "underline",
    textDecorationColor: theme.colors.primaryBlue,
  },
});
export default function PostFooter({
  comments,
  likes,
  caption,
  username,
}: props) {
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  function removeModal() {
    if (showModal) {
      setShowModal(false);
    }
  }
  return (
    
      <View>
        <View style={postFooterStyles.iconsContainer}>
          <View style={postFooterStyles.iconsContainerLeft}>
            <TouchableOpacity
              onPress={() => setLiked((prevState) => !prevState)}
            >
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
        {/* Caption */}
        {/* Likes count */}
        <View style={postFooterStyles.likesContainer}>
          <Text style={[postFooterStyles.likesText,typographyStyles.bold]}>{(liked ? likes + 1 : likes).toLocaleString("en")}</Text>
          <Text style={[postFooterStyles.likesText,typographyStyles.bold]}>like{likes > 1 ? "s" : ""}</Text>
        </View>
        <View style={postFooterStyles.captionContainer}>
          <Text style={[postFooterStyles.username, typographyStyles.bold]}>{username}</Text>
          <Caption>{caption}</Caption>
        </View>
        {/* Comment Link */}
        {comments.length !== 0 && (
          <TouchableOpacity style={postFooterStyles.commentContainer}>
            <Text style={[postFooterStyles.comment,typographyStyles.bold]}>
              View {comments.length > 1 ? "all" : ""} {comments.length} comment
              {comments.length > 1 ? "s" : ""}
            </Text>
          </TouchableOpacity>
        )}
        {/* Add Comment button */}
          <TouchableOpacity onPress={() => setShowModal(true)} style={postFooterStyles.addCommentContainer}>
            <View style={postFooterStyles.userImage}>
              <Image
                style={{ height: 30, width: 30 }}
                source={{
                  uri: "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png",
                }}
              />
            </View>
              <TextInput style={postFooterStyles.addCommentInput} editable={false} placeholder="Add Comment" />
          </TouchableOpacity>
        {/* Add Comment Modal */}
        <AddCommentModal isVisible={showModal} />
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
  captionContainer:{
    flexDirection:'row',
    paddingHorizontal:10,
    flex:1,
    marginTop:5,
  },
  username:{
    color:"#fff",
    fontSize:17,
    marginRight:3
  },
  likesText:{
    color:"white",
    fontSize:16,
    marginRight:2
  },
  likesContainer:{
    flexDirection:'row',
    paddingLeft:10,
    marginTop:10,
   flex:1
  },
  commentContainer:{
    paddingLeft:10,
    marginTop:5,
  },
  comment:{
    color:"#bbb",
    fontSize:16,
    marginRight:1
  },
  addCommentContainer:{
    flexDirection:'row',
    marginTop:10,
    paddingHorizontal:10
  },
  userImage:{
    marginRight:10,
    height:30,
    width:30,
    overflow:'hidden',
    borderRadius:15
  },
  addCommentInput:{

  }
});
