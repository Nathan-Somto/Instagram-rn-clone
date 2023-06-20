import {
  StyleSheet,
} from "react-native";
import React from "react";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Stories from "../../../../components/Home/Stories";
import Header from "../../../../components/Home/Header";
import Post from "../../../../components/Home/Post";
import data from  '../../../../data/data.json'
import { IPost } from "../../../../types";


export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header/>
        <Stories/>
        <FlatList
          data={data.posts}
          keyExtractor={(item)=> item.userRef}
          renderItem={({item})=> <Post postData={item as unknown as IPost}/>}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
  },
});
