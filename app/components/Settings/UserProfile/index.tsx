import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { IUser } from "../../../types";
import { typographyStyles } from "../../../constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function UserProfile({ username, email, photoUrl }: IUser) {
  /**@todo allow for photoUrl upload */
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photoUrl }} style={styles.image} />
        <TouchableOpacity style={styles.camera}>
          <MaterialCommunityIcons name="camera" size={24} color={"white"} />
        </TouchableOpacity>
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            { color: "white", fontSize: 20, fontWeight: "600" },
            typographyStyles.md,
          ]}
        >
          {username}
        </Text>
        <Text style={[{ color: "#bbb" }, typographyStyles.md]}>{email}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: "#121212",
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 50,
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  imageContainer: {
    marginRight: 20,
    position: "relative",
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
  camera: {
    position: "absolute",
    bottom: -10,
    alignItems: "center",
    right: 0,
  },
  textContainer: {
    flex: 1,
    gap: 2,
  },
});
