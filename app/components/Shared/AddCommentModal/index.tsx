import { Dispatch, SetStateAction, useState } from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AddCommentBox from "../AddCommentBox";

type props = {
  isVisible: boolean;
  toggleVisible: Dispatch<SetStateAction<boolean>>;
  id:string;
};
export default function AddCommentModal({ isVisible, toggleVisible,id }: props) {
 
  return (
      <Modal visible={isVisible} animationType="slide" transparent={true}> 
      <TouchableWithoutFeedback  onPress={()=> toggleVisible(false)}>
        <View style={{flex:1,}}></View>
      </TouchableWithoutFeedback>
       <AddCommentBox id={id}/>
    </Modal>
  );
}
