import { TouchableOpacity, View, StyleSheet,Image, Text } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { typographyStyles } from "../../../constants";
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
        <View style={PostHeaderStyles.userContainer}>
          <Image
            source={{ uri: `${photoUrl}` }}
            style={PostHeaderStyles.profileImg}
          />
          <Text style={[PostHeaderStyles.profileUsername,typographyStyles.bold]}>{username}</Text>
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
      paddingHorizontal: 10,
      marginVertical:10,
    },
    userContainer:{
      flexDirection: "row",
      alignItems:'center',
    },
    profileImg: {
      height: 40,
      width: 40,
      borderRadius: 20,
      resizeMode: "contain",
      marginRight: 10,
    },
    profileUsername: {
      fontWeight: "600",
      fontSize: 15,
      color: "white",
    },
  });