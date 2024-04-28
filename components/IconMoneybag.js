import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet } from "react-native";
import { Image } from "expo-image";

const IconMoneybag = ({ style }) => {
  return (
    <Image
      style={[styles.iconMoneybag, style]}
      contentFit="cover"
      source={require("../assets/-icon-moneybag.png")}
    />
  );
};

const styles = StyleSheet.create({
  iconMoneybag: {
    width: 21,
    height: 21,
  },
});

export default IconMoneybag;
