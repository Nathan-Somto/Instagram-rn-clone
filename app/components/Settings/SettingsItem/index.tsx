import {
  Linking,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { data, itemType } from "../types/settings";
import {
  MaterialCommunityIcons,
  Feather,
  Octicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { typographyStyles } from "../../../constants";
import { signOut } from "firebase/auth";
import { auth } from "../../../lib/firebase";
import useAuth, { authValue } from "../../../hooks/useAuth";

type props = data & {
  isLastItem: boolean;
  isFirstItem: boolean;
};
export default function SettingsItem({
  item,
  icon,
  color,
  isFirstItem,
  isLastItem,
}: props) {
  const { dispatch } = useAuth() as authValue;
  async function pressHandler(item: itemType) {
    const baseUrl = "https://github.com/Nathan-Somto/Instagram-rn-clone";
    switch (item) {
      case "Leave a Star":
        await Linking.openURL(baseUrl);
        break;
      case "Open an Issue":
        await Linking.openURL(baseUrl + "/issues");
        break;
      case "Check the Source Code":
        await Linking.openURL(baseUrl);
        break;
      case "Logout":
        await signOut(auth);
        dispatch({ type: "Logout", payload: null });
        break;
      default:
        break;
    }
  }
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isFirstItem && { borderTopLeftRadius: 8, borderTopRightRadius: 8 },
        isLastItem && {
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          marginBottom: 50,
        },
      ]}
      onPress={() => pressHandler(item)}
    >
      <View style={styles.leftContainer}>
        <View
          style={[styles.iconWrapper, { backgroundColor: color } as ViewStyle]}
        >
          {item === "Check the Source Code" || item === "Leave a Star" ? (
            //@ts-ignore
            <Feather name={icon} size={18} color={"white"} />
          ) : item === "Open an Issue" ? (
            //@ts-ignore
            <Octicons name={icon} size={18} color={"white"} />
          ) : (
            //@ts-ignore
            <MaterialCommunityIcons name={icon} size={18} color={"white"} />
          )}
        </View>
        <Text style={[{ color: "white", fontSize: 16 }, typographyStyles.md]}>
          {item}
        </Text>
      </View>
      <MaterialIcons name="keyboard-arrow-right" size={18} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#121212",
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
