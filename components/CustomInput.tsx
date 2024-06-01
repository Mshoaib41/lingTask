import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { TextInput, TextInputProps } from "react-native-paper";
import { colors } from "../theme/colors/index";

interface CustomTextInputProps extends TextInputProps {
  innerRef?: React.RefObject<typeof TextInput>;
  style?: ViewStyle | TextStyle;
}

const CustomTextInput: React.FC<CustomTextInputProps> = (props) => {
  const { style, ...others } = props;

  const styles = textInputStyles();

  return (
    <TextInput
      {...others}
      activeOutlineColor={colors.textColor}
      style={[styles.textInput, style]}
      outlineColor={styles.outlineStyle.borderColor}
    />
  );
};

const textInputStyles = () =>
  StyleSheet.create({
    textInput: {
      width: "75%",
      height: 40,
      fontSize: 16,
      padding: 0,
      fontFamily: "PoppinsSemiBold",
      justifyContent: "center",
    },
    outlineStyle: {
      borderColor: colors.textColor,
      borderWidth: 0.5,
    },
  });

export default CustomTextInput;
