import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, {
  Dispatch,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from "react";
import { IReels } from "../types/reels";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import ReelsBtns from "./ReelsBtns";
import { getDeviceHeight, getDeviceWidth } from "../../../utils";
import { Ionicons } from "@expo/vector-icons";
import { typographyStyles } from "../../../constants";
type props = IReels & {
  handleScroll: Dispatch<SetStateAction<number>>;
  currVideo: number;
};
const ITEM_HEIGHT = getDeviceHeight();
const ITEM_WIDTH = getDeviceWidth();
export default function ReelsCard({
  videoUrl,
  id,
  handleScroll,
  likes,
  shares,
  comments,
  thumbnailUrl,
  currVideo,
  author,
  title,
}: props) {
  // when the video has been scrolled  into set as current video.
  // if it is the current video load and play.
  // when the videos progress reaches 30s scroll to next video.
  // when the user taps the video with audio playing mute and show the mute button, do vice versa.
  const videoRef = useRef<Video | null>(null);
  const [mute, setMute] = useState<boolean>(false);
  const [showIcon, setShowIcon] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (currVideo == +id - 1) {
      playVideo();
    } else {
      pauseVideo();
    }
  }, [currVideo]);
  async function playVideo() {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.playAsync();
  }
  async function pauseVideo() {
    if (videoRef.current === null) {
      return;
    }
    videoRef.current.pauseAsync();
  }
  function handleMute() {
    if (videoRef.current === null) {
      return;
    }
    setShowIcon((prevState) => !prevState);
    videoRef.current.setIsMutedAsync(!mute);
    setMute((prevState) => !prevState);
    setTimeout(() => {
      setShowIcon((prevState) => !prevState);
    }, 1500);
  }
  let hasScrolled = false;
  function handlePlaybackStatus(playbackStatus: AVPlaybackStatus) {
    if (!playbackStatus.isLoaded || playbackStatus.isBuffering) {
      setLoading(true);
      return;
    } else {
      setLoading(false);
    }
    const currentPositionMillis = playbackStatus.positionMillis
    const shouldScroll = currentPositionMillis >= 30 * 1000 && !hasScrolled;
    if (shouldScroll) {
      handleScroll((prevState) => prevState + 1);
      hasScrolled=true;
    }
  }

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={handleMute}
    >
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) }
        <>
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: videoUrl,
            }}
            useNativeControls={false}
            resizeMode={ResizeMode.COVER}
            onPlaybackStatusUpdate={handlePlaybackStatus}
            shouldPlay
          />
          {/* Muted button appears here */}
          {showIcon && (
            <View style={styles.iconContainer} pointerEvents="none">
              <View style={styles.iconWrapper}>
                {mute ? (
                  <Ionicons name="volume-mute" size={25} color="white" />
                ) : (
                  <Ionicons name="volume-high" size={25} color="white" />
                )}
              </View>
            </View>
          )}

          {/* Reels Info */}
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <View style={styles.userImage}>
                <Image
                  style={{ height: 30, width: 30 }}
                  source={{
                    uri: "https://w7.pngwing.com/pngs/256/355/png-transparent-computer-icons-female-jewelry-head-silhouette-avatar.png",
                  }}
                />
              </View>
              <Text style={[styles.author, typographyStyles.md]}>{author}</Text>
              <TouchableOpacity style={styles.followBtn}>
                <Text
                  style={[{ color: "#fff", fontSize: 14 }, typographyStyles.md]}
                >
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.info}>
              <Ionicons name="musical-notes" size={20} color="#fff" />
              <Text style={[styles.title, typographyStyles.md]}>{title}</Text>
            </View>
          </View>
          {/* Reels Button */}
          <ReelsBtns
            likes={likes}
            shares={shares}
            comments={comments}
            thumbnailUrl={thumbnailUrl}
          />
        </>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#000",
    position: "relative",
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  video: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  iconContainer: {
    position: "absolute",
    top:0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 35,
    backgroundColor: "rgba(0,0,0,0.25)",
    height:'100%',
    width:"100%"
  },
  iconWrapper: {
    backgroundColor: "#777",
    height: 50,
    width: 50,
    borderRadius: 25,
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  userImage: {
    height: 30,
    width: 30,
    overflow: "hidden",
    borderRadius: 15,
    alignItems: "center",
  },
  infoContainer: {
    position: "absolute",
    left: 10,
    paddingBottom: 5,
    bottom: 100,
    width: 250,
    gap: 9,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 17,
  },
  followBtn: {
    borderColor: "#eee",
    borderWidth: 0.8,
    alignItems: "center",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
    marginLeft: 5,
  },
  author: {
    color: "#fff",
    fontWeight: "400",
    fontSize: 16,
  },
});
