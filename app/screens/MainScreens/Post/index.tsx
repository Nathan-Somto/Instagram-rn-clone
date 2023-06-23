import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../../components/Shared/Screen";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { theme, typographyStyles } from "../../../constants";
function Options({ option }: { option: string }) {
  return (
    <TouchableOpacity style={styles.optionsContainer}>
      <Text style={[{ color: "white", fontSize: 18 }, typographyStyles.md]}>
        {option}
      </Text>
      <MaterialIcons name="keyboard-arrow-right" size={20} color="white" />
    </TouchableOpacity>
  );
}
export default function Post() {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");
  const OptionData = [
    "Tag people",
    "Add reminder",
    "Add location",
    "Add music",
    "Advanced Settings",
  ];
  async function requestPermission() {
    const cameraRequest = await ImagePicker.requestCameraPermissionsAsync();
    const libraryRequest =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (
      cameraRequest.status !== "granted" ||
      libraryRequest.status !== "granted"
    ) {
      Alert.alert(
        "Requires Permission",
        "For you to be able to post amazing photos about your life we need camera and photo library permissions"
      );
    }
  }
  // pick an image from the phone library.
  async function pickImageFromLibrary() {
    const result = await ImagePicker.launchImageLibraryAsync({
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (result.assets && result.assets.length) {
      setImage(result.assets[0].uri);
    }
  }
  // take photo from camera
  async function takePhoto() {
    const result = await ImagePicker.launchCameraAsync({
      aspect: [4, 3],
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (result.assets && result.assets.length) {
      setImage(result.assets[0].uri);
    }
  }
  //  get user permission on first mount
  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text
            style={[{ color: "white", fontSize: 18 }, typographyStyles.bold]}
          >
            New Post
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={pickImageFromLibrary}>
            <Feather name="image" size={24} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn} onPress={takePhoto}>
            <MaterialCommunityIcons name="camera" size={24} color={"white"} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.newPost}>
        <View style={styles.imageSelect}>
          <Image
            style={{ resizeMode: "cover", borderRadius: 10 }}
            source={{
              uri: `${
                image
                  ? image
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"
              }`,
              height: 80,
              width: 80,
            }}
          />
        </View>
        <View style={styles.captionBox}>
          <TextInput
            multiline
            placeholder="write a caption..."
            placeholderTextColor={"#bbb"}
            maxLength={255}
            value={caption}
            onChangeText={setCaption}
            style={{ color: "#bbb", height: 80 }}
          />
        </View>
      </View>
      <FlatList
        data={OptionData}
        renderItem={({ item }) => <Options option={item} />}
        keyExtractor={(_, index) => index.toString()}
      />
      <TouchableOpacity style={styles.shareBtnContainer}>
        <Text style={[styles.shareBtn, typographyStyles.bold]}>Share</Text>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    flexDirection: "row",
    alignItems:"center",
    paddingHorizontal: 15,
    height:50,
  },
  newPost: {
    flexDirection: "row",
    height: 100,
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: "#333",
  },
  captionBox: {
    flex: 1,
    marginLeft: 15,
    justifyContent:"center",
  },
  shareBtn: {
    color: theme.colors.primaryBlue,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  imageSelect: {
    alignItems: "center",
    alignSelf:"center"
  },
  btnContainer: {
    flexDirection: "row",
    flex:1,
    justifyContent: "flex-end",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    paddingVertical: 15,
  },
  shareBtnContainer: {
    flexDirection:"row",
    justifyContent:"flex-end",
    paddingVertical:20,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },
  btn: {
    alignItems: "center",
    marginRight: 10,
  },
});
