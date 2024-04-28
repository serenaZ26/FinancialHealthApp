import * as React from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";

const MenuScreen = () => {
  return (
    <View style={styles.menuScreen}>
      <Image
        style={[styles.menuScreenChild, styles.menuChildLayout1]}
        contentFit="cover"
        source={require("../assets/group-390.png")}
      />
      <View style={styles.groupParent}>
        <Image
          style={[styles.groupChild, styles.groupPosition]}
          contentFit="cover"
          source={require("../assets/group-390.png")}
        />
        <Text
          style={[styles.userAccount, styles.homeLayout]}
        >{`User Account `}</Text>
      </View>
      <Image
        style={[styles.menuScreenItem, styles.menuChildLayout1]}
        contentFit="cover"
        source={require("../assets/group-393.png")}
      />
      <View style={[styles.groupContainer, styles.groupLayout]}>
        <Image
          style={[styles.groupItem, styles.groupPosition]}
          contentFit="cover"
          source={require("../assets/group-393.png")}
        />
        <Text style={[styles.home, styles.homeLayout]}>Home</Text>
      </View>
      <Image
        style={[styles.menuScreenInner, styles.menuChildLayout1]}
        contentFit="cover"
        source={require("../assets/group-391.png")}
      />
      <View style={styles.groupView}>
        <Image
          style={[styles.groupInner, styles.groupPosition]}
          contentFit="cover"
          source={require("../assets/group-391.png")}
        />
        <Text style={[styles.savingsGoals, styles.savingsGoalsTypo]}>
          Savings Goals
        </Text>
      </View>
      <View style={styles.financialHealthScoreParent}>
        <Text
          style={[styles.financialHealthScore, styles.savingsGoalsTypo]}
        >{`Financial Health Score `}</Text>
        <Image
          style={[styles.groupIcon, styles.groupPosition]}
          contentFit="cover"
          source={require("../assets/group-388.png")}
        />
      </View>
      <Image
        style={[styles.menuScreenChild1, styles.menuChildLayout1]}
        contentFit="cover"
        source={require("../assets/group-388.png")}
      />
      <View style={[styles.groupParent1, styles.groupLayout]}>
        <Image
          style={[styles.groupItem, styles.groupPosition]}
          contentFit="cover"
          source={require("../assets/group-367.png")}
        />
        <Text style={[styles.menu, styles.homeLayout]}>Menu</Text>
      </View>
      <Image
        style={[styles.menuScreenChild3, styles.menuChildLayout]}
        contentFit="cover"
        source={require("../assets/group-3981.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuChildLayout1: {
    width: 42,
    height: 40,
    position: "absolute",
  },
  groupPosition: {
    top: 0,
    height: 40,
    width: 42,
    position: "absolute",
  },
  homeLayout: {
    height: 19,
    width: 123,
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.roboto,
    lineHeight: 20,
    fontSize: FontSize.regularNoneMedium_size,
    left: 0,
    position: "absolute",
  },
  groupLayout: {
    width: 176,
    left: 169,
    height: 40,
    position: "absolute",
  },
  savingsGoalsTypo: {
    textAlign: "center",
    color: Color.colorBlack,
    fontFamily: FontFamily.roboto,
    lineHeight: 20,
    fontSize: FontSize.regularNoneMedium_size,
    left: 0,
    position: "absolute",
  },
  menuChildLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    width: "86.13%",
    overflow: "hidden",
  },
  menuScreenChild: {
    top: 243,
    height: 40,
    left: 69,
    width: 42,
  },
  groupChild: {
    left: 133,
  },
  userAccount: {
    top: 8,
  },
  groupParent: {
    top: 240,
    left: 170,
    width: 175,
    height: 40,
    position: "absolute",
  },
  menuScreenItem: {
    top: 564,
    left: 70,
    height: 40,
  },
  groupItem: {
    left: 134,
  },
  home: {
    top: 13,
  },
  groupContainer: {
    top: 561,
  },
  menuScreenInner: {
    top: 348,
    height: 40,
    left: 69,
    width: 42,
  },
  groupInner: {
    left: 132,
  },
  savingsGoals: {
    top: 11,
    width: 112,
    height: 21,
  },
  groupView: {
    top: 347,
    left: 173,
    width: 174,
    height: 40,
    position: "absolute",
  },
  financialHealthScore: {
    top: 5,
    width: 130,
    height: 40,
  },
  groupIcon: {
    left: 141,
  },
  financialHealthScoreParent: {
    top: 454,
    left: 162,
    width: 183,
    height: 45,
    position: "absolute",
  },
  menuScreenChild1: {
    top: 459,
    height: 40,
    left: 69,
    width: 42,
  },
  menu: {
    top: 10,
  },
  groupParent1: {
    top: 661,
  },
  menuScreenChild3: {
    height: "3.2%",
    top: "87.68%",
    right: "6.4%",
    bottom: "9.11%",
    left: "7.47%",
    position: "absolute",
  },
  menuScreen: {
    backgroundColor: Color.colorWhitesmoke_100,
    width: 375,
    height: 812,
    overflow: "hidden",
  },
});

export default MenuScreen;
