import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

const GroupIcon5 = ({ style }) => {
  return (
    <Image
      style={[styles.groupIcon, style]}
      contentFit="cover"
      source={require("../assets/user1.png")}
    />
  );
};

const styles = StyleSheet.create({
  groupIcon: {
    width: 24,
    height: 24,
  },
});

export default GroupIcon5;
