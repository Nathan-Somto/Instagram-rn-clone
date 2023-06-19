import React from "react";
import { TouchableOpacity, View, Text,Image, StyleSheet } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';
type props ={
  image: string;
  name: string;
  id: string;
}
export default function Story({
    image,
    name,
    id,
  }: props) {
    return (
      <View style={storyStyles.container}>
        <View
          style={[
            storyStyles.imageContainer,
            { borderColor: `${id === "-1" ? "#f54266" : "transparent"}` },
          ]}
        >
          <Image source={{ uri: `${image}` }} style={storyStyles.image} />
          {id === `-1` && (
            <TouchableOpacity style={storyStyles.plusIcon}>
              <MaterialCommunityIcons name="plus" size={16} />
            </TouchableOpacity>
          )}
        </View>
        <Text numberOfLines={1} style={storyStyles.text}>
          {name}
        </Text>
      </View>
    );
  }
  const storyStyles = StyleSheet.create({
    container: {
      marginHorizontal: 10,
      marginVertical: 0,
    },
    imageContainer: {
      height: 70,
      width: 70,
      padding: 2,
      backgroundColor: "black",
      marginBottom: 10,
      borderRadius: 35,
      overflow: "hidden",
      borderWidth: 1,
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    image: {
      height: 60,
      width: 60,
      borderRadius: 30,
      resizeMode: "contain",
    },
    text: {
      fontSize: 10,
      fontWeight: "500",
      color: "#ccc",
      textAlign: "center",
    },
    plusIcon: {
      position: "absolute",
      bottom: -8,
      backgroundColor: "#3797EF",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      height: 20,
      width: 20,
    },
  });