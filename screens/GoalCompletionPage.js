import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Color, FontFamily, FontSize } from "../GlobalStyles";


const GoalCompletionPage = () => {
  return (
    <View style={styles.goalCompletionPage}>
      <Image
        style={styles.goalCompletionPageChild}
        contentFit="cover"
        source={require("../assets/group-386.png")}
      />
      <Text style={styles.text} numberOfLines={1}>
        100%
      </Text>
      <Text style={styles.youveSuccessfullyCompleted} numberOfLines={3}>
        You've successfully completed saving up for a car as of 13/03/2024
      </Text>
      <Text style={[styles.congratulationsJane, styles.youDidItTypo]}>
        Congratulations, Jane!
      </Text>
      <Text style={[styles.youDidIt, styles.youDidItTypo]} numberOfLines={1}>
        YOU DID IT!
      </Text>
      <Button
        style={styles.cancel}
        mode="elevated"
        labelStyle={styles.cancelBtn}
        contentStyle={styles.cancelBtn1}
      >
        Close
      </Button>
      <Image
        style={styles.statusBarLight}
        contentFit="cover"
        source={require("../assets/status-bar--light6.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cancelBtn: {
    color: "#0d0d0d",
    fontSize: 14,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  cancelBtn1: {
    marginLeft: -32.5,
  },
  youDidItTypo: {
    fontWeight: "700",
    width: 264,
    textAlign: "center",
    lineHeight: 24,
    color: Color.colorGray_400,
    fontFamily: FontFamily.roboto,
    left: "50%",
    position: "absolute",
  },
  goalCompletionPageChild: {
    height: "29.19%",
    width: "48.8%",
    top: "14.41%",
    right: "25.6%",
    bottom: "56.4%",
    left: "25.6%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  text: {
    marginLeft: -58.5,
    top: 382,
    fontSize: 40,
    letterSpacing: 0.8,
    lineHeight: 48,
    fontWeight: "500",
    textAlign: "left",
    color: Color.colorGray_400,
    fontFamily: FontFamily.roboto,
    left: "50%",
    position: "absolute",
  },
  youveSuccessfullyCompleted: {
    top: 527,
    fontSize: FontSize.size_xl,
    width: 264,
    textAlign: "center",
    lineHeight: 24,
    marginLeft: -131.5,
    color: Color.colorGray_400,
    fontFamily: FontFamily.roboto,
    left: "50%",
    position: "absolute",
  },
  congratulationsJane: {
    marginLeft: -135.5,
    top: 482,
    fontSize: FontSize.size_5xl,
  },
  youDidIt: {
    top: 55,
    fontSize: FontSize.size_17xl,
    marginLeft: -131.5,
    fontWeight: "700",
  },
  cancel: {
    bottom: 38,
    alignItems: "center",
    left: "50%",
    position: "absolute",
  },
  statusBarLight: {
    top: 0,
    left: 4,
    width: 375,
    height: 45,
    position: "absolute",
  },
  goalCompletionPage: {
    backgroundColor: "rgba(116, 209, 115, 0.46)",
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default GoalCompletionPage;
