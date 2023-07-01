import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainTabsParamList } from "../../../screens/MainScreens/Main";
export default function Header() {
  const navigation = useNavigation<NavigationProp<MainTabsParamList, "Home">>();
  const color = "white";
  const size = 24;
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../../../../assets/insta-logo.png")}
        style={styles.image}
      />
      <View style={styles.headerRight}>
        <TouchableOpacity onPress={() => navigation.navigate("Post")}>
          <MaterialCommunityIcons name="plus-box" color={color} size={size} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal:15}}>
          <Entypo name="heart-outlined" color={color} size={size} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.message}>
          <Feather name="message-circle" color={color} size={size} />
          <View style={styles.messageText}>
            <Text style={{ color: "white", textAlign: "center", fontSize:10 }}>5</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 0,
    height: 80,
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  message: {
    position: "relative",
  },
  messageText: {
    position: "absolute",
    right: -10,
    top: -8,
    backgroundColor: "#eb4d6d",
    padding: 1.5,
    borderRadius: 10,
    height: 20,
    width: 20,
    alignItems:"center",
    justifyContent:"center"
  },
});
