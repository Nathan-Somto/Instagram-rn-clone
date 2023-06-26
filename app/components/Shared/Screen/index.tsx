import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../../../constants'
import { StatusBar } from 'expo-status-bar'
type props ={
    children:React.ReactNode
}
export default function Screen({children}:props) {
  return (
 <SafeAreaView style={styles.container}>
    <StatusBar style='auto'/>
      {children}
 </SafeAreaView>
 )
}
 
const styles = StyleSheet.create({
    container:{
    backgroundColor:theme.colors.primaryBlack,
    flex:1,
    position:"relative"
}})