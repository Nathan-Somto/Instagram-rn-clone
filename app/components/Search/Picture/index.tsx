import { View ,Image} from "react-native";

export default function Picture(){
    return(
      <View style={{width:"33%",padding:2}}>
        <Image source={{uri:'https://picsum.photos/300'}} style={{height:200, width:200}}/>
      </View>
    )
  }