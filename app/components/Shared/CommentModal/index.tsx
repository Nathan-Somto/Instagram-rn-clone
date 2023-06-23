import { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform
} from "react-native";
import { theme } from "../../../constants";
type props = {
  isVisible: boolean;
  toggleVisible?: Dispatch<SetStateAction<boolean>>;
};
export default function CommentModal({ isVisible, toggleVisible }: props) {
  const [comment, setComment] = useState("");
  const emojis = ["🔥","😀", "😊", "👍", "❤️", "😂", "🙌", "😎"];
  function handlePost() {
    console.log("clicked");
  }
  return (
      <Modal visible={isVisible} animationType="slide" transparent={true}>
       {toggleVisible&&
       ( 
      <TouchableWithoutFeedback  onPress={()=> toggleVisible(false)}>
        <View style={{flex:1,}}></View>
      </TouchableWithoutFeedback>
       )}
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={CommentModalStyles.modalContent} >
       <View >
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={CommentModalStyles.emojiView}>
          {emojis.map((emoji, index) => (
            <TouchableOpacity
              style={CommentModalStyles.emojiContainer}
              key={index}
              onPress={() => setComment((prevState) => prevState + emoji)}
            >
              <Text style={CommentModalStyles.emoji}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={CommentModalStyles.bottomContainer}>
        <View style={CommentModalStyles.userImage}>
          <Image
            style={{ height: 50, width: 50 }}
            source={{
              uri: "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png",
            }}
          />
        </View>
          <View style={CommentModalStyles.commentBox}>
            <TextInput
              placeholder="Add a Comment..."
              placeholderTextColor={"#555"}
              value={comment}
              onChangeText={setComment}
              autoCorrect
              keyboardType="default"
              style={{flex:0.8,color:"white"}}
            />
            <TouchableOpacity onPress={handlePost}>
              <Text style={CommentModalStyles.postBtn}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
       </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
const CommentModalStyles = StyleSheet.create({
  modalContent: {
    bottom: 0,
    position: "absolute",
    borderTopColor: "#555",
    borderTopWidth: 1,
    paddingHorizontal: 5,
    width:"100%",
    backgroundColor:"#000",
    zIndex:5
  },
  emojiView:{
    flex:1,
    justifyContent:"space-evenly",
    alignItems:"flex-start"
  },
  emojiContainer: {
    paddingBottom: 20,
    paddingTop:10
  },
  emoji: {
    fontSize: 30,
  },
  bottomContainer:{
    flexDirection: "row",
    justifyContent:"center",
    alignItems:"flex-start",
    paddingBottom:'5%'
  },
  commentBox: {
    borderColor: "#555",
    borderWidth:1,
    flex:0.9,
    borderRadius: 30,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
  },
  postBtn: {
    color: theme.colors.secondaryBlue,
    textDecorationLine: "underline",
    textDecorationColor: theme.colors.secondaryBlue,
  },
  userImage: {
    marginRight: 20,
    height: 50,
    width: 50,
    overflow: "hidden",
    borderRadius: 30,
    alignItems:"center",
  },
});
