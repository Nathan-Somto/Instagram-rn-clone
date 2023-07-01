import { StyleSheet, Text, View, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import React, { useRef, useState,useEffect } from "react";
import { IReels } from "../types/reels";
import ReelsCard from "../ReelsCard";
import { getDeviceHeight } from "../../../utils";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
type props = {
  data: IReels[];
};
const ITEM_HEIGHT = getDeviceHeight();
export default function ReelsVideos({ data }: props) {
  const videosRef = useRef<FlatList<(typeof data)[0]>>(null);
  const [currentVideo, setCurrentVideo] = useState(0);
  

useEffect(() => {
  if (videosRef.current && currentVideo < data.length) {
    videosRef.current.scrollToIndex({
      index: currentVideo,
      animated: true,
    });
  }
}, [currentVideo]);
function handleScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    // how far the item is from the y origin.
    const contentY = e.nativeEvent.contentOffset.y;
    const index = Math.round(contentY / ITEM_HEIGHT);
   /*  setCurrentVideo(index); */
  }
 
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        ref={videosRef}
        onMomentumScrollEnd={handleScroll}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
         
            <ReelsCard
              {...item}
              handleScroll={setCurrentVideo}
              currVideo={currentVideo}
            />
        
        )}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        pagingEnabled
        decelerationRate={0.9}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
   
  }
});
