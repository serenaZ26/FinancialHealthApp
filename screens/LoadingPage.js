import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { Color } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";

const LoadingPage = () => {
  return (
    <View style={styles.loadingPage}>
      <Image
        style={styles.finsightLogoIcon}
        contentFit="cover"
        source={require("../assets/finsight-logo.png")}
      />
      <StatusBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  finsightLogoIcon: {
    top: 214,
    left: 10,
    width: 355,
    height: 384,
    position: "absolute",
  },
  statusBarLight: {
    top: 0,
    left: 0,
    width: 375,
    height: 45,
    position: "absolute",
  },
  loadingPage: {
    backgroundColor: Color.colorWhitesmoke_200,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default LoadingPage;
