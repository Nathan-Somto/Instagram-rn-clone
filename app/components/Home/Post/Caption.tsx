import { useState } from "react";
import { View ,Text,TouchableOpacity,StyleSheet} from "react-native";
import { typographyStyles } from "../../../constants";

type captionProps = {
    children: React.ReactNode;
  };
 export default function Caption({ children }: captionProps) {
    const [showMore, setShowMore] = useState(false);
    return (
      <View style={CaptionStyles.captionContainer}>
        <Text
          style={[CaptionStyles.caption]}
          numberOfLines={showMore ? undefined : 1}
        >
          {children}
          {!showMore ? "..." : ""}
        </Text>
        {!showMore && (
          <TouchableOpacity
            onPress={() => setShowMore((prevState) => !prevState)}
          >
            <Text style={[CaptionStyles.moreBtn, typographyStyles.bold]}>
              more
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
  const CaptionStyles = StyleSheet.create({
    captionContainer: {
      flexDirection: "row",
      flex: 0.9,
    },
    caption: {
      color: "#fff",
      fontWeight: "300",
      fontSize: 16,
      marginRight: 1,
      fontFamily: "Os_Condensed-regular",
    },
    moreBtn: {
      fontSize: 16,
      color: "#fff",
    },
  });