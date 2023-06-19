import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { useState } from "react";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import { comments } from "../../../types";
type props = {
  comments: comments[];
  likes: number;
  caption: string;
};
export default function PostFooter({ comments, likes, caption }: props) {
  const [liked, setLiked] = useState(false);
  return (
    <View>
      <View style={postFooterStyles.iconsContainer}>
        <View style={postFooterStyles.iconsContainerLeft}>
          <TouchableOpacity onPress={() => setLiked((prevState) => !prevState)}>
            {!liked ? (
              <Entypo name="heart-outlined" size={25} color="white" />
            ) : (
              <Entypo name="heart" size={25} color="pink" />
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
      <View>
        <Text>{liked ? likes + 1 : likes}</Text>
      </View>
      {/* Comment Link */}
      {comments.length !== 0 && (
        <Text>
          View {comments.length > 1 ? "all" : ""} {comments.length} comment
          {comments.length > 1 ? "" : "s"}
        </Text>
      )}
      {/* Add Comment button */}
      {/* Add Comment Modal */}
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
    justifyContent: "space-evenly",
    alignItems: "center",
    flex: 0.35,
  },
});
