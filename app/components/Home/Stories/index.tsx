import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Story from './Story'
import data from '../../../data/data.json'
type props ={}
export default function Stories({}:props) {
  return (
    <View style={styles.container}>
    <FlatList
      horizontal
      data={data.stories}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => <Story {...item} />}
    />
  </View>
 )
}
 
const styles = StyleSheet.create({
    container:{
    marginTop: 0, 
    paddingHorizontal: 10,
    marginBottom:2
}
})