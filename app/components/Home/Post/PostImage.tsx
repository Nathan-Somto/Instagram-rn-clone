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
function getDeviceWidth() {
  return Dimensions.get("window").width;
}
export default function PostImages({ images }: { images: string[] }) {
  const [currImage, setCurrImage] = useState(0);
  const flatListRef = useRef<FlatList<string>>(null);
  function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    // how far the item is from the x origin.
    const contentX = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentX / getDeviceWidth());
    setCurrImage(index);
  }
  function handlePaginateButtonPress(index: number) {
    if (flatListRef.current === null) return;
    setCurrImage(index);
    flatListRef.current.scrollToIndex({ index, animated: true });
  }
  return (
    <View style={postImageStyles.container}>
      <View style={postImageStyles.slidesText}>
        <Text style={{ color: "white" }}>
          {currImage + 1}/{images.length}
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={images}
        pagingEnabled
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(_, index) => index.toString()}
        getItemLayout={(_, index) => ({
          length: getDeviceWidth(),
          offset: index * getDeviceWidth(),
          index,
        })}
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
            onPress={() => handlePaginateButtonPress(index)}
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
    top: 50,
    right: 50,
    height: 35,
    width: 50,
    borderRadius: 10,
    backgroundColor: "gray",
  },
  image: {
    height: 450,
    width: getDeviceWidth(),
  },
  paginateContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: -50,
  },
  paginateButton: {
    height: 10,
    width: 10,
    borderRadius: 5,
    matginHorizontal: 5,
  },
});
