import { Text, type TextProps, StyleSheet } from "react-native";

import Fonts from "../theme/fonts/index";

export type CustomTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "semibold";
};

export function CustomText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: CustomTextProps) {


  return (
    <Text
      style={[

        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "semibold" ? styles.semiBold : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 14,
    lineHeight: 24,
    fontFamily: Fonts.PoppinsRegular,
  },
  semiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: Fonts.PoppinsSemiBold,
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.PoppinsMedium,
    lineHeight: 32,
  },
});
