import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet, View, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Border, Color } from "../GlobalStyles";
import { sendPasswordResetEmail } from "firebase/auth";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { Image } from "expo-image";
import { ImageBackground} from "react-native";

const ResetPasswordPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      Alert.alert('Password Reset', 'A password reset link has been sent to your email.');
      navigation.navigate("LoginPage");
    } catch (error) {
      Alert.alert('Password Reset Failed', error.message);
    }
  };

  return (
    <View style={styles.resetPasswordPage}>
      <Text style={styles.instructionText}>
      Please enter your email address to receive a password reset link.
      </Text>
      <TextInput
        style={[styles.inputEmailAdress, styles.inputPosition]}
        label="Email Address"
        placeholder="sample@example.com"
        mode="outlined"
        placeholderTextColor="#090a0a"
        theme={{
          fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
        value={email}
        onChangeText={setEmail}
      />
      <Button
        style={styles.loginButton}
        disabled={false}
        uppercase={false}
        mode="contained"
        labelStyle={styles.loginButtonBtn}
        onPress={handleResetPassword}
        contentStyle={styles.loginButtonBtn1}
      >{`Reset `}</Button>
      <ImageBackground
      style={styles.finsightIcon}
      resizeMode="cover"
      source={require("../assets/finsighticon.png")}
    />
    </View>
    
  );
};

const styles = StyleSheet.create({
  resetPasswordPage: {
    backgroundColor: Color.colorWhitesmoke_200,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  instructionText: {
    fontSize: 16,
    marginBottom: 20,
    color: Color.black01,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  inputEmailAdress: {
    width: "80%",
    marginBottom: 20,
  },
  loginButton: {
    width: "80%",
  },
  finsightIcon: {
    top: 57,
    left: 142,
    width: 91,
    height: 134,
    position: "absolute",
  },
  loginButtonBtn: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  loginButtonBtn1: {
    backgroundColor: Color.viridian,
    borderRadius: 48,
    height: 50,
  },
});

export default ResetPasswordPage;
