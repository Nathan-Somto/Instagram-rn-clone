import { StyleSheet, Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import {Entypo, Feather} from '@expo/vector-icons';
type props ={}
export default function Header({}:props) {
  return (
    <View style={styles.headerContainer}>
    <Image
      source={require("../../../../assets/insta-logo.png")}
      style={styles.image}
    />
    <View style={styles.headerRight}>
      <TouchableOpacity>
        <Entypo name="heart-outlined" color="white" size={24} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.message}>
        <Feather name="message-circle" color="white" size={24} />
        <View style={styles.messageText}>
          <Text style={{ color: "white", textAlign: "center" }}>5</Text>
        </View>
      </TouchableOpacity>
    </View>
    </View>
 
 )
}
 
const styles = StyleSheet.create({

    image: {
        width: 150,
        height: 100,
        resizeMode: "contain",
      },
      headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 0,
        height: 80,
      },
      headerRight: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      message: {
        position: "relative",
        marginLeft: 15,
      },
      messageText: {
        position: "absolute",
        right: -10,
        top: -8,
        backgroundColor: "#eb4d6d",
        padding: 3,
        borderRadius: 10,
        height: 20,
        width: 20,
      },
})