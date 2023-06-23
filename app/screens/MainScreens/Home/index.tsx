import React from "react";
import { ScrollView } from "react-native";
import Screen from "../../../components/Shared/Screen";
import Header from "../../../components/Home/Header";
import Stories from "../../../components/Home/Stories";
import Post from "../../../components/Home/Post";
import { IPost } from "../../../types";
import data from '../../../data/data.json';
export default function Home() {
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false} >
        <Header />
        <Stories />
        {data.posts.map((postItem, _) => (
          <Post
            key={postItem.userRef}
            postData={postItem as unknown as IPost}
          />
        ))}
      </ScrollView>
    </Screen>
  );
}

