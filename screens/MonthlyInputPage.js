import * as React from "react";
import { useState } from "react";
import { Image } from "expo-image";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { Border, Color, FontFamily, FontSize } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const MonthlyInputPage = () => {
  const navigation = useNavigation();
  const userId = FIREBASE_AUTH.currentUser.uid;

  const [income, setIncome] = useState("");
  const [emerg, setEmerg] = useState("");
  const [loans, setLoans] = useState("");

  const storeData = async () => {
    const userDocRef = doc(FIRESTORE_DB, "Health_Score", userId);

    try {
      await updateDoc(userDocRef, {
        income: parseFloat(income),
        emergencyFunds: parseFloat(emerg),
        paymentPlans: parseFloat(loans),
      });
      alert("Data saved successfully.");
      navigation.navigate("HomePage");

    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <View style={styles.monthlyInputPage}>
      <Text style={styles.monthlyFinancialInput} numberOfLines={1}>
        {`Monthly Financial Input `}
      </Text>

      <Text style={[styles.text, styles.textTypo]}>
      Please input the following details. These are crucial for calculating your financial health score:
      </Text>
      <Button
        style={styles.saveDetailsButton}
        mode="contained"
        labelStyle={styles.saveDetailsButtonBtn}
        contentStyle={styles.saveDetailsButtonBtn1}
        onPress={storeData}
      >
        {`Save `}
      </Button>

      <TextInput
        style={[styles.inputLoans, styles.inputPosition]}
        label="Payment Plans *"
        placeholder="AED"
        mode="outlined"
        placeholderTextColor="#090a0a"
        theme={{
          fonts: { regular: { fontFamily: "Inter", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={loans}
        onChangeText={(text) => setLoans(text)}
      />
      <TextInput
        style={[styles.inputIncome, styles.inputPosition]}
        label="Income *"
        placeholder="AED"
        mode="outlined"
        placeholderTextColor="#090a0a"
        theme={{
          fonts: { regular: { fontFamily: "Inter", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={income}
        onChangeText={(text) => setIncome(text)}
      />
      <TextInput
        style={[styles.inputEmergency, styles.inputPosition]}
        label="Emergency Funds *"
        placeholder="AED"
        mode="outlined"
        placeholderTextColor="#090a0a"
        theme={{
          fonts: { regular: { fontFamily: "Inter", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={emerg}
        onChangeText={(text) => setEmerg(text)}
      />

      <Pressable
        style={[styles.frame, styles.frameLayout]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.arrowDownIcon}
          contentFit="cover"
          source={require("../assets/arrowdown1.png")}
        />
      </Pressable>

      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  saveDetailsButtonBtn: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  saveDetailsButtonBtn1: {
    borderRadius: 48,
    height: 50,
  },
  inputPosition: {
    height: 48,
    borderRadius: Border.br_5xs,
    left: 49,
    right: 46,
    position: "absolute",
  },
  textTypo: {
    textAlign: "left",
    color: Color.indigoDye,
    fontFamily: FontFamily.regularNoneMedium,
    lineHeight: 16,
    fontSize: 16,
    left: 54,
    top: 120,
    position: "absolute",
  },
  monthlyFinancialInput: {
    top: 48,
    left: 50,
    fontSize: FontSize.size_5xl,
    lineHeight: 30,
    fontWeight: "800",
    fontFamily: FontFamily.roboto,
    color: Color.black01,
    textAlign: "center",
    position: "absolute",
  },
  saveDetailsButton: {
    backgroundColor: Color.viridian,
    top: 450,
    right: 78,
    left: 77,
    position: "absolute",
  },
  inputLoans: {
    top: 250,
  },
  inputIncome: {
    top: 185,
  },
  inputEmergency: {
    top: 315,
  },
  arrowDownIcon: {
    top: 51,
    left: 14,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  text: {
    width: 251,
    height: 88,
  },
  text1: {
    marginTop: -307,
    width: 241,
    height: 53,
  },
  frameLayout: {
    height: 45,
    width: 50,
    position: "absolute",
  },
  frame: {
    top: 2,
  },
  monthlyInputPage: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default MonthlyInputPage;
