import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import Screen from "../../../components/Shared/Screen";
import Header from "../../../components/Home/Header";
import Stories from "../../../components/Home/Stories";
import Post from "../../../components/Home/Post";
import { IPost } from "../../../types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../lib/firebase";
export default function Home() {
  const [Posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const docsRef = collection(db, "posts");
    const q = query(docsRef, orderBy("timestamp", "desc"));
    const firebasePosts: IPost[] = [];
   const unSub = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        firebasePosts.push({
          ...(doc.data() as unknown as IPost),
          id: doc.id,
        });
      });
      setPosts(firebasePosts);
    });
    return unSub
  }, []);
  return (
    <Screen>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <Stories />
        {Posts.map((postItem: IPost, _: number) => (
          <Post key={postItem.id} postData={postItem} />
        ))}
      </ScrollView>
    </Screen>
  );
}
