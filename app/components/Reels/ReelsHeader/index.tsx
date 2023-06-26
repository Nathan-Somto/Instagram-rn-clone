import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { typographyStyles } from "../../../constants";

export default function ReelsHeader() {
  return (
    <View style={styles.container}>
      <Text
        style={[
          { color: "#fff", fontSize: 22, fontWeight: "bold" },
          typographyStyles.bold,
        ]}
      >
        Reels
      </Text>
      <TouchableOpacity>
        <MaterialCommunityIcons name={"camera"} color={"#fff"} size={24} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    paddingHorizontal: 20,
    top: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    zIndex:5
  },
});
