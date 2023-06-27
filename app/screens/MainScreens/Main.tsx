import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import Home from "./Home";
import Reels from "./Reels";
import Settings from "./Settings";
import Search from "./Search";
import Post from "./Post";
import { RootStackParamList } from "..";
import { StackScreenProps } from "@react-navigation/stack";

  export type MainTabsParamList = {
  Home:undefined;
  Post: undefined;
  Search:undefined;
  Reels:undefined;
  Settings:undefined;
};

export default function Main(props:StackScreenProps<RootStackParamList,"Main">) {
  const Tabs = createBottomTabNavigator<MainTabsParamList>();
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",
        tabBarStyle:{
          backgroundColor:"black"
        },
        tabBarShowLabel:false
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ size, color,focused }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="Post"
        component={Post}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons color={color} size={size} name="plus-box" />
          )
        }}
      />
      <Tabs.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons color={color} size={size} name="movie" />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ size, color }) => (
            <Feather name="settings" color={color} size={size} />
          ),
        }}
        component={Settings}
      />
    </Tabs.Navigator>
  );
}

const styles = StyleSheet.create({});
