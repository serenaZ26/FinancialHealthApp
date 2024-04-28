import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { Color, FontSize, FontFamily } from "../GlobalStyles";

const AndroidStatusBar = () => {
  return (
    <View style={styles.androidStatusBar}>
      <View style={styles.background} />
      <View style={styles.icons}>
        <Image
          style={styles.cellularIcon}
          contentFit="cover"
          source={require("../assets/cellular1.png")}
        />
        <Image
          style={[styles.wifiIcon, styles.iconSpaceBlock]}
          contentFit="cover"
          source={require("../assets/wifi1.png")}
        />
        <Image
          style={[styles.batteryIcon, styles.iconSpaceBlock]}
          contentFit="cover"
          source={require("../assets/battery1.png")}
        />
      </View>
      <Text style={styles.text}>12:30</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  iconSpaceBlock: {
    marginLeft: 6,
    height: 12,
  },
  background: {
    height: "100%",
    width: "100%",
    top: "0%",
    right: "0%",
    bottom: "0%",
    left: "0%",
    backgroundColor: Color.colorWhitesmoke_200,
    position: "absolute",
  },
  cellularIcon: {
    width: 18,
    height: 12,
  },
  wifiIcon: {
    width: 16,
  },
  batteryIcon: {
    width: 24,
  },
  icons: {
    height: "44.44%",
    width: "19.39%",
    top: "27.78%",
    right: "3.35%",
    bottom: "27.78%",
    left: "77.26%",
    flexDirection: "row",
    position: "absolute",
  },
  text: {
    top: "16.67%",
    left: "3.32%",
    fontSize: FontSize.size_sm,
    fontWeight: "500",
    fontFamily: FontFamily.roboto,
    color: Color.colorBlack,
    textAlign: "left",
    position: "absolute",
  },
  androidStatusBar: {
    width: 361,
    height: 27,
  },
});

export default AndroidStatusBar;
