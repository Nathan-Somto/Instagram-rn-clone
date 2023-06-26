import {ViewStyle} from "react-native"
type itemType =
  | "Open an Issue"
  | "Leave a Star"
  | "Check the Source Code"
  | "Logout";
type iconType = "star" | "issue-opened" | "code" |"logout"
type data = {
  icon: iconType;
  item: itemType;
  color: string | ViewStyle ;
};

export {itemType,iconType,data};