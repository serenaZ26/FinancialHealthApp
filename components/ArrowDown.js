import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

const ArrowDown = () => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.arrowDown, styles.arrowTransform]}
      onPress={() => navigation.goBack()}
    >
      <Image
        style={[styles.arrowDownChild, styles.arrowTransform]}
        contentFit="cover"
        source={require("../assets/group-4.png")}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  arrowTransform: {
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    overflow: "hidden",
  },
  arrowDownChild: {
    position: "absolute",
    height: "76.25%",
    width: "58.33%",
    top: "12.08%",
    right: "20.83%",
    bottom: "11.67%",
    left: "20.83%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  arrowDown: {
    width: 24,
    height: 24,
  },
});

export default ArrowDown;
