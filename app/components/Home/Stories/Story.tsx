import React from "react";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
type props = {
  image: string;
  name: string;
  id: string;
};
export default function Story({ image, name, id }: props) {
  return (
    <View style={storyStyles.container}>
      <View
        style={[
          storyStyles.imageContainer,
          {
            borderColor: `${id !== "-1" ? "#f54266" : "transparent"}`,
            overflow: `${id === "-1" ? "visible" : "hidden"}`,
          },
        ]}
      >
        <Image source={{ uri: `${image}` }} style={storyStyles.image} />
        {id === `-1` && (
          <TouchableOpacity style={storyStyles.plusIcon}>
            <MaterialCommunityIcons name="plus" size={16} color={'white'} />
          </TouchableOpacity>
        )}
      </View>
      <Text numberOfLines={1} style={[storyStyles.text,{ color:`${id === "-1"?'white':"#ccc"}`}]}>
        {name}
      </Text>
    </View>
  );
}
const storyStyles = StyleSheet.create({
  container: {
    marginRight: 10,
    marginVertical: 0,
  },
  imageContainer: {
    height: 90,
    width: 90,
    padding: 2,
    backgroundColor: "black",
    marginBottom: 10,
    borderRadius: 45,
    overflow: "hidden",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 40,
    resizeMode: "contain",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
  },
  plusIcon: {
    position: "absolute",
    bottom: 0,
    right: 2,
    zIndex: 2,
    backgroundColor: "#3797EF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    height: 20,
    width: 20,
  },
});
