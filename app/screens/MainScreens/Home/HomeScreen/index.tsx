import {
  StyleSheet,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Stories from "../../../../components/Home/Stories";
import Header from "../../../../components/Home/Header";



export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header/>
        <Stories/>
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
