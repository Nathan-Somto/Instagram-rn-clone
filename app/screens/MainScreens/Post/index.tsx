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
import { db, storage } from "../../../lib/firebase";
import { getDownloadURL, ref, uploadBytes, uploadString,uploadBytesResumable } from "firebase/storage";
import { IPost } from "../../../types";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import useAuth, { authValue } from "../../../hooks/useAuth";
import { MainTabsParamList } from "../Main";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Loader from "../../../components/Shared/Loader";
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
export default function Post({
  navigation,
}: BottomTabScreenProps<MainTabsParamList, "Post">) {
  const { user } = useAuth() as authValue;
  const [loading, setLoading] = useState(false);
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
  async function uploadImageAsync(userRef:string){
    const Blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });
    const storageRef = ref(
      storage,
      `images/${userRef}/${new Date().getTime()}`
    );
    const uploadResult = await uploadBytes(storageRef, Blob as unknown as Blob);
    //@ts-ignore
    Blob.close();
    return await getDownloadURL(uploadResult.ref);
  }
  async function sharePost() {
    setLoading(true);
    try {
      if (!image.length) {
        throw new Error("post must have an image");
      }
      if (!caption.length) {
        throw new Error("post must have a caption");
      }
      // upload image to firebase storage.
      // get image url.
      // add users posts then go to the home screen.
      if (user) {
        const {
          photoURL: photoUrl,
          displayName: username,
          uid: userRef,
        } = user;
        const downloadUrl = await  uploadImageAsync(userRef);
        const postData: Omit<IPost, "id"> = {
          caption,
          images: [downloadUrl],
          likes: [],
          user: {
            photoUrl: photoUrl ?? '',
            username: username ?? '',
          },
          userRef: user.uid,
          timestamp: serverTimestamp(),
        };
        const docsRef = collection(db, "posts");
        await addDoc(docsRef, postData);
        navigation.navigate("Home");
      }
    } catch (err) {
      let message = "failed to create post.";
      if (err instanceof Error) {
        message = err.message;
        Alert.alert("Post upload failed", message);
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {loading && <Loader />}
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
        <TouchableOpacity style={styles.shareBtnContainer} onPress={sharePost}>
          <Text style={[styles.shareBtn, typographyStyles.bold]}>Share</Text>
        </TouchableOpacity>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    height: 50,
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
    justifyContent: "center",
  },
  shareBtn: {
    color: theme.colors.primaryBlue,
    fontWeight: "600",
    fontSize: 20,
    textAlign: "center",
  },
  imageSelect: {
    alignItems: "center",
    alignSelf: "center",
  },
  btnContainer: {
    flexDirection: "row",
    flex: 1,
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
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "flex-start",
  },
  btn: {
    alignItems: "center",
    marginRight: 10,
  },
});
