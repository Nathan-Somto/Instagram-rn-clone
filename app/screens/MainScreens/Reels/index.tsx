import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../../../components/Shared/Screen'
import data from '../../../data/data.json';
import {ReelsHeader,ReelsVideos} from '../../../components/Reels';
export default function Reels() {
  return (
   <Screen>
    {/* Reels Header */}
      <ReelsHeader/>
    {/* Reels Videos - Reels Card */}
      <ReelsVideos data={data.reels}/>
   </Screen>
  )
}

const styles = StyleSheet.create({})