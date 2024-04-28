import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

const GroupIcon = ({ style }) => {
  return (
    <Image
      style={[styles.groupIcon, style]}
      contentFit="cover"
      source={require("../assets/group-358.png")}
    />
  );
};

const styles = StyleSheet.create({
  groupIcon: {
    width: 21,
    height: 21,
  },
});

export default GroupIcon;
