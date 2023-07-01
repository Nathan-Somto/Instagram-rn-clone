import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Screen from "../../../components/Shared/Screen";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Picture from "../../../components/Search/Picture";

export default function Search() {
  return (
    <Screen>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TouchableOpacity style={styles.searchBtn}>
            <Feather name="search" color={"#bbb"} size={16} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            autoCorrect
            placeholderTextColor={"#bbb"}
            style={styles.input}
          />
        </View>
      </View>
      <FlatList
        data={new Array(18).fill("")}
        renderItem={() => <Picture />}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.imageContainer}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    marginVertical: 15,
  },
  inputBox: {
    width: "90%",
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 6,
    flexDirection: "row",
  },
  input: {
    paddingHorizontal: 10,
    color: "#bbb",
  },
  imageContainer: {
    paddingHorizontal: 8,
  },
  searchBtn:{
    alignSelf:"center"
  }
});
