import {
  StyleSheet,
  Text,
  View,
  Image,
  SectionList,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import { IUser } from "../../../types";
import Screen from "../../../components/Shared/Screen";
import { typographyStyles } from "../../../constants";
import { SettingsList, UserProfile } from "../../../components/Settings";

export default function Settings() {
  const user: IUser = {
    username: "nathan_somto",
    email: "nathanSomto@gmail.com",
    photoUrl:
      "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png",
  };
  return (
    <Screen>
      <UserProfile {...user} />
      {/*
        First three options
        Leave a star https://github.com/Nathan-Somto/Instagram-rn-clone
        Drop an Issue https://github.com/Nathan-Somto/Instagram-rn-clone/issues
        Check Source Code https://github.com/Nathan-Somto/Instagram-rn-clone
     */}
      {/*
        Last Option
        Log out 
      */}
      <SettingsList />
    </Screen>
  );
}

const styles = StyleSheet.create({});
