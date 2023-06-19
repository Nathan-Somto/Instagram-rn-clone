import { StyleSheet, View,TouchableOpacity } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import React from 'react'
type props ={
    onPress:()=>void
}
export default function NewPostButton({onPress}:props) {
  return (
  <TouchableOpacity onPress={onPress} activeOpacity={0.5}>  
 <View style={styles.container}>
     <MaterialCommunityIcons name="plus-box" size={30} color="white" />
 </View>
 </TouchableOpacity>
 )
}
 
const styles = StyleSheet.create({
    container:{
    width:60,
    height:60,
    alignItems:"center",
    justifyContent:"center",
    borderStyle:"solid"
}})