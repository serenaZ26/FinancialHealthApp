import React, { useState } from "react";
import { Text, StyleSheet, Pressable, View, Linking } from "react-native";
import { Image } from "expo-image";
import { Button, RadioButton, TextInput } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { Datepicker as RNKDatepicker } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, FontSize, Color, Border } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { TextStyleProps } from "@ui-kitten/components/devsupport";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { collection, where, updateDoc, doc, getDocs, getDoc, setDoc } from "firebase/firestore";

const UserInfoInputPage = () => {
  const [dropdownBoxOpen, setDropdownBoxOpen] = useState(false);
  const [dropdownBoxValue, setDropdownBoxValue] = useState("");
  const [dropdownBoxItems, setDropdownBoxItems] = useState([
    { value: "IT", label: "IT" },
    { value: "Education", label: "Education" },
    { value: "Health Care", label: "Health Care" },
    { value: "Business", label: "Business" },
    { value: "Arts", label: "Arts" },
    { value: "Hospitality", label: "Hospitality" },
    { value: "Government", label: "Government" },
  ]);
  
  const [dropdownBox1Open, setDropdownBox1Open] = useState(false);
  const [dropdownBox1Value, setDropdownBox1Value] = useState("");
  const [dropdownBox1Items, setDropdownBox1Items] = useState([
    { value: "Software_Engineer", label: "Software Engineer" },
    { value: "Web_Developer", label: "Web Developer" },
    { value: "Cybersecurity", label: "Cyber Security" },
    { value: "Teacher", label: "Teacher" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Principal", label: "Principal" },
    { value: "Doctor", label: "Doctor" },
    { value: "Nurse", label: "Nurse" },
    { value: "Physician", label: "Physician" },
    { value: "Accounting", label: "Accounting" },
    { value: "Consulting", label: "Consulting" },
    { value: "Sales_Agent", label: "Sales" },
    { value: "Animator", label: "Animator" },
    { value: "Officer", label: "Police Officer"},
    { value: "Photographer", label: "Photographer" },
    { value: "Artist", label: "Digital_Artist" },
    { value: "Chef", label: "Chef" },
    { value: "Waiter", label: "Waiter" },
    { value: "Hostess", label: "Hostess" },
    { value: "Firefighter", label: "Fire Fighter" },
    { value: "Postal_Service", label: "Postal Service" },
  ]);
  const [groupRadioValue, setGroupRadioValue] = useState("No");
  const [groupRadio1Value, setGroupRadio1Value] = useState("No");
  const [selectedDate, setSelectedDate] = useState("");
  const navigation = useNavigation();
  const [creditScoreVisible, setCreditScoreVisible] = useState(false);
  const [netWorthVisible, setNetWorthVisible] = useState(false);
  
  const currentDate = new Date();
  const userId = FIREBASE_AUTH.currentUser.uid;
  const db = FIRESTORE_DB;

  const calculateAge = (selectedDate) => {
      var today = new Date();
      var birthDate = new Date(selectedDate);  // create a date object directly from `dob1` argument
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
      {
        age_now--;
      }
      console.log(age_now);
      return age_now;
  }

  const retrieveFinancialData = async (userProfession, userAge, userId) => {
    try {
      const professionRef = doc(db, 'Profession', userProfession);
      const professionDoc = await getDoc(professionRef);
  
      if (professionDoc.exists) {
        const professionData = professionDoc.data();
        const ageGroup = determineAgeGroup(userAge);
  
        if (ageGroup) {
          const creditScoreRange = professionData[`${ageGroup}CS`];
          const netWorthRange = professionData[`${ageGroup}NW`];
  
          if (creditScoreRange && netWorthRange) {
            await updateHealthScore(userId, creditScoreRange, netWorthRange);
          } else {
            console.log("Credit score range or net worth range not found.");
          }
        } else {
          console.log("No matching age range found.");
        }
      } else {
        console.log("No matching profession data found.");
      }
    } catch (error) {
      console.error("Error retrieving financial data:", error);
    }
  }

  const determineAgeGroup = (age) => {
    if (age >= 20 && age <= 29) {
        return 'twenties';
    } else if (age >= 30 && age <= 39) {
        return 'thirties';
    } else if (age >= 40 && age <= 49) {
        return 'forties';
    } else {
        return null; 
    }
  }

  const updateHealthScore = async (userId, creditScore, netWorth) => {
    const healthScoreRef = doc(db, 'Health_Score', userId);

    try {
        await setDoc(healthScoreRef, { // Or use .update() to merge with existing data
            creditScore,
            netWorth,
        });
        console.log("Health score updated successfully!");
    } catch (error) {
        console.error("Error updating health score:", error);
    }
  };

  const storeData = async() => {
    const userProfession = dropdownBox1Value;
    const userAge = calculateAge(selectedDate); // Example age

    console.log(userProfession);
    console.log(userAge);
    console.log(userId);

    const userRef = doc(db, 'Users', userId);
    await updateDoc(userRef, {
        dateOfBirth: selectedDate,
        profession: userProfession
    });

    if (userProfession && userAge && userId) {
      retrieveFinancialData(userProfession, userAge, userId);
    }
    navigation.navigate("MonthlyInputPage");
  }

  return (
    <View style={styles.userInfoInputPage}>
      <Pressable
        style={styles.byRegisteringWithContainer}
        numberOfLines={1}
        onClick={() => Linking.openURL("https://www.unitechfinsight.com")}
      >
        <Text
          style={styles.byRegisteringWithFinsight}
        >{`By registering with FinSight, you agree with the T&Cs`}</Text>
      </Pressable>

      <Image
        style={styles.userInfoInputPageChild}
        contentFit="cover"
        source={require("../assets/group-37.png")}
      />
    
      <Button
        style={styles.submitButton}
        mode="contained"
        labelStyle={styles.submitButtonBtn}
        onPress={storeData}
        contentStyle={styles.submitButtonBtn1}
      >
        Submit
      </Button>
      <View
        style={[styles.dropdownBox, styles.dropdownFlexBox]}
        closeAfterSelecting="true"
        showArrowIcon="true"
        showTickIcon="true"
        zIndex = '100'
      >
        <DropDownPicker
          style={styles.dropdownpicker}
          open={dropdownBoxOpen}
          setOpen={setDropdownBoxOpen}
          value={dropdownBoxValue}
          setValue={setDropdownBoxValue}
          placeholder="Job Industry *"
          items={dropdownBoxItems}
          labelStyle={styles.dropdownBoxValue}
          textStyle={styles.dropdownBoxText}
          zIndex={100}
        />
      </View>
      <View
        style={[styles.dropdownBox1, styles.dropdownFlexBox]}
        closeAfterSelecting="true"
        showArrowIcon="true"
        showTickIcon="true"
        >
        <DropDownPicker
          style={styles.dropdownpicker}
          open={dropdownBox1Open}
          setOpen={setDropdownBox1Open}
          value={dropdownBox1Value}
          setValue={setDropdownBox1Value}
          placeholder="Job Role *"
          items={dropdownBox1Items}
          labelStyle={styles.dropdownBox1Value}
          textStyle={styles.dropdownBox1Text}
          zIndex={50}
        />
      </View>
      <Text style={styles.employmentDetails}>Employment Details</Text>
      <Text style={styles.userInformation}>User Information</Text>
      <Text style={[styles.doYouKnow, styles.youTypo]} numberOfLines={1}>
        Do you know your credit score?
      </Text>
      <View
        style={[styles.wrapper, styles.wrapperLayout]}
        value={groupRadioValue}
        onValueChange={setGroupRadioValue}
      >
        <RadioButton.Group
          value={groupRadioValue}
          onValueChange={setGroupRadioValue}
        >
          <View style={styles.view2}>
            {creditScoreVisible && (
              <TextInput
                style={styles.inputCreditScore}
                label="Credit Score"
                mode="outlined"
                placeholderTextColor="#090a0a"
                theme={{
                  fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
                  colors: { text: "#090a0a" },
                }}
              />
            )}
            <RadioButton
              color="#9961A8"
              uncheckedColor="#6750a4"
              value="Yes"
              status={groupRadioValue === "Yes" ? "checked" : "unchecked"}
              onValueChange={() => {
                setGroupRadioValue("Yes");
                setCreditScoreVisible(true);
              }}
            />
            <Text>Yes</Text>
          </View>
          <View style={styles.view2}>
            <RadioButton
              color="#9961A8"
              uncheckedColor="#6750a4"
              value="No"
              status={groupRadioValue === "No" ? "checked" : "unchecked"}
             
            />
            <Text>No</Text>
          </View>
        </RadioButton.Group>
      </View>

      <Text style={[styles.doYouKnow1, styles.youTypo]} numberOfLines={1}>
        Do you know your net worth?
      </Text>
      <View
        style={[styles.container, styles.wrapperLayout]}
        value={groupRadio1Value}
        onValueChange={setGroupRadio1Value}
      >
        <RadioButton.Group
          value={groupRadio1Value}
          onValueChange={setGroupRadio1Value}
        >
          <View style={styles.view2}>
            {netWorthVisible && (
              <TextInput
                style={styles.inputNetWorth}
                label="Net Worth"
                mode="outlined"
                placeholderTextColor="#090a0a"
                theme={{
                  fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
                  colors: { text: "#090a0a" },
                }}
              />
            )}
            <RadioButton
              color="#9961A8"
              uncheckedColor="#6750a4"
              value="Yes"
              status={groupRadio1Value === "Yes" ? "checked" : "unchecked"}
              onSelect={() => {
                setGroupRadio1Value("Yes");
                setNetWorthVisible(true);
              }}
            />
            <Text>Yes</Text>
          </View>
          <View style={styles.view2}>
            <RadioButton
              color="#9961A8"
              uncheckedColor="#6750a4"
              value="No"
              status={groupRadio1Value === "No" ? "checked" : "unchecked"}
              
            />
            <Text>No</Text>
          </View>
        </RadioButton.Group>
      </View>

      <StatusBar/>
      
      <View style={styles.choosingDateParent}>
        <RNKDatepicker
          style={styles.choosingDate}
          placeholder={() => (
            <Text style={styles.choosingDateDatePickerPlaceHolder}>
              DD/MM/YYYY
            </Text>
          )}
          date={selectedDate}
          onSelect={setSelectedDate}
          controlStyle={styles.choosingDateDatePickerValue}
          max={currentDate}
          min={new Date(1800, 0, 1)}
        />
        <Text style={[styles.dateOfBirth, styles.youTypo]} numberOfLines={1}>
          Date of Birth
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  submitButtonBtn: {
    color: "#f4f6f6",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  submitButtonBtn1: {
    borderRadius: 48,
    height: 50,
  },
  dropdownBoxValue: {
    color: "#313144",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  dropdownBoxText: {
    color: "#313144",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  dropdownBox1Value: {
    backgroundColor: "ffffff",
    color: "#313144",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  dropdownBox1Text: {
    color: "#313144",
    fontSize: 12,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  groupRadioText: {},
  view: {},
  groupRadio1Text: {},
  view1: {},
  choosingDateDatePickerPlaceHolder: {
    fontFamily: "Roboto",
    color: "#101010",
    fontSize: 14,
  },
  choosingDateDatePickerValue: {
    borderColor: Color.colorBlack,
    backgroundColor: "#ffffff",
    position: "absolute",
    left: "0.92%",
    top: "41.5%",
    right: "18.43%",
    bottom: "-2.5%",
    width: "155%",
    height: "65%",
  },
  dropdownFlexBox: {
    justifyContent: "center",
    height: 48,
    left: 46,
    alignItems: "center",
    position: "absolute",
    zIndex: 10,
  },
  youTypo: {
    height: 18,
    width: 250,
    fontFamily: FontFamily.regularNoneMedium,
    lineHeight: 16,
    fontSize: 16,
    left: "50%",
    top: "45%",
    textAlign: "left",
    color: Color.indigoDye,
    fontWeight: "700",
    position: "absolute",
    zIndex: 1,
  },
  wrapperLayout: {
    height: 19,
    width: 119,
    left: 47,
    position: "absolute",
    zIndex: 1,
  },
  byRegisteringWithFinsight: {
    fontSize: FontSize.size_sm,
    lineHeight: 16,
    color: Color.colorBlack,
    textAlign: "center",
    fontFamily: FontFamily.roboto,
  },
  byRegisteringWithContainer: {
    left: 18,
    top: 752,
    position: "absolute",
  },
  userInfoInputPageChild: {
    top: 719,
    left: 68,
    width: 237,
    height: 16,
    position: "absolute",
  },
  submitButton: {
    backgroundColor: Color.viridian,
    top: 647,
    right: 100,
    left: 98,
    position: "absolute",
  },
  dropdownpicker: {
    zIndex: 100,
  },
  dropdownBox: {
    top: 210,
    width: 281,
  },
  dropdownBox1: {
    top: 280,
    width: 280,
  },
  employmentDetails: {
    top: 175,
    fontSize: FontSize.regularNoneMedium_size,
    textAlign: "left",
    color: Color.indigoDye,
    fontWeight: "700",
    lineHeight: 20,
    left: 46,
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  userInformation: {
    top: 40,
    left: 95,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    color: Color.colorBlack,
    lineHeight: 44,
    textAlign: "center",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  doYouKnow: {
    marginTop: 12,
    marginLeft: -140.5,
    height: 12,
    width: 217,
    fontFamily: FontFamily.regularNoneMedium,
    lineHeight: 12,
    fontSize: FontSize.size_xs,
    left: "50%",
    top: "50%",
  },
  view2: {
    flexDirection: "row",
    alignItems: "center",
  },
  wrapper: {
    top: 400,
  },
  doYouKnow1: {
    marginTop: 137,
    marginLeft: -141.5,
    height: 12,
    width: 217,
    fontFamily: FontFamily.regularNoneMedium,
    lineHeight: 12,
    fontSize: FontSize.size_xs,
    left: "50%",
    top: "60%",
  },
  container: {
    top: 520,
  },
  statusBarLight: {
    top: 0,
    left: 0,
    width: 375,
    height: 45,
    position: "absolute",
  },
  inputCreditScore: {
    backgroundColor: "#ffffff",
    borderColor: Color.colorBlack,
    top: 270,
    right: 49,
    borderRadius: Border.br_5xs,
    left: 47,
    height: 48,
    position: "absolute",
  },
  inputNetWorth: {
    backgroundColor: "#ffffff",
    borderColor: Color.colorBlack,
    top: 570,
    right: 49,
    borderRadius: Border.br_5xs,
    left: 47,
    height: 48,
    position: "absolute",
  },
  choosingDate: {
    left: "-0.92%",
    top: "38.5%",
    right: "20.43%",
    bottom: "-2.5%",
    width: "82.49%",
    height: "65%",
    position: "absolute",
  },
  dateOfBirth: {
    marginTop: -29,
    marginLeft: -108.5,
  },
  choosingDateParent: {
    height: "9.85%",
    width: "57.87%",
    top: "11.19%",
    right: "30.6%",
    bottom: "77.96%",
    left: "12.53%",
    position: "absolute",
  },
  userInfoInputPage: {
    backgroundColor: Color.colorWhitesmoke_200,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default UserInfoInputPage;