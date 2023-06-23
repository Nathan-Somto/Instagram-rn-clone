import { StyleSheet, Text, TextInput, View, TouchableOpacity,Image, TouchableWithoutFeedback, Keyboard,FlatList } from "react-native";
import Screen from "../../../components/Shared/Screen";
import React from "react";
import { Feather } from "@expo/vector-icons";
function Picture(){
  return(
    <View style={{width:"33%",padding:2}}>
      <Image source={{uri:'https://picsum.photos/300'}} style={{height:200, width:200}}/>
    </View>
  )
}
export default function Search() {
  return (
    <Screen>
        <View style={styles.inputContainer}>
          <View style={styles.inputBox}>
            <TouchableOpacity>
              <Feather name="search" color={"#bbb"} size={16} />
            </TouchableOpacity>
            <TextInput
              placeholder="Search"
              autoCorrect
              placeholderTextColor={"#bbb"}
              style={styles.input}
            />
          </View>
        </View>
        <FlatList
          data={new Array(18).fill('')}
          renderItem={()=> <Picture/>}
          keyExtractor={(_,index)=>index.toString()}
          numColumns={3}
          contentContainerStyle={styles.imageContainer}
        />
      </Screen>
  );
}


const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    height:50,
    marginTop:15,
  },
  inputBox: {
    width:'90%',
    backgroundColor: "#222",
    padding: 12,
    borderRadius: 6,
    flexDirection:"row"
  },
  input:{
    paddingHorizontal:10,
    color:"#bbb"
  },
  imageContainer:{
   paddingHorizontal:8,
  }
});
