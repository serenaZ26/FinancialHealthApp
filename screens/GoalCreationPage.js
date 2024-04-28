import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import { TextInput, Button } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, Color, FontFamily } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { FIRESTORE_DB } from "../firebaseConfig";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { addDoc, collection, query, where, getDocs } from "firebase/firestore";

const GoalCreationPage = () => {
  const db = FIRESTORE_DB;
  const userId = FIREBASE_AUTH.currentUser.uid;

  const [controlsTextFieldFloatin3Open, setControlsTextFieldFloatin3Open] =
    useState(false);
  const [goalName, setGoalName] = useState('');
  const [controlsTextFieldFloatin3Items, setControlsTextFieldFloatin3Items] =
    useState([
      { value: "Car", label: "Car" },
      { value: "House", label: "House" },
    ]);
  const navigation = useNavigation();

  const [cDate, setCDate] = useState('');
  const [eDate, setEDate] = useState('');
  const [tAmount, setTAmount] = useState('');

  const currentDate = new Date();

  const storeGoal = async () => {
    try {
      await addDoc(collection(db, 'Goals'), {
        name: goalName,
        totalAmount: parseInt(tAmount),
        currentAmount: 0,
        startDate: cDate,
        endDate: eDate,
        uid: userId,
      });
      navigation.navigate("SavingsGoalsPage");
      alert("Data saved successfully.");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  return (
    <View style={styles.goalCreationPage}>
      <Text style={styles.goalCreation} numberOfLines={1}>
        Goal Creation
      </Text>
      <View style = {[styles.choosingDateParent, styles.choosingDate]}>
        <RNKDatepicker
          label={() => (
            <Text style={styles.controlsTextFieldFloatinLabel}>Start Date</Text>
          )}
          date={cDate}
          onSelect={setCDate}
          status="basic"
          controlStyle={styles.controlsTextFieldFloatinValue}
          max={currentDate}
          min={currentDate}
        />
        <RNKDatepicker
          label={() => (
            <Text style={styles.controlsTextFieldFloatin1Label}>End Date </Text>
          )}
          date={eDate}
          onSelect={setEDate}
          controlStyle={styles.controlsTextFieldFloatin1Value}
          min={currentDate}
          max={new Date(2500, 0, 1)}
        />
      </View>

      <TextInput
        style={[styles.controlsTextFieldFloatin, styles.controlsPosition]}
        label="Total Saving Amount"
        placeholder="AED"
        mode="outlined"
        placeholderTextColor="#72777a"
        theme={{
          fonts: { regular: { fontFamily: "Inter", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={tAmount}
        onChangeText={(text) => setTAmount(text)}
      />
      <View style={[styles.controlsTextFieldFloatin1, styles.controlsPosition]}>
        
        <DropDownPicker
          style={styles.dropdownpicker}
          open={controlsTextFieldFloatin3Open}
          setOpen={setControlsTextFieldFloatin3Open}
          value={goalName}
          setValue={setGoalName}
          placeholder="Goal Name"
          items={controlsTextFieldFloatin3Items}
          labelStyle={styles.controlsTextFieldFloatin3Value}
          textStyle={styles.controlsTextFieldFloatin3Text}
          dropDownContainerStyle={
            styles.controlsTextFieldFloatin3dropDownContainer
          }
        />
      </View>
    
      <Button
        style={styles.loginButton}
        mode="contained"
        labelStyle={styles.loginButtonBtn}
        onPress={() => storeGoal()}
        contentStyle={styles.loginButtonBtn1}
      >
        Create Goal
      </Button>
      
      <Pressable
        style={styles.arrowDown}
        onPress={storeGoal}
      >
        <Image
        style={styles.arrowDownIcon}
        contentFit="cover"
        source={require("../assets/arrowdown1.png")}
        />
      </Pressable>

      <Pressable
        style={[styles.frameLayout]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.arrowDownIcon}
          contentFit="cover"
          source={require("../assets/arrowdown1.png")}
        />
      </Pressable>
      <StatusBar/>
    </View>
  );
};

const styles = StyleSheet.create({
  frameLayout: {
    top: 5,
    height: 45,
    width: 50,
    position: "absolute",
  },
  choosingDateParent: {
    height: "9.85%",
    width: "57.87%",
    top: "50.41%",
    right: "29.33%",
    bottom: "42.73%",
    left: "13.8%",
    position: "absolute",
  },
  choosingDate:{
    top: 250, 
    left: 47,
  },
  controlsTextFieldFloatinLabel: {
    fontFamily: FontFamily.Roboto,
    color: Color.colorBlack,
    fontSize: 16,
  },
  controlsTextFieldFloatinValue: {},
  controlsTextFieldFloatin1Label: {
    fontFamily: FontFamily.Roboto,
    color: Color.colorBlack,
    fontSize: 16,
  },
  controlsTextFieldFloatin1Value: {},
  controlsTextFieldFloatin3Value: {
    fontFamily: FontFamily.Roboto,
  },
  controlsTextFieldFloatin3Text: {
    color: "#090a0a",
    fontSize: 16,
    fontFamily: "Inter",
  },
  controlsTextFieldFloatin3dropDownContainer: {
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderColor: "#104d6c",
    borderWidth: 2,
  },
  loginButtonBtn: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  loginButtonBtn1: {
    borderRadius: 48,
    height: 50,
  },
  controlsPosition: {
    height: 52,
    borderRadius: Border.br_5xs,
    left: 44,
    right: 48,
    borderStyle: "solid",
    position: "absolute",
  },
  totalFlexBox: {
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
  },
  goalCreation: {
    top: 48,
    left: 110,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    color: Color.black01,
    textAlign: "center",
    fontFamily: FontFamily.roboto,
    lineHeight: 30,
    position: "absolute",
  },
  controlsTextFieldFloatin: {
    top: 180,
  },
  dropdownpicker: {
    backgroundColor: Color.neutralColorsWhite,
    borderColor: Color.indigoDye,
  },
  controlsTextFieldFloatin1: {
    top: 113,
  },
  total: {
    top: 546,
    left: 60,
    fontSize: FontSize.size_mini,
    fontWeight: "500",
    fontFamily: FontFamily.regularNoneMedium,
    color: Color.colorGray_500,
  },
  amount: {
    top: 568,
    left: 137,
    fontSize: FontSize.size_7xl,
    fontWeight: "600",
    color: Color.colorWhitesmoke_200,
    fontFamily: FontFamily.roboto,
  },
  loginButton: {
    top: 399,
    right: 83,
    left: 72,
    position: "absolute",
    backgroundColor: Color.viridian,
  },
  arrowDown: {
    top: -100,
    left: -1,
    width: 40,
    height: 24,
  }, 
  arrowDownIcon: {
    top: 46,
    left: 25,
    width: 24,
    height: 24,
    position: "absolute",
    overflow: "hidden",
  },
  statusBarLight: {
    top: 0,
    left: 0,
    width: 375,
    height: 45,
    position: "absolute",
  },
  goalCreationPage: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default GoalCreationPage;