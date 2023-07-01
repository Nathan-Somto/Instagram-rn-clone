import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity} from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../../../components/Shared/Screen";
import CommentModal from "../../../components/Shared/AddCommentModal";
import { StackScreenProps } from "@react-navigation/stack";
import { IPost,IComments} from "../../../types";
import { typographyStyles } from "../../../constants";
import { RootStackParamList } from "../..";
import { Timestamp, collection, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import Loader from "../../../components/Shared/Loader";
import { formatTimestamp } from "../../../utils";
import {Entypo,Feather} from "@expo/vector-icons"
import AddCommentBox from "../../../components/Shared/AddCommentBox";
type commentBoxProps = {
  url: string;
  username: string;
  comment: string;
  timestamp : string;
};
function CommentBox({ url, username, comment, timestamp }: commentBoxProps) {
  return (
    <View style={CommentBoxStyles.container}>
      <Image style={CommentBoxStyles.image} source={{ uri: url.length ? url :"https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png" }} />
      <View>
        <Text style={[CommentBoxStyles.username, typographyStyles.md]}>
          {username}
          {"  "} <Text style={CommentBoxStyles.createdAt}>{formatTimestamp(timestamp)}</Text>
        </Text>
        <Text style={[CommentBoxStyles.comment, typographyStyles.md]}>
          {comment}
        </Text>
      </View>
    </View>
  );
}
const CommentBoxStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 25,
  },
  image: {
    height: 30,
    width: 30,
    overflow: "hidden",
    borderRadius: 15,
    marginRight: 10,
    marginTop: 5,
  },
  username: {
    fontSize: 14,
    marginBottom: 4,
    color: "#fff",
  },
  createdAt: {
    color: "#555",
  },
  comment: {
    fontSize: 16,
    color: "#fff",
    paddingRight: 50,
  },
});
export default function Comments({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, "Comments">) {
 /** @todo format timestamp */
  const { id } = route.params;
  const [loading, setLoading] = useState<boolean>(false);
  const [commentList, setCommentList] = useState<IComments[]>([]);
  const [caption, setCaption] = useState({
    caption: "",
    photoUrl: "",
    username: "",
    timestamp:""
  });
  const fetchPostData = async () => {
    setLoading(true);
    try {
      const postSnapshot = await getDoc(doc(db, 'posts', id));
      if (postSnapshot.exists()) {
        let {
          caption,
          user: { photoUrl, username },
          timestamp
        } = postSnapshot.data() as IPost;
        photoUrl =
          photoUrl.length === 0
            ? "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png"
            : photoUrl;
        setCaption({
          caption,
          photoUrl,
          username,
          timestamp: timestamp as string
        });
        
      }
    } catch (error) {
      // Handle error
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    const unSubscribe = onSnapshot(
     query( collection(db,'posts',id,'comments') ,orderBy('timestamp','desc')),(snapshot)=>{
      const firebaseComments: IComments[] = [];
      snapshot.docs.forEach((doc) => {
        firebaseComments.push({
          ...(doc.data() as unknown as IComments),
        });
      });
          setCommentList(firebaseComments);

        } 
        
        )
        return unSubscribe;
      },[db,id]);
 
    useEffect(()=>{
      fetchPostData();
    },[])
  return (
    <>
      {loading && <Loader />}
      <Screen>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={{zIndex:50000}} onPress={()=>{ navigation.goBack();  }}>
            <Entypo name="chevron-left" color="#fff" size={20}/>
          </TouchableOpacity>
          <View>
            <Text style={[typographyStyles.bold,styles.headerTitle]}>
              Comments
            </Text>
          </View>
          <TouchableOpacity>
          <Feather name="info" color={'#fff'} size={20}/>
          </TouchableOpacity>
        </View>
        <View style={styles.captionContainer}>
          <CommentBox
            url={caption.photoUrl}
            username={caption.username}
            comment={caption.caption}
            timestamp={caption.timestamp}
          />
        </View>
        {commentList.length !== 0 ? (
          <FlatList
            data={commentList}
            showsVerticalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => (
              <CommentBox
                url={item.user.photoUrl}
                username={item.user.username}
                comment={item.comment}
                timestamp={item.timestamp as string}
              />
            )}
          />
        ) : (
          <View style={styles.noCommentContainer}>
            <Text
              style={[{ color: "#fff", fontSize: 17 }, typographyStyles.bold]}
            >
              No Comments
            </Text>
          </View>
        )}
        <AddCommentBox id={id} />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer:{
    flexDirection:"row",
    paddingHorizontal:10,
    paddingVertical:8,
    justifyContent:"space-between",
    alignItems:"center",
    borderBottomWidth: 1,
    borderBottomColor: "#555",
    position:"relative",
    zIndex:200
  },
  headerTitleContainer:{

  },
  headerTitle:{
    color:"#fff",
    fontWeight:"600",
    fontSize:17
  },
  captionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#555",
  },
  noCommentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
