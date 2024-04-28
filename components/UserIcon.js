import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

const UserIcon = ({ style }) => {
  return (
    <Image
      style={[styles.userIcon, style]}
      contentFit="cover"
      source={require("../assets/user.png")}
    />
  );
};

const styles = StyleSheet.create({
  userIcon: {
    width: 24,
    height: 24,
    overflow: "hidden",
  },
});

export default UserIcon;
