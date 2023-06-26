import { SectionList, StyleSheet, View } from "react-native";
import SettingsItem from "../SettingsItem";
import { data } from "../types/settings";
import React from "react";
const ItemSeparator: React.FC = () => <View style={styles.separator} />;
export default function SettingsList() {
  const listData: {
    data: data[];
  }[] = [
    {
      data: [
        { icon: "star", item: "Leave a Star", color: "gold" },
        { item: "Open an Issue", icon: "issue-opened", color: "green" },
        { item: "Check the Source Code", icon: "code", color: "black" },
      ],
    },
    { data: [{ item: "Logout", icon: "logout", color: "red" }] },
  ];
  return (
    <SectionList
      sections={listData}
      renderItem={({ item, index, section }) => (
        <SettingsItem
          {...item}
          isFirstItem={index === 0}
          isLastItem={index === section.data.length - 1}
        />
      )}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={(item) => item.icon}
      bounces
    />
  );
}
const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
  },
});
