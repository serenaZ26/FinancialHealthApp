import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { FIRESTORE_DB } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditUserProfilePage = () => {
  const [choosingDateDatePicker, setChoosingDateDatePicker] =
    useState('');
  const navigation = useNavigation();
  const[nName, setNname] = useState('');
  const[nPass, setnPass] = useState('');
  const[dob, setDob] = useState('');

  const userId = FIREBASE_AUTH.currentUser.uid;
  const db = FIRESTORE_DB;

  const handleEdit = async () => {
    const userDocRef = doc(db, "Users", userId);

    try {
      if (nName) {
        await updateDoc(userDocRef, { name: nName });
      }
  
      // Check and update password if it's not empty
      if (nPass) {
        await updateDoc(userDocRef, { password: nPass });
      }
  
      // Check and update dateOfBirth if it's not empty
      if (choosingDateDatePicker) {
        await updateDoc(userDocRef, { dateOfBirth: choosingDateDatePicker });
      }
      
      alert("Data saved successfully.");
      navigation.navigate("HomePage");

    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const currentDate = new Date();
  
  return (
    <View style={[styles.editUserProfilePage, styles.iconLayout]}>
      <StatusBar/>
      <TextInput
        style={[styles.controlsTextFieldFloatin1, styles.controlsPosition]}
        label="Name"
        mode="outlined"
        placeholderTextColor="#72777a"
        theme={{
          fonts: { regular: { fontFamily: "Inter", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={nName}
        onChangeText={(text) => setNname(text)}
      />
    
      <TextInput
        style={[styles.controlsTextFieldFloatin2, styles.controlsPosition]}
        label="Password"
        mode="outlined"
        placeholderTextColor="#72777a"
        theme={{
          fonts: { regular: { fontFamily: "Inter", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={nPass}
        onChangeText={(text) => setnPass(text)}
      />
      
     
      <Button
        style={styles.loginButton}
        mode="contained"
        labelStyle={styles.loginButtonBtn}
        onPress={handleEdit}
        contentStyle={styles.loginButtonBtn1}
      >{`Save `}</Button>

      <Text style={styles.editUserProfile}>Edit User Profile</Text>
      <View style={styles.choosingDateParent}>
        <RNKDatepicker
          style={styles.choosingDate}
          date={choosingDateDatePicker}
          onSelect={setChoosingDateDatePicker}
          controlStyle={styles.choosingDateDatePickerValue}
          max={currentDate}
          min={new Date(1800, 0, 1)}
        />
        <Text style={styles.dateOfBirth} numberOfLines={1}>
          Date of Birth
        </Text>
      </View>
      <Pressable
        style={styles.arrowDown}
        onPress={() =>
          navigation.navigate("BottomTabsRoot", { screen: "HomePage" })
        }
      >
        <Image
          style={[styles.icon, styles.iconLayout]}
          contentFit="cover"
          source={require("../assets/arrowdown1.png")}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
  choosingDateDatePickerPlaceHolder: {
    fontFamily: "Roboto",
    color: "#101010",
    fontSize: 14,
  },
  choosingDateDatePickerValue: {
    position: "absolute",
    left: "-0.92%",
    top: "37.5%",
    right: "18.43%",
    bottom: "-2.5%",
    width: "82.49%",
    height: "65%",
  },
  iconLayout: {
    overflow: "hidden",
    width: "100%",
  },
  controlsPosition1: {
    height: 52,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    left: 45,
    right: 47,
    position: "absolute",
  },
  materialIconLayout: {
    height: 20,
    width: 20,
    left: 291,
    position: "absolute",
    overflow: "hidden",
  },
  controlsPosition: {
    left: 46,
    right: 46,
    height: 52,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  statusBarLight: {
    top: 0,
    left: 2,
    width: 375,
    height: 45,
    position: "absolute",
  },
  controlsTextFieldFloatin: {
    top: 315,
  },
  materialSymbolseditOutlineIcon: {
    top: 331,
  },
  controlsTextFieldFloatin1: {
    top: 111,
  },
  materialSymbolseditOutlineIcon1: {
    top: 127,
  },
  controlsTextFieldFloatin2: {
    top: 247,
  },
  materialSymbolseditOutlineIcon2: {
    top: 263,
  },
  controlsTextFieldFloatin3: {
    top: 179,
  },
  materialSymbolseditOutlineIcon3: {
    top: 195,
  },
  loginButton: {
    backgroundColor: Color.viridian,
    top: 589,
    right: 78,
    left: 77,
    position: "absolute",
  },
  editUserProfile: {
    top: 45,
    left: 95,
    fontSize: FontSize.size_5xl,
    lineHeight: 30,
    fontWeight: "800",
    fontFamily: FontFamily.roboto,
    color: Color.black01,
    textAlign: "center",
    position: "absolute",
  },
  choosingDate: {
    left: "-0.92%",
    top: "37.5%",
    right: "18.43%",
    bottom: "-2.5%",
    width: "82.49%",
    height: "65%",
    position: "absolute",
  },
  dateOfBirth: {
    marginTop: -40,
    marginLeft: -108.5,
    top: "50%",
    left: "50%",
    fontSize: 16,
    lineHeight: 17,
    fontWeight: "700",
    fontFamily: FontFamily.regularNoneMedium,
    color: Color.indigoDye,
    textAlign: "left",
    width: 217,
    height: 18,
    position: "absolute",
  },
  choosingDateParent: {
    height: "9.85%",
    width: "57.87%",
    top: "57.41%",
    right: "29.33%",
    bottom: "42.73%",
    left: "14.8%",
    position: "absolute",
  },
  icon: {
    height: "100%",
  },
  arrowDown: {
    left: 25,
    top: 46,
    width: 24,
    height: 24,
    position: "absolute",
  },
  editUserProfilePage: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    height: 812,
  },
});

export default EditUserProfilePage;
