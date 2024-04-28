import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { Button, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { FontSize, Color, FontFamily, Border } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { FIRESTORE_DB } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_AUTH } from "../firebaseConfig";

const WeeklyInputPage = () => {
  const navigation = useNavigation();

  DropDownPicker.setListMode("SCROLLVIEW");
  const [textInputValue, setTextInputValue] = useState("");
  const [jobDropdownOpen, setJobDropdownOpen] = useState(false);
  const [jobDropdownValue, setJobDropdownValue] = useState();
  const [jobDropdownItems, setJobDropdownItems] = useState([
    { value: "Groceries", label: "Groceries" },
    { value: "Rent", label: "Rent" },
    { value: "Utilities", label: "Utilities" },
    { value: "Movies", label: "Movies" },
    { value: "Gifts", label: "Gifts" },
    { value: "Home Maintenance", label: "Home Maintenance" },
    { value: "Car Repair", label: "Car Repair" },
    { value: "Event/Outing", label: "Event/Outing" },
    { value: "Doctor Visit", label: "Doctor Visit" },
    { value: "Media Subscription", label: "Media Subscription" },
    { value: "Vacation", label: "Vacation" },
    { value: "Dining", label: "Dining" },
    { value: "Personal Care", label: "Personal Care" },
    { value: "Pet Care", label: "Pet Care" },
    { value: "Child Care", label: "Child Care" },
  ]);

  const expenseCategories = {
    Essential: ["Groceries", "Rent", "Utilities", "Home Maintenance", "Doctor Visit", "Personal Care", "Pet Care", "Child Care"],
    Leisure: ["Movies", "Event/Outing", "Media Subscription", "Vacation", "Dining", "Gifts"],
    Unplanned: ["Car Repair"] 
  };

  const getCategoryByName = (expenseName) => {
    for (const category in expenseCategories) {
      if (expenseCategories[category].includes(expenseName)) {
        return category; // Returns 'Essential', 'Leisure', or 'Unplanned'
      }
    }
    return 'Other'; // Default category if not found
  };

  const submitExpense = async () => {
    try {
      // Get a reference to the Expense_Type collection
      const expenseCollectionRef = collection(FIRESTORE_DB, "Expense_Type");
      const expenseCategory = getCategoryByName(jobDropdownValue);
      
      // Add a new document with the selected expense and amount
      await addDoc(expenseCollectionRef, {
        name: jobDropdownValue,
        amount: parseFloat(textInputValue), // Assuming you have a state variable for the amount input
        uid: FIREBASE_AUTH.currentUser.uid, // Assuming you want to track the user who submitted the expense
        category: expenseCategory,
      });
      
      clearInputs();
      // You can also navigate to another screen or show a success message here
    } catch (error) {
      console.error("Error adding document: ", error);
      // Handle the error, e.g., show an error message
    }
  };

  const clearInputs = () => {
    setJobDropdownValue(null);
    setTextInputValue(0);
  };

  console.log("");

  return (
    <View style={styles.weeklyInputPage}>
      <Text style={styles.weeklyExpenseInput}>{`Weekly Expense Input `}</Text>
      
      <Button
        style={styles.loginButton}
        mode="contained"
        labelStyle={styles.loginButtonBtn}
        contentStyle={styles.loginButtonBtn1}
        onPress={submitExpense}
      >{`Save `}</Button>

      <Button
        style={styles.loginButton1}
        mode="contained"
        labelStyle={styles.loginButton1Btn}
        contentStyle={styles.loginButton1Btn1}
        onPress={clearInputs}
      >{`Clear `}</Button>

      <Pressable
        style={styles.arrowDown}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={styles.arrowDownChild}
          contentFit="cover"
          source={require("../assets/group-4.png")}
        />
      </Pressable>

      <StatusBar/>
      
      <View
        style={[styles.dropdownBox, styles.dropdownBoxLayout, { top: 111 }]}
      >
        <DropDownPicker
          style={styles.dropdownpicker}
          open={jobDropdownOpen}
          setOpen={setJobDropdownOpen}
          value={jobDropdownValue}
          setValue={setJobDropdownValue}
          placeholder="Expenses *"
          items={jobDropdownItems}
          labelStyle={styles.dropdownBoxValue}
          textStyle={styles.dropdownBoxText}
          zIndex={3000}
          zIndexInverse={3000}
          dropDownMaxHeight={400} 
          customDropDown={() => (
            <ScrollView>
            </ScrollView>
          )}
        />
      </View>

      <TextInput
        style={[styles.inputAddressLine3, styles.dropdownBoxLayout]}
        label="Amount *"
        mode="outlined"
        placeholderTextColor="#090a0a"
        onChangeText={setTextInputValue}
        theme={{
          fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
      />
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
  loginButton1Btn: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  loginButton1Btn1: {
    borderRadius: 48,
    height: 50,
  },
  dropdownBoxValue: {
    color: "#313144",
    fontSize: 15,
    fontFamily: "Roboto",
  },
  dropdownBoxText: {
    color: "#313144",
    fontSize: 15,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  totalFlexBox: {
    textAlign: "left",
    lineHeight: 20,
    position: "absolute",
  },
  dropdownBoxLayout: {
    height: 48,
    position: "absolute",
  },
  weeklyExpenseInput: {
    top: 45,
    left: 68,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    color: Color.black01,
    textAlign: "center",
    fontFamily: FontFamily.roboto,
    lineHeight: 30,
    position: "absolute",
  },
  weeklyInputPageChild: {
    top: 573,
    left: 40,
    borderRadius: Border.br_5xl,
    width: 295,
    height: 65,
    position: "absolute",
  },
  total: {
    top: 580,
    left: 60,
    fontSize: FontSize.size_mini,
    fontWeight: "500",
    fontFamily: FontFamily.regularNoneMedium,
    color: Color.colorGray_500,
  },
  amount: {
    top: 602,
    left: 137,
    fontSize: FontSize.size_7xl,
    fontWeight: "600",
    color: Color.colorWhitesmoke_200,
    fontFamily: FontFamily.roboto,
  },
  loginButton: {
    backgroundColor: Color.viridian,
    top: 654,
    right: 81,
    left: 74,
    position: "absolute",
  },
  loginButton1: {
    backgroundColor: Color.viridian,
    top: 251,
    right: 112,
    left: 103,
    position: "absolute",
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
    top: -1,
    left: 0,
    width: 375,
    height: 45,
    position: "absolute",
  },
  dropdownpicker: {
    zIndex: 0,
  },
  dropdownBox: {
    backgroundColor: Color.colorWhitesmoke_200,
    top: 111,
    left: 43,
    width: 270,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3000 // Adjusted the top position
  },
  inputAddressLine3: {
    top: 178,
    right: 52,
    left: 44,
    borderRadius: Border.br_5xs,
  },
  weeklyInputPage: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
  arrowDownChild: {
    height: "76.25%",
    width: "58.33%",
    top: "12.08%",
    right: "20.83%",
    bottom: "11.67%",
    left: "20.83%",
    maxHeight: "100%",
    maxWidth: "100%",
  },
  arrowDown: {
    top: 50,
    left: 10,
    width: 40,
    height: 24,
  },
});

export default WeeklyInputPage;
