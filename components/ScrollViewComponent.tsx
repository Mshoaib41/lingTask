import type { PropsWithChildren, ReactNode } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  useColorScheme,
  StatusBar,
} from "react-native";

import { CustomText } from "./CustomText";
import { useTheme } from "react-native-paper";
import { colors } from "../theme/colors/index";

const HEADER_HEIGHT = 100;

type Props = PropsWithChildren<{
  headerTitle: string;
  rightComponent: ReactNode;
}>;

export default function ScrollViewComponent({
  children,
  headerTitle,
  rightComponent,
}: Props) {
  const theme = useTheme();

  const styles = createStyles();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.row}>
        <View />
        <CustomText type="title" style={styles.headerTitle}>
          {headerTitle}
        </CustomText>
        {rightComponent}
      </View>
      <View style={styles.headerContainer}>{children}</View>
    </SafeAreaView>
  );
}

const createStyles = () =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: colors.white,
      paddingTop: StatusBar.currentHeight,
    },
    headerTitle: {
      position: "absolute",
      width: "100%",
      textAlign: "center",
    },
    headerContainer: {
      marginHorizontal: 20,
    },
    row: {
      height: 30,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
  });
