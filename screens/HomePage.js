import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, StyleSheet, View,ScrollView, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, FontSize, Border } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { FIRESTORE_DB } from "../firebaseConfig";
import { getDoc,doc, collection, query, orderBy, limit, where } from "firebase/firestore";
import { FIREBASE_AUTH } from "../firebaseConfig";

const HomePage = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("...");
  const [financialTip, setFinancialTip] = useState("Loading...");

  useEffect(() => {
   
    const fetchRandomTip = async () => {

      const randomTipId = Math.floor(Math.random() * 15) + 1; // Generate number between 1 and 15
  
      const tipID = "f" + randomTipId.toString();
      const tipDocRef = doc(FIRESTORE_DB, 'Financial_Tips', tipID); // Assuming tipIDs are strings
      const tipDoc = await getDoc(tipDocRef);
  
        if (tipDoc.exists()) {
          setFinancialTip(tipDoc.data().content);
        } else {
          setFinancialTip("Tip not found."); // Handle non-existent tips
        }
      
      };
      
    fetchRandomTip(); 
  }, []); 

  useEffect(() => {
    const fetchUserName = async (userId) => { // Add userId parameter
      const userDocRef = doc(FIRESTORE_DB, 'Users', userId);
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().name); 
        } else {
          console.log("User document not found.");
        }
      } catch(error) {
        console.error("Error fetching user data:", error);
      }
    };
      const userId = FIREBASE_AUTH.currentUser.uid; // Use FIREBASE_AUTH 
      fetchUserName(userId);
    },[]); 

  return (
    <ScrollView>
    <View style={styles.homePage}>
      <Text style={[styles.helloJane, styles.helloJaneTypo]} numberOfLines={1}>
        Hello, {userName}!
      </Text>
      <View style={[styles.rectangleShadowBox, styles.groupParent, styles.groupLayout]}>
        <Image
          style={[styles.groupChild, styles.groupLayout]}
          contentFit="cover"
          source={require("../assets/group-42.png")} 
        />
        <Text style={[styles.loremIpsumDolor, styles.financialTipOfClr]} numberOfLines={4}>
        {financialTip}
        </Text>
        <Text style={[styles.financialTipOf, styles.financialTipOfClr]}>
          Financial Tip of the Week
        </Text>
      </View>
      <View style={styles.groupContainer}>
        <View style={[styles.groupView, styles.groupWrapperLayout]}>
        <Pressable
                style={[styles.groupWrapper, styles.groupWrapperLayout]}
                onPress={() => navigation.navigate("MonthlyInputPage")}
          >
          <View style={[styles.groupWrapper, styles.groupWrapperLayout]}>
            <View style={styles.rectangleShadowBox}>
              <View style={styles.groupItemShadowBox} />
              <View style={styles.generateMonthlyReportParent}>
                <Text style={styles.generateMonthlyReport}>
                  Input Monthly Expenses
                </Text>
                <Text style={styles.loremIpsumDolor1}>
                  Track your income and monthly expenses.
                </Text>
              </View>
            </View>
          </View>
          <Image
            style={[styles.groupInner, styles.groupChildLayout]}
            contentFit="cover"
            source={require("../assets/group-345.png")}
          />
          </Pressable>
        </View>
        <Pressable
          style={[styles.groupWrapper, styles.groupWrapperLayout]}
          onPress={() => navigation.navigate("WeeklyInputPage")}
        >
          <View style={[styles.groupWrapper, styles.groupWrapperLayout]}>
          
            <View style={[styles.groupItemShadowBox, styles.rectangleShadowBox]}>
              <View style={styles.generateMonthlyReportParent}>
                <Text style={styles.generateMonthlyReport}>
                  Input Weekly Finances
                </Text>
                <Text style={styles.loremIpsumDolor1}>
                  Track your expenses for the week
                </Text>
              </View>
            </View>
              <Image
                style={[styles.groupInner, styles.groupChildLayout]}
                contentFit="cover"
                source={require("../assets/group-345.png")}
              />
          </View>  
        </Pressable>
        

          <View style={[styles.groupWrapper, styles.groupWrapperLayout]}>
            <Pressable
            style={[styles.groupWrapper4, styles.groupWrapperLayout]}
            onPress={() => navigation.navigate("HelpAndSupportPage")}
            >
              <View style={styles.rectangleShadowBox}>
                <View style={styles.groupItemShadowBox} />
                <View style={styles.generateMonthlyReportParent}>
                  <Text style={styles.generateMonthlyReport}>
                    Help and Support
                  </Text>
                  <Text style={styles.loremIpsumDolor1}>
                    Let us know how we can assist you.
                  </Text>
                </View>
              </View>
            
            <Image
              style={[styles.groupInner, styles.groupChildLayout]}
              contentFit="cover"
              source={require("../assets/group-345.png")}
            />
            </Pressable>
          </View>
      </View>
      <StatusBar/>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  helloJaneTypo: {
    fontFamily: FontFamily.roboto,
    fontWeight: "700",
  },
  groupLayout: {
    height: 277,
    width: 332,
    position: "absolute",
  },
  financialTipOfClr: {
    color: Color.neutralColorsWhite,
    textAlign: "center",
    lineHeight: 20,
    position: "absolute",
  },
  groupWrapperLayout: {
    height: 110,
    width: 294,
    position: "absolute",
  },
  groupChildLayout: {
    height: 150,
    width: 150,
    top: -10,
    position: "absolute",
  },
  helloJane: {
    top: 64,
    left: 45,
    fontSize: FontSize.size_17xl,
    lineHeight: 50,
    textAlign: "left",
    width: 300,
    height: 42,
    color: Color.indigoDye,
    position: "absolute",
  },
  groupChild: {
    left: 0,
    top: 0,
  },
  loremIpsumDolor: {
    top: 110,
    left: 38,
    width: 250,
    height: 100,
    textAlign: "center",
    fontFamily: FontFamily.regularNoneMedium,
    fontSize: 16,
    color: Color.neutralColorsWhite,
  },
  financialTipOf: {
    top: 82,
    left: 40,
    fontSize: FontSize.size_xl,
    width: 250,
    height: 18,
    textAlign: "center",
    fontFamily: FontFamily.roboto,
    fontWeight: "700",
  },
  groupParent: {
    top: 90,
    left: 21,
  },
  groupItemShadowBox: {
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "rgba(74, 85, 104, 0.07)",
    borderRadius: Border.br_5xl,
    backgroundColor: Color.grey100,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    height: 110,
    width: 294,
    left: 0,
    top: 0,
    position: "absolute",
  },
  generateMonthlyReport: {
    fontSize: FontSize.regularNoneMedium_size,
    lineHeight: 24,
    fontWeight: "600",
    textAlign: "left",
    fontFamily: FontFamily.regularNoneMedium,
    color: Color.indigoDye,
  },
  loremIpsumDolor1: {
    width: 188,
    height: 40,
    marginTop: 6,
    textAlign: "left",
    fontFamily: FontFamily.regularNoneMedium,
    lineHeight: 20,
    fontSize: FontSize.size_smi,
    color: Color.indigoDye,
  },
  generateMonthlyReportParent: {
    top: 20,
    left: 18,
    backgroundColor: Color.grey100,
    position: "absolute",
  },
  rectangleShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    height: 110,
    width: 294,
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupWrapper: {
    left: 0,
    top: 0,
  },
  groupInner: {
    left: 165,
  },
  groupView: {
    top: 127,
    left: 1,
  },
  groupChild1: {
    left: 217,
  },
  groupPressable: {
    left: 3,
    top: 0,
  },
  groupChild2: {
    left: 220,
  },
  groupWrapper4: {
    top: 254,
    left: 0,
  },
  groupContainer: {
    top: 348,
    left: 39,
    width: 297,
    height: 364,
    position: "absolute",
  },
  statusBarLight: {
    left: 2,
    width: 375,
    height: 45,
    top: 0,
    position: "absolute",
  },
  homePage: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default HomePage;
