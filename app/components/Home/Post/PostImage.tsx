import {
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { useRef, useState } from "react";
import { getDeviceWidth } from "../../../utils";

const ITEM_WIDTH = getDeviceWidth();
export default function PostImages({ images }: { images: string[] }) {
  const [currImage, setCurrImage] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    // how far the item is from the x origin.
    const contentX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentX / ITEM_WIDTH);
    setCurrImage(index);
  }

  return (
    <View style={postImageStyles.container}>
      <View style={postImageStyles.slidesText}>
        <Text style={{ color: "white" }}>
          {currImage + 1} / {images.length}
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={images}
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
        horizontal
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image style={postImageStyles.image} source={{ uri: item }} />
        )}
        showsHorizontalScrollIndicator={false}
      />
      <View style={postImageStyles.paginateContainer}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              postImageStyles.paginateButton,
              {
                backgroundColor: `${currImage === index ? "#3797EF" : "#ccc"}`,
              },
            ]}
          ></TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const postImageStyles = StyleSheet.create({
  container: {
    position: "relative",
  },
  slidesText: {
    position: "absolute",
    top: 15,
    right: 10,
    height: 25,
    zIndex:2,
    width: 50,
    borderRadius: 10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: "#202020",
  },
  image: {
    height: 450,
    width: ITEM_WIDTH,
    resizeMode:'cover'
  },
  paginateContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: -30,
    width:"100%",
    justifyContent:'center'
  },
  paginateButton: {
    height: 7,
    width: 7,
    borderRadius: 5,
    marginHorizontal: 3,
  },
});
