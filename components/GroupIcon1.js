import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

const GroupIcon1 = ({ style }) => {
  return (
    <Image
      style={[styles.groupIcon, style]}
      contentFit="cover"
      source={require("../assets/group-361.png")}
    />
  );
};

const styles = StyleSheet.create({
  groupIcon: {
    width: 19,
    height: 22,
  },
});

export default GroupIcon1;
