import { View, Image, StyleSheet } from "react-native";

export default function Picture() {
  return (
    <View style={styles.pictureContainer}>
      <Image
        source={{ uri: "https://picsum.photos/300" }}
        style={styles.picture}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  pictureContainer: {
    width: "33%",
    padding: 1.5,
    marginHorizontal: 2,
  },
  picture: {
    height: 200,
    width: 200,
  },
});
