import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Pressable } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, Border, FontSize } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { FIRESTORE_DB } from "../firebaseConfig";
import { getDoc, doc, updateDoc} from "firebase/firestore";
import { FIREBASE_AUTH } from "../firebaseConfig";
import SemiCircleProgressBar from 'semi-circle-progress-bar';
import { collection, query, where, getDocs } from "firebase/firestore";

const FinancialHealthScoreOvervie = () => {
  const navigation = useNavigation();
  const [creditScore, setCreditScore] = useState("");
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState("");
  const [emergencyFunds, setEmergencyFunds] = useState("");
  const [income, setIncome] = useState("");
  const [netWorth, setNetWorth] = useState("");
  const [healthScore, setHealthScore] = useState(0); 
  const [paymentPlans, setPaymentPlans] = useState("");
  const [savingsRate, setSavingsRate] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-AE');

  useEffect(() => {
    const userId = FIREBASE_AUTH.currentUser.uid;
    const db = FIRESTORE_DB;

    const fetchData = async () => {
      if (userId) {
        const userDocRef = doc(db, "Health_Score", userId);

        try {
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setCreditScore(userData.creditScore || 0);
            setEmergencyFunds(userData.emergencyFunds || 0);
            setIncome(userData.income || 0);
            setNetWorth(userData.netWorth || 0);
            console.log(" ");

            // Calculate debt-to-income ratio
            const calculatedDTI =
              (userData.paymentPlans || 0) / (userData.income || 1);
            setDebtToIncomeRatio(calculatedDTI);

            // Update Firestore with the calculated DTI
            await updateDoc(userDocRef, {
              debtToIncomeRatio: parseFloat(calculatedDTI.toFixed(2)),
              savings: parseFloat(savingsRate.toFixed(2)),
            });
          } else {
            console.log("User document not found.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const userId = FIREBASE_AUTH.currentUser.uid;
    const db = FIRESTORE_DB;

    const fetchData = async () => {
      const expensesCollection = collection(db, "Expense_Type");
  
      // Filter expenses based on the current user's ID
      const q = query(expensesCollection, where('uid', '==', userId));
      const querySnapshot = await getDocs(q);

      let sum = 0;
      querySnapshot.forEach((expenseDoc) => {
        const amount = parseInt(expenseDoc.data().amount);
        sum += amount;
      });
      console.log("Total Expenses:", sum)
      setTotalExpenses(sum);
      const calculatedSavingsRate = calculateSavingsRate(income, totalExpenses);
      console.log("Savings Rate:", calculatedSavingsRate);
      setSavingsRate(calculatedSavingsRate);
    };     
    fetchData();
  }, [income]); 

  useEffect(() => {
    const userId = FIREBASE_AUTH.currentUser.uid;
    const db = FIRESTORE_DB;
    
    const fetchHData = async () => {
      const userDocRef = doc(db, "Health_Score", userId);
      if (
        creditScore !== 0 &&
        debtToIncomeRatio !== 0 &&
        emergencyFunds !== 0 &&
        netWorth !== 0 &&
        savingsRate !== 0
      ) {
        const hs = calculateHealthScore();
        setHealthScore(hs);
  
        await updateDoc(userDocRef, {
          healthScore: parseFloat(hs.toFixed(1)),
        });
      }
    };
  fetchHData();
  }, [creditScore, debtToIncomeRatio, emergencyFunds, netWorth, savingsRate]);

  const calculateSavingsRate = (income, totalExpenses) => {
    if (income === 0) {
      return 0; // Avoid division by zero
    }
    const savingsRate = ((income - totalExpenses) / income) * 100; // Convert to percentage
    return savingsRate.toFixed(2); // Return the result rounded to two decimal places
  };

  const calculateHealthScore = () => {
    // Factor-specific constants
    console.log(debtToIncomeRatio);
    console.log(creditScore);
    console.log(emergencyFunds);
    console.log(savingsRate);
    console.log(netWorth);
    
    const CREDIT_WEIGHTAGE = 0.3;
    const CREDIT_LOWER_BOUND = 300;
    const CREDIT_UPPER_BOUND = 900;

    const DTI_WEIGHTAGE = 0.3;
    const DTI_LOWER_BOUND = 1;
    const DTI_UPPER_BOUND = 0.01;

    const EMERGENCY_WEIGHTAGE = 0.15;
    const EMERGENCY_LOWER_BOUND = 500000;
    const EMERGENCY_UPPER_BOUND = 200000;

    const NW_WEIGHTAGE = 0.1;
    const NW_LOWER_BOUND = 20000;
    const NW_UPPER_BOUND = 2000000;

    const SAVINGS_WEIGHTAGE = 0.15;
    const SAVINGS_LOWER_BOUND = 5000;
    const SAVINGS_UPPER_BOUND = 10000;

    const creditScoreFactor = calculateFactorScore(creditScore, CREDIT_LOWER_BOUND, CREDIT_UPPER_BOUND, CREDIT_WEIGHTAGE);
    const dtiFactor = calculateFactorScore(debtToIncomeRatio, DTI_LOWER_BOUND, DTI_UPPER_BOUND, DTI_WEIGHTAGE);
    const emergencyFactor = calculateFactorScore(emergencyFunds, EMERGENCY_LOWER_BOUND, EMERGENCY_UPPER_BOUND, EMERGENCY_WEIGHTAGE);
    const netWorthFactor = calculateFactorScore(netWorth, NW_LOWER_BOUND, NW_UPPER_BOUND, NW_WEIGHTAGE);
    const savingsFactor = calculateFactorScore(savingsRate, SAVINGS_LOWER_BOUND, SAVINGS_UPPER_BOUND, SAVINGS_WEIGHTAGE);

    console.log("Now printing factors:");
    console.log(dtiFactor);
    console.log(creditScoreFactor);
    console.log(emergencyFactor);
    console.log(savingsFactor);
    console.log(netWorthFactor);
    // Combine scores
    const totalHealthScore = creditScoreFactor + dtiFactor + emergencyFactor + netWorthFactor + savingsFactor;
    console.log("Now printing health score:");
    console.log("Now printing health score:");
    console.log(totalHealthScore);
    return totalHealthScore;
    
  }
  // Helper function to calculate individual factors
  const calculateFactorScore = (input, lowerBound, upperBound, weightage) => {
  const range = upperBound - lowerBound;
  const score = ((input - lowerBound) / range) * 100;
  return score * weightage;
}
  return (
    <View style={styles.financialHealthScoreOvervie}>
      <Text style={styles.financialHealthScore} numberOfLines={1}>
        Financial Health Score
      </Text>
      <View style={[styles.containerParent, styles.containerLayout]}>
        <View style={[styles.container, styles.groupShadowBox]} />
        <Text
          style={[styles.amountDescription, styles.amountTypo]}
        >{`Your financial health score is`}</Text>
        <Text style={styles.date}>Updated {formattedDate}</Text>
        <View style={{ marginTop: 65, marginLeft: 45 }}> 
        <SemiCircleProgressBar
          percentage={parseFloat(healthScore)}
          progressColor={"rgb(64, 130, 109)"}
        >
        </SemiCircleProgressBar>
        </View>
        <Text style={[styles.amount, styles.amountTypo]}>{healthScore}</Text>
      </View>
      <View style={[styles.rectangleParent, styles.groupChildLayout]}>
        <View style={[styles.groupChild, styles.groupPosition]} />
        <Image
          style={styles.groupItem}
          contentFit="cover"
          source={require("../assets/ellipse-5.png")}
        />
        <Image
          style={[styles.iconLightBulbOn, styles.iconLightBulbOnLayout]}
          contentFit="cover"
          source={require("../assets/-icon-light-bulb-on.png")}
        />
        <Text style={[styles.loremIpsumDolor, styles.loremIpsumDolorTypo]}>
          You are maintaining a good financial health score. {"\n"}Keep it up!
        </Text>
        <Text style={[styles.aboutTheFinancial, styles.aboutTypo]}>
          About 
        </Text>
      </View>
        <View style={[styles.groupParent, styles.groupLayout]}>
          <View style={[styles.groupLayout, styles.groupInner, styles.groupInnerBg, styles.rectangleGroup]} >
          <Text style={[styles.learnMoreAboutYourScoreParent, styles.learnMoreAbout, styles.learnMoreAboutTypo]}>
            Learn more about your financial health score
          </Text>
          <Pressable style={styles.groupContainer}
            onPress={() => navigation.navigate("FinacialHealthScorePage")}
          >
          <Image
            style={[styles.groupChild2, styles.groupChildLayout2]}
            contentFit="cover"
            source={require("../assets/group-345.png")}
          />
          </Pressable>
        </View>
      </View>
      <StatusBar/>
    </View>
  );
};
const styles = StyleSheet.create({
  groupChild2: {
    left: 50,
  },
  groupIconBtn: {
    backgroundColor: Color.indigoDye,
    height: 50,
    width: 65,
  },
  containerLayout: {
    height: 232,
    width: 294,
  },
  groupShadowBox: {
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  amountTypo: {
    color: Color.neutralColorsBlack,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  groupChildLayout2: {
    height: 180,
    width: 180,
    top: -55,
    position: "absolute",
  },
  groupChildLayout: {
    height: 150,
    width: 294,
    position: "absolute",
  },
  groupPosition: {
    borderRadius: Border.br_5xl,
    left: 0,
    top: 0,
  },
  iconLightBulbOnLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  loremIpsumDolorTypo: {
    textAlign: "left",
    fontFamily: FontFamily.regularNoneMedium,
    position: "absolute",
  },
  aboutTypo: {
    alignItems: "center",
    display: "flex",
    fontWeight: "600",
    fontSize: 21,
    lineHeight: 24,
  },
  groupLayout: {
    height: 110,
    width: 294,
  },
  groupInnerBg: {
    backgroundColor: Color.grey100,
    position: "absolute",
  },
  learnMoreAboutTypo: {
    width: 188,
    color: Color.indigoDye,
    textAlign: "left",
    fontFamily: FontFamily.regularNoneMedium,
  },
  financialHealthScore: {
    top: 63,
    left: 60,
    fontSize: FontSize.size_5xl,
    fontWeight: "800",
    textAlign: "center",
    fontFamily: FontFamily.roboto,
    lineHeight: 24,
    color: Color.black01,
    position: "absolute",
  },
  container: {
    borderRadius: Border.br_xl,
    backgroundColor: Color.neutralColorsWhite,
    shadowColor: "rgba(13, 10, 44, 0.08)",
    shadowRadius: 6,
    elevation: 6,
    left: 0,
    top: 0,
    position: "absolute",
    height: 232,
    width: 294,
  },
  amountDescription: {
    top: 18,
    left: 26,
    fontSize: 18,
    width: 243,
    height: 48,
    lineHeight: 24,
    fontWeight: "700",
  },
  date: {
    top: 190,
    left: 56,
    lineHeight: 16,
    color: Color.neutralColorsTextGray,
    width: 179,
    height: 30,
    fontSize: 16,
    textAlign: "center",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  maskGroupIcon: {
    top: 77,
    left: 33,
    width: 225,
    height: 113,
    position: "absolute",
  },
  amount: {
    left: 94,
    fontSize: 48,
    lineHeight: 84,
    width: 97,
    height: 64,
    top: 103,
  },
  containerParent: {
    left: 40,
    top: 103,
    position: "absolute",
  },
  groupChild: {
    backgroundColor: "rgba(255, 199, 39, 0.2)",
    height: 150,
    width: 294,
    position: "absolute",
  },
  groupItem: {
    top: 20,
    width: 37,
    height: 39,
    left: 18,
    position: "absolute",
  },
  iconLightBulbOn: {
    height: "17.6%",
    width: "6.53%",
    top: "18.2%",
    right: "84.12%",
    bottom: "64.2%",
    left: "9.35%",
  },
  loremIpsumDolor: {
    top: 50,
    left: 65,
    color: Color.black06,
    width: 182,
    fontSize: 14,
    lineHeight: 20,
    height: 100,
  },
  aboutTheFinancial: {
    top: 23,
    left: 67,
    width: 197,
    textAlign: "left",
    fontFamily: FontFamily.regularNoneMedium,
    position: "absolute",
    color: Color.black01,
    display: "flex",
    fontWeight: "600",
  },
  rectangleParent: {
    top: 365,
    left: 40,
  },
  groupInner: {
    shadowColor: "rgba(74, 85, 104, 0.07)",
    shadowRadius: 8,
    elevation: 8,
    height: 110,
    width: 294,
    borderRadius: Border.br_5xl,
    left: 0,
    top: 0,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  learnMoreAbout: {
    alignItems: "center",
    display: "flex",
    fontWeight: "600",
    fontSize: FontSize.regularNoneMedium_size,
    lineHeight: 24,
  },
  loremIpsumDolor1: {
    height: 40,
    marginTop: 6,
    fontSize: FontSize.size_smi,
    lineHeight: 20,
  },
  learnMoreAboutYourScoreParent: {
    top: 27,
    left: 27,
  },
  rectangleGroup: {
    shadowColor: "rgba(0, 0, 0, 0.25)",
    shadowRadius: 4,
    elevation: 4,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupPosition1: {
    left: 0,
    top: 0,
    position: "absolute",
  },
  chevronLeftIcon: {
    top: 13,
    left: 20,
    width: 24,
    height: 24,
    position: "absolute",
  },
  groupContainer: {
    top: 30,
    left: 100,
    width: 50,
    height: 50,
    position: "absolute",
  },
  groupParent: {
    top: 545,
    left: 38,
    position: "absolute",
  },
  statusBarLight: {
    left: 4,
    width: 375,
    height: 45,
    top: 0,
    position: "absolute",
  },
  financialHealthScoreOvervieChild: {
    height: "3.2%",
    width: "86.13%",
    top: "94.83%",
    right: "6.93%",
    bottom: "1.97%",
    left: "6.93%",
  },
  financialHealthScoreOvervie: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    width: "100%",
    height: 812,
    overflow: "hidden",
  },
});
export default FinancialHealthScoreOvervie;