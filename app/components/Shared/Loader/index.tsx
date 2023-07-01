import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Loader() {
  return (
    <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color="#fff" />
  </View>
  )
}

const styles = StyleSheet.create({
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#000",
        zIndex:5000
      },
})