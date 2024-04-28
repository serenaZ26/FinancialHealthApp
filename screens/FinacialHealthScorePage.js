import * as React from "react";
import { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Pressable, ScrollView, SafeAreaView, useWindowDimensions } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Border, FontSize, Color, Padding } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import { PieChart } from 'react-native-chart-kit'
import { FIRESTORE_DB } from "../firebaseConfig";
import { getDoc, getDocs, doc, collection, query, where } from "firebase/firestore";
import { FIREBASE_AUTH } from "../firebaseConfig";

const FinacialHealthScorePage = () => {
  const navigation = useNavigation();
  const {width: screenWidth} = useWindowDimensions();
  const [creditScore, setCredit] = useState("....");
  const [emergFund, setEmergFund] = useState("....");
  const [income, setIncome] = useState("....");
  const [savings, setSavings] = useState("...");
  const [netWorth, setNetWorth] = useState("...");
  const [paymentPlans, setPaymentPlans] = useState("....");
  const [debtToIncomeRatio, setDebtToIncomeRatio] = useState("....");
  const [leisure, setLeisure] = useState(0);
  const [essentials, setEssentials] = useState(0);
  const [unplanned, setUnplanned] = useState(0);

  const data = [
    {name: 'Essentials', population: essentials, color: Color.colorMediumpurple,  legendFontSize: 12},
    {name: 'Leisure', population: leisure, color: Color.colorWhitesmoke_300},
    {name: 'Unplanned', population: unplanned, color: Color.indigoDye },
  ];

  const chartConfig = {
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 10,
      },
    };
  
    useEffect(() => {
      const userId = FIREBASE_AUTH.currentUser.uid;
      const db = FIRESTORE_DB;
  
      const fetchData = async () => {
        if (userId) {
          const userDocRef = doc(db, 'Health_Score', userId); 
          try {
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setCredit(userDoc.data().creditScore); 
            setEmergFund(userDoc.data().emergencyFunds);
            setDebtToIncomeRatio(userDoc.data().debtToIncomeRatio); 
            setNetWorth(userDoc.data().netWorth); 
            setSavings(userDoc.data().savings);
          } else {
            console.log("User document not found.");
          }
        } catch(error) {
          console.error("Error fetching user data:", error);
        }
      };}  
      fetchData();
    }, []); 


    //For monthly expenses
    useEffect(() => {
      const userId = FIREBASE_AUTH.currentUser.uid;
      const db = FIRESTORE_DB;

      const fetchData = async () => {
        const expensesCollection = collection(db, "Expense_Type");
    
        // Filter expenses based on the current user's ID
        const l = query(expensesCollection, where('uid', '==', userId), where('category', '==', 'Leisure'));
        const lSnapshot = await getDocs(l);

        let totalL =  0; 

        lSnapshot.forEach((expenseDoc) => {
          const amount = parseInt(expenseDoc.data().amount);
          totalL += amount;
        });

        console.log(totalL);

        const e = query(expensesCollection, where('uid', '==', userId), where('category', '==', 'Essential'));
        const eSnapshot = await getDocs(e);

        let totalE =  0; 
        eSnapshot.forEach((expenseDoc) => {
          const amount = parseInt(expenseDoc.data().amount);
          totalE += amount;
        })
        console.log(totalE);

        const u = query(expensesCollection, where('uid', '==', userId), where('category', '==', 'Unplanned'));
        const uSnapshot = await getDocs(u);

        let totalU =  0; 
        uSnapshot.forEach((expenseDoc) => {
          const amount = parseInt(expenseDoc.data().amount);
          totalU += amount;
        });
        
        console.log(totalU);

        const totalExpenses = totalE + totalL + totalU;

        if(totalExpenses == 0){
          setLeisure(0);
          setEssentials(0);
          setUnplanned(0);

        }else{
          const lP = Math.round((totalL / totalExpenses) * 100);
          const eP = Math.round((totalE / totalExpenses) * 100);
          const uP = Math.round((totalU / totalExpenses) * 100);

          // Update state with percentages
          setLeisure(lP);
          setEssentials(eP);
          setUnplanned(uP);
        }

      };     
      fetchData();
    }, []); 

    
  return (
    <ScrollView>
    <View
      style={[styles.finacialHealthScorePage, styles.whhinfographicIconLayout]}
    >
      <Text style={styles.financialHealthScore} numberOfLines={1}>
        Financial Health Score
      </Text>
      <View style={[styles.groupParent, styles.parentLayout]}>
        <View style={[styles.frameParent, styles.parentLayout]}>
          <View style={[styles.frameGroup, styles.parentFrameShadowBox]}>
            <View style={styles.debtToIncomeRatioParent}>
              <Text style={[styles.debtToIncomeRatio, styles.text4Typo]}>
                Debt-to-income Ratio
              </Text>
              <Text style={styles.updated10Jan}>
                Weightage: 30%
              </Text>
            </View>
            <Image
              style={styles.frameChildLayout1}
              contentFit="cover"
              source={require("../assets/rectangle-9.png")}
            />
            <Text style={[styles.text, styles.textTypo1]}>{debtToIncomeRatio}</Text> 
            <Image
              style={[styles.iconScales, styles.iconLayout2]}
              contentFit="cover"
              source={require("../assets/-icon-scales.png")}
            />
          </View>
          <View style={[styles.frameContainer, styles.factorsUsedToPosition]}>
            <View style={styles.frameItem} />
            <Text style={styles.text1}>{creditScore}</Text>
            <View style={styles.debtToIncomeRatioParent}>
              <Text
                style={[styles.debtToIncomeRatio, styles.text4Typo]}
              >Credit Score </Text>
              
              <Text style={styles.updated10Jan}>
                Weightage: 30%
              </Text>
            </View>
            <Image
              style={styles.bxsCoffee1Icon}
              contentFit="cover"
              source={require("../assets/bxscoffee-1.png")}
            />
            <View style={styles.frameInner} />
          </View>
        </View>
        <Text
          style={[styles.factorsUsedTo, styles.factorsUsedToPosition]}
          numberOfLines={2}
        >
          Factors used to calculate financial health score (in AED):
        </Text>
      </View>
      <View style={[styles.parent, styles.parentFrameShadowBox]}>
        <Text style={[styles.text2, styles.textTypoLong]}>{netWorth}</Text>
        <View style={styles.debtToIncomeRatioParent}>
          <Text style={[styles.debtToIncomeRatio, styles.text4Typo]}>
            Net Worth
          </Text>
          <Text style={styles.updated10Jan}>
            Weightage: 10%
          </Text>
        </View>
        <View style={styles.bxsCoffee1Icon} />
        <Image
          style={[ styles.frameChildLayout1]}
          contentFit="cover"
          source={require("../assets/rectangle-91.png")}
        />
        <Image
          style={[styles.iconCoins, styles.iconLayout2]}
          contentFit="cover"
          source={require("../assets/-icon-coins.png")}
        />
      </View>
      <View style={[styles.frameParent2, styles.cardPosition]}>
        <View style={styles.frameItem} />
        <Text
          style={[styles.text3, styles.textTypo]}
          numberOfLines={1}
        >{emergFund} </Text>
        <View style={styles.debtToIncomeRatioParent}>
          <Text style={[styles.debtToIncomeRatio, styles.text4Typo]}>
            Emergency Funds
          </Text>
          <Text style={[styles.updated10Jan, styles.updated10JanTypo]}>
            Weightage: 15%
          </Text>
        </View>
        <View style={styles.bxsCoffee1Icon} />
        <Image
          style={[styles.frameChildLayout1]}
          contentFit="cover"
          source={require("../assets/rectangle-92.png")}
        />
        <Image
        style={[styles.bxsCoffee1Icon]}
        contentFit="cover"
        source={require("../assets/-icon-emergency-siren.png")}
      />
      </View>
      <View style={[styles.frameContainer, styles.savingPosition]}>
        <View style={styles.frameItem} />
          <Text style={styles.text1}>{savings}</Text>
          <View style={styles.debtToIncomeRatioParent}>
            <Text
              style={[styles.debtToIncomeRatio, styles.text4Typo]}
            >Savings Rate </Text>
              <Text style={styles.updated10Jan}>
                Weightage: 15%
              </Text>
          </View>
            <Image
              style={styles.bxsCoffee1Icon}
              contentFit="cover"
              source={require("../assets/image.png")}
            />
          <View style={styles.frameInner} />
        </View>

      <View style={[styles.card, styles.cardPosition]}>
          <Text style={[styles.chartHeading, styles.germanyTypo]}>
            Expenses Categories
          </Text>
          <PieChart
                data={data}
                width={screenWidth}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor={"transparent"}
                paddingLeft={"-35"}
                center={[35, -1]}
                absolute
            />
      </View>

      <StatusBar/>

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
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  parentLayout: {
    width: 298,
    position: "absolute",
  },
  parentFrameShadowBox: {
    height: 79,
    width: 297,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(74, 85, 104, 0.07)",
  },
  text4Typo: {
    textAlign: "left",
    fontFamily: FontFamily.roboto,
  },
  frameChildLayout1: {
    opacity: 0.25,
    height: 65,
    width: 65,
    borderRadius: Border.br_lg,
    left: 6,
    top: 7,
    position: "absolute",
  },
  textTypo1: {
    lineHeight: 24,
    textAlign: "left",
    fontFamily: FontFamily.roboto,
  },
  iconLayout2: {
    maxHeight: "100%",
    maxWidth: "100%",
  },
  factorsUsedToPosition: {
    top: -10,
    position: "absolute",
  },
  savingPosition:{
    top: 550,
    left: 37,
    position: "absolute",
  },
  textTypoLong:{
    left: 175,
    textAlign: "right",
    top: 25,
    fontFamily: FontFamily.roboto,
    fontWeight: "800",
    lineHeight: 35,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  textTypo: {
    left: 200,
    textAlign: "right",
    top: 27,
    fontFamily: FontFamily.roboto,
    fontWeight: "800",
    lineHeight: 35,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  cardPosition: {
    left: 37,
    backgroundColor: Color.neutralColorsWhite,
    borderRadius: Border.br_xl,
    position: "absolute",
    overflow: "hidden",
  },
  cardSpaceBlock: {
    padding: Padding.p_6xl,
    alignSelf: "stretch",
    overflow: "hidden",
  },
  germanyTypo: {
    color: Color.colorBlack,
    fontWeight: "600",
    marginLeft: 20,
    top: 10,
    textAlign: "left",
    fontFamily: FontFamily.regularNoneMedium,
  },
  vectorParentPosition: {
    top: 1,
    position: "absolute",
  },
  parentFlexBox: {
    justifyContent: "space-between",
    display: "none",
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
  },
  frameChildLayout: {
    width: 20,
    borderRadius: Border.br_9xs,
    height: 20,
    overflow: "hidden",
  },
  frameParentSpaceBlock: {
    paddingVertical: Padding.p_12xs,
    paddingHorizontal: 0,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  iconLayout1: {
    height: 13,
    marginLeft: 10,
  },
  iconLayout: {
    height: 11,
    marginLeft: 10,
  },
 
  financialHealthScore: {
    top: 45,
    left: 62,
    textAlign: "center",
    color: Color.black01,
    fontFamily: FontFamily.roboto,
    fontWeight: "800",
    lineHeight: 30,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  debtToIncomeRatio: {
    color: Color.grey900,
    fontWeight: "600",
    fontSize: FontSize.size_sm,
    lineHeight: 20,
    textAlign: "left",
  },
  updated10Jan: {
    fontSize: FontSize.size_3xs,
    marginTop: 6,
    color: Color.grey900,
  },
  debtToIncomeRatioParent: {
    top: 15,
    left: 84,
    position: "absolute",
  },
  text: {
    top: 35,
    left: 218,
    color: Color.indigoDye,
    display: "flex",
    width: 70,
    height: 35,
    alignItems: "center",
    fontWeight: "800",
    fontSize: FontSize.size_5xl,
    lineHeight: 24,
    position: "absolute",
  },
  iconScales: {
    right: "81.25%",
    left: "7.74%",
    bottom: "26.58%",
    top: "27.85%",
    width: "11.01%",
    height: "45.57%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  frameGroup: {
    top: 90,
    backgroundColor: Color.neutralColorsWhite,
    borderRadius: Border.br_xl,
    width: 297,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(74, 85, 104, 0.07)",
    overflow: "hidden",
    left: 1,
    position: "absolute",
  },
  frameItem: {
    top: 17,
    left: 224,
    alignItems: "flex-end",
    position: "absolute",
  },
  text1: {
    left: 215,
    color: Color.viridian,
    textAlign: "right",
    top: 27,
    fontFamily: FontFamily.roboto,
    fontWeight: "800",
    lineHeight: 25,
    fontSize: FontSize.size_5xl,
    position: "absolute",
  },
  bxsCoffee1Icon: {
    top: 24,
    left: 22,
    width: 32,
    height: 30,
    position: "absolute",
    overflow: "hidden",
  },
  
  frameInner: {
    left: 5,
    backgroundColor: "rgba(66, 136, 124, 0.4)",
    opacity: 0.35,
    height: 65,
    width: 65,
    borderRadius: Border.br_lg,
    top: 7,
    position: "absolute",
  },
  frameContainer: {
    height: 79,
    width: 297,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(74, 85, 104, 0.07)",
    backgroundColor: Color.neutralColorsWhite,
    borderRadius: Border.br_xl,
    overflow: "hidden",
    left: 0,
  },
  frameSaving:{
    height: 79,
    width: 297,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(74, 85, 104, 0.07)",
    backgroundColor: Color.neutralColorsWhite,
    borderRadius: Border.br_xl,
    overflow: "hidden",
    left: 0,
  },
  frameParent: {
    top: 60,
    height: 169,
    left: 0,
  },
  factorsUsedTo: {
    left: 10,
    width: 221,
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.regularNoneMedium,
    lineHeight: 24,
    textAlign: "left",
    fontWeight: "600",
    color: Color.black01,
  },
  groupParent: {
    top: 102,
    left: 39,
    height: 236,
  },
  text2: {
    color: Color.colorMediumpurple,
  },
  rectangleIcon: {
    left: 7,
  },
  iconCoins: {
    right: "82.26%",
    left: "6.73%",
    bottom: "26.58%",
    top: "27.85%",
    width: "11.5%",
    height: "46.57%",
    maxHeight: "100%",
    position: "absolute",
  },
  parent: {
    top: 353,
    left: 40,
    backgroundColor: Color.neutralColorsWhite,
    borderRadius: Border.br_xl,
    width: 297,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(74, 85, 104, 0.07)",
    overflow: "hidden",
    position: "absolute",
  },
  text3: {
    color: Color.mikadoYellow,
  },
  frameParent2: {
    top: 453,
    height: 79,
    width: 297,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(74, 85, 104, 0.07)",
  },
  frameSaving:{
    top: 453,
    height: 79,
    width: 297,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowColor: "rgba(74, 85, 104, 0.07)",
  },
  chartHeading: {
    fontFamily: FontFamily.regularNoneMedium,
    fontSize: FontSize.size_lgi,
    lineHeight: 28,
    width: 276,
    marginLeft: 10,
    letterSpacing: -0.4,
  },
  heading: {
    width: 310,
    flexDirection: "row",
  },
  text4: {
    fontSize: FontSize.size_2xs,
    letterSpacing: -0.2,
    color: Color.colorDarkblue_100,
    marginLeft: 3,
  },
  card: {
    top: 650,
    width: 300,
    height: 240,
  },
  frameParent17: {
    width: 144,
    height: 91,
    marginTop: 10,
  },
  iconEmergencySiren: {
    height: "20.43%",
    width: "15.33%",
    top: "60.37%",
    right: "74.67%",
    bottom: "37.19%",
    left: "16%",
    position: "absolute",
    overflow: "hidden",
  },
  statusBarLight: {
    width: 375,
    height: 45,
    left: 1,
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
  finacialHealthScorePage: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 950,
    overflow: "hidden",
  },
});

export default FinacialHealthScorePage;
