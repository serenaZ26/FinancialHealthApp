import * as React from "react";
import { useState } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  ImageBackground,
  View,
  Linking,
} from "react-native";
import { Image } from "expo-image";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Border, FontSize, FontFamily, Color } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { color } from "react-native-reanimated";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"


const AccountCreationPage = () => {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const auth = FIREBASE_AUTH;

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
 };

  const signUp = async () => {
    try {
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return; 
      }

      const response = await createUserWithEmailAndPassword(auth, email, password);
      const userId = response.user.uid;

      const userRef = doc(FIRESTORE_DB, "Users", userId);
      await setDoc(userRef, {
        name, 
        email,
        password,
      })
      
      console.log(response);
      navigation.navigate("BottomTabsRoot", {
        screen: "UserInfoInputPage",
      })
    } catch (error) {
      console.log(error);
      alert('Sign up failed: ' + error.message);
    }
  }

  return (
    <View style={styles.accountCreationPage}>
      <Pressable
        style={styles.byRegisteringWithContainer}
        numberOfLines={1}
        onPress={() => Linking.openURL("https://www.unitechfinsight.com")}
      >
        <Text
          style={styles.byRegisteringWithFinsight}
        >{`By registering with FinSight, you agree with the T&Cs`}</Text>
      </Pressable>

      <Image
        style={styles.accountCreationPageChild}
        contentFit="cover"
        source={require("../assets/group-37.png")}
      />
      <ImageBackground
        style={styles.finsightIcon}
        contentFit="cover"
        source={require("../assets/finsighticon.png")}
      />
      <TextInput
        style={[styles.inputEmailAdress, styles.inputPosition]}
        label="Name *"
        mode="outlined"
        placeholderTextColor="#090a0a"
        theme={{
          fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={name}
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={[styles.inputEmailAdress1, styles.inputPosition]}
        label="Email Address *"
        mode="outlined"
        placeholderTextColor="#090a0a"
        theme={{
          fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        style={[styles.inputPassword, styles.inputPosition]}
        label="Password *"
        mode="outlined"
        placeholderTextColor="#090a0a"
        theme={{
          fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      
      <Button
        style={styles.registerButton}
        mode="contained"
        labelStyle={styles.registerButtonBtn}
        onPress={async () => {
          try {
             await signUp(); // Call your signUp function and wait for it to complete
             navigation.navigate("UserInfoInputPage");
          } catch (error) {
              // Handle any errors that might occur during signup
              console.error("Signup Error: ", error); 
          }
      }}
        contentStyle={styles.registerButtonBtn1}
      >
        Register
      </Button>

      <StatusBar />
    </View>
  );
};

const styles = StyleSheet.create({
  registerButtonBtn: {
    color: "#f4f6f6",
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  registerButtonBtn1: {
    borderRadius: 48,
    height: 50,
  },
  inputPosition: {
    height: 48,
    borderRadius: Border.br_5xs,
    left: 47,
    right: 48,
    position: "absolute",
  },
  byRegisteringWithFinsight: {
    fontSize: FontSize.size_sm,
    lineHeight: 16,
    fontFamily: FontFamily.roboto,
    color: Color.colorBlack,
    textAlign: "center",
  },
  byRegisteringWithContainer: {
    left: 20,
    top: 655,
    position: "absolute",
  },
  accountCreationPageChild: {
    top: 625,
    left: 68,
    width: 237,
    height: 16,
    position: "absolute",
  },
  finsightIcon: {
    top: 57,
    left: 142,
    width: 91,
    height: 134,
    position: "absolute",
  },
  inputEmailAdress: {
    top: 256,
  },
  inputEmailAdress1: {
    top: 340,
  },
  inputPassword: {
    top: 424,
  },
  registerButton: {
    backgroundColor: Color.viridian,
    top: 550,
    right: 100,
    left: 98,
    position: "absolute",
  },
  statusBarLight: {
    top: 0,
    left: -1,
    width: 375,
    height: 45,
    position: "absolute",
  },
  accountCreationPage: {
    backgroundColor: Color.colorWhitesmoke_200,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});

export default AccountCreationPage;
