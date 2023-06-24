import {
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { theme, typographyStyles } from "../../../constants";
import React, { ReactNode } from "react";
type props = Omit<TouchableOpacityProps, "style"> & {
  children: ReactNode;
  btnStyle?: btnStyleProp<ViewStyle>;
  bgColor?: string;
};
type btnStyleProp<T extends ViewStyle> = {
  [index in keyof T]: T[index];
};
export default function Button({
  children,
  bgColor = "",
  btnStyle,
  ...otherProps
}: props) {
  bgColor = bgColor ? bgColor : theme.colors.primaryBlue;
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: bgColor }, btnStyle]}
      activeOpacity={0.5}
      {...otherProps}
    >
      <Text style={[styles.buttonText, typographyStyles.md]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    height: 45,
    width: 300,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "600",
    color: "white",
    fontSize: 16,
  },
});
