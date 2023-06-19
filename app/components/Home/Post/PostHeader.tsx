import { TouchableOpacity, View, StyleSheet,Image, Text } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
type props ={
  username: string;
  photoUrl: string;
}
export default function PostHeader({
    username,
    photoUrl,
  }: props) {
    return (
      <View style={PostHeaderStyles.container}>
        <View>
          <Image
            source={{ uri: `${photoUrl}` }}
            style={PostHeaderStyles.profileImg}
          />
          <Text style={PostHeaderStyles.profileUsername}>{username}</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
    );
  }
  const PostHeaderStyles = StyleSheet.create({
    container: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 20,
    },
    profileImg: {
      height: 40,
      width: 40,
      borderRadius: 20,
      resizeMode: "contain",
      marginRight: 15,
    },
    profileUsername: {
      fontWeight: "600",
      fontSize: 14,
      color: "white",
    },
  });