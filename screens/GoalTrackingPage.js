import * as React from "react";
import { useState, useEffect, useMemo, memo } from "react";
import { Image } from "expo-image";
import { Modal, TextInput, Button, StyleSheet, Text, View, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, FontFamily, FontSize, Border } from "../GlobalStyles";
import { StatusBar } from "expo-status-bar";
import Svg, { Circle } from 'react-native-svg';
import { FIRESTORE_DB } from "../firebaseConfig";
import { FIREBASE_AUTH } from "../firebaseConfig";
import { getDoc, doc, collection, query, orderBy, limit, where, updateDoc, getDocs } from "firebase/firestore";

const GoalTrackingPage = ({route}) => {
  const navigation = useNavigation();
  
  const db = FIRESTORE_DB;
  const userId = FIREBASE_AUTH.currentUser.uid;
  
  const [cAmount, setCAmount] = useState(0);
  const [tAmount, setTAmount] = useState(0);
  const [gName, setName] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [inputAmount, setInputAmount] = useState(''); 
  const [startDate, setStartDate] = useState(''); 

  const [p, setP] = useState(0);
  const {name} = route.params;

  const BACKGROUND_STROKE_COLOR = Color.colorWhitesmoke_300;
  const STROKE_COLOR = Color.viridian;

  const CIRCLE_LENGTH = 450;
  const R = CIRCLE_LENGTH /(2 * Math.PI);

  useEffect(() => {
    const fetchGoal = async () => {
      try {
      const goalsRef = collection(db, 'Goals');
      const goalsQuery = query(goalsRef, where('uid', '==', userId), where('name', '==', name));
      const querySnapshot = await getDocs(goalsQuery);

      if (!querySnapshot.empty) {
        const goalData = querySnapshot.docs[0].data();
        const c = parseInt(goalData.currentAmount);
        const t = parseInt(goalData.totalAmount);
        const gP = Math.round((c / parseInt(goalData.totalAmount)) * 100);
        const sDate = goalData.startDate.toDate();
        const sDte = sDate.toISOString().split('T')[0];
        setStartDate(sDte);
        
        console.log("Percentage Calculated:", gP);
        setTAmount(goalData.totalAmount);
        setCAmount(c);
        setName(goalData.name);
        setP(gP);
        } else {
          console.log("User document not found.");
        }
      } catch (error) {
        console.error('Error fetching goal data:', error);
    }
    };
    fetchGoal();
  }, [name, userId])

  const strokeDasharray = useMemo(() => {
    return `${(CIRCLE_LENGTH * p) / 100} ${CIRCLE_LENGTH}`;
  }, [p, CIRCLE_LENGTH]);

  console.log('Percentage at the end',p);

  const AddMoneyPopup = () => {
    const [amount, setAmount] = useState('');
  
    const handleAddMoney = async () => {
      const newCurrentAmount = cAmount + parseInt(amount);

      try {
        const goalsRef = collection(db, 'Goals');
        const goalsQuery = query(goalsRef, where('uid', '==', userId), where('name', '==', name),limit(1));
        const docSnapshot = await getDocs(goalsQuery);

        if (docSnapshot.empty) {
          throw new Error('Goal not found.');
        }

        const goalRef = docSnapshot.docs[0].ref;
        await updateDoc(goalRef, { currentAmount: newCurrentAmount });
       
        setCAmount(newCurrentAmount);
        const newP = Math.round((newCurrentAmount / tAmount) * 100);
        setP(newP);
        setIsPopupVisible(false); // Close popup after adding
        setAmount(''); // Reset input
      } catch (error) {
        console.error('Error updating Firestore:', error);
        // Handle the error (e.g., display an error message)
      }
    };
  
    const handleClosePopup = () => {
      setIsPopupVisible(false);
      setAmount(''); 
    };
    return (
      <Modal visible={isPopupVisible} animationType="fade" transparent={true}>
        <View style={styles.popupContainer}>
          <View style={styles.popupContent}>
            <Text style={styles.popupTitle}>Add Money</Text>
            <TextInput
              style={styles.amountInput}
              onChangeText={setAmount}
              value={amount}
              placeholder="Enter Amount"
              keyboardType="numeric"
            />
            <Pressable style={styles.addButton} onPress={handleAddMoney}>
              <Text style={styles.addButtonText}>Add</Text>
            </Pressable>
            <Pressable style={styles.closeButton} onPress={handleClosePopup}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.goalTrackingPage}>
      <View style={[styles.groupParent, styles.groupLayout1]}>
        <View style={[styles.groupContainer, styles.groupShadowBox]}>
          <Image
            style={[styles.groupChild, styles.parentPosition]}
            contentFit="cover"
            source={require("../assets/group-421.png")}
          />
          <View style={styles.wrapper}>
            <Text style={[styles.text, styles.textTypo]}>/ {tAmount}</Text>
          </View>
        </View>
        <Text style={[styles.since01Jan, styles.textTypo]}>
          Since {startDate}
        </Text>
        <Text
          style={[styles.totalSaved, styles.text1Clr]}
        >{`Total Saved `}</Text>
        <View style={styles.container}>
          <Text style={[styles.text1, styles.text1Clr]}>{cAmount}</Text>
        </View>
      </View>
      <View style={[styles.groupView, styles.groupViewLayout]}>
        <View style={[styles.rectangleParent, styles.groupViewLayout]}>
          <View style={styles.groupItem} />
          <View style={[styles.groupWrapper, styles.groupParentLayout]}>
            <View style={[styles.groupFrame, styles.groupParentLayout]}>
              <View style={[styles.ellipseParent, styles.groupParentLayout]}>
              <Svg style={{position: 'absolute'}}>
                <Circle
                  cx={250 / 2}
                  cy={370 / 2}
                  r={R}
                  stroke={BACKGROUND_STROKE_COLOR}
                  strokeWidth={30}
                />
                <Circle
                  cx={250 / 2}
                  cy={370 / 2}
                  r={R}
                  fill={'white'}
                  stroke={STROKE_COLOR}
                  strokeWidth={15}
                  strokeDasharray={strokeDasharray}
                  strokeLinecap={'round'}
                />
              </Svg>
              </View>
              <Text style={[styles.text2, styles.text2Typo]}> {p}%</Text>
            </View>
          </View>
        </View>
        <Text
          style={[styles.youHaveReached, styles.text1Clr]}
        >{`You have Reached  `}</Text>
      </View>
      <Text style={[styles.carSaving, styles.text2Typo]}> {gName} Saving</Text>
      <View style={[styles.groupParent1, styles.groupParentLayout]}>
        <View style={[styles.rectangleWrapper, styles.rectangleShadowBox]}>
          <View style={styles.groupChild1ShadowBox} />
        </View>
        <Text
          style={[styles.addMoney, styles.addMoneyTypo]}
          onPress={() => setIsPopupVisible(true)} // Open the popup
        >{`Add Money `}</Text>
        <Pressable
          style={[styles.frame, styles.frameLayout]}
        >
          <Image
            style={styles.icon}
            contentFit="cover"
            source={require("../assets/group-345.png")}
          />
        </Pressable>
        <View
          style={[styles.loremIpsumDolorSitAmetCoWrapper, styles.loremPosition]}
        >
          <Text style={[styles.loremIpsumDolor, styles.text1Clr]}>
          Invest in your goal today
          </Text>
        </View>

        
      </View>
      <StatusBar/>
      <Pressable
        style={[styles.arrowDown]}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={[styles.arrowDownChild]}
          contentFit="cover"
          source={require("../assets/group-4.png")}
        />
        <AddMoneyPopup /> 
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  groupLayout1: {
    height: 168,
    width: 338,
    position: "absolute",
  },
  groupShadowBox: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 0,
    top: 0,
  },
  parentPosition: {
    left: 0,
    top: 0,
  },
  textTypo: {
    color: Color.colorDarkslategray_300,
    textAlign: "left",
    fontFamily: FontFamily.regularNoneMedium,
    fontWeight: "600",
  },
  text1Clr: {
    color: Color.indigoDye,
    textAlign: "left",
  },
  groupViewLayout: {
    height: 268,
    width: 327,
    position: "absolute",
  },
  groupParentLayout: {
    height: 500,
    position: "absolute",
  },
  groupInnerLayout: {
    height: 199,
    width: 200,
    left: 0,
    position: "absolute",
  },
  text2Typo: {
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  rectangleShadowBox: {
    opacity: 0.6,
    height: 95,
    width: 327,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 0,
    position: "absolute",
  },
  addMoneyTypo: {
    lineHeight: 24,
    left: 17,
    color: Color.indigoDye,
    textAlign: "left",
    fontFamily: FontFamily.regularNoneMedium,
    fontWeight: "600",
    fontSize: FontSize.regularNoneMedium_size,
    position: "absolute",
  },
  frameLayout: {
    height: 50,
    width: 50,
    left: 210,
    position: "absolute",
  },
  loremPosition: {
    left: 26,
    position: "absolute",
  },
  arrowTransform: {
    transform: [
      {
        rotate: "-90deg",
      },
    ],
    position: "absolute",
    overflow: "hidden",
  },
  groupChild: {
    height: 168,
    width: 338,
    position: "absolute",
  },
  text: {
    textAlign: "left",
    fontSize: FontSize.regularNoneMedium_size,
    color: Color.colorDarkslategray_300,
  },
  wrapper: {
    top: 120,
    left: 94,
    position: "absolute",
  },
  groupContainer: {
    height: 168,
    width: 338,
    position: "absolute",
  },
  since01Jan: {
    top: 61,
    left: 183,
    fontSize: FontSize.size_sm,
    textAlign: "left",
    position: "absolute",
  },
  totalSaved: {
    top: 58,
    left: 14,
    fontFamily: FontFamily.roboto,
    position: "absolute",
    fontWeight: "800",
    lineHeight: 20,
    fontSize: FontSize.size_xl,
    color: Color.indigoDye,
  },
  text1: {
    fontSize: FontSize.size_10xl,
    letterSpacing: -0.3,
    lineHeight: 34,
    color: Color.indigoDye,
    fontFamily: FontFamily.regularNoneMedium,
    fontWeight: "600",
  },
  container: {
    top: 84,
    left: 42,
    position: "absolute",
  },
  groupParent: {
    top: 382,
    left: 19,
  },
  groupItem: {
    backgroundColor: Color.grey100,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "rgba(74, 85, 104, 0.07)",
    borderRadius: Border.br_5xl,
    height: 268,
    width: 327,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    left: 0,
    top: 0,
    position: "absolute",
  },
  groupInner: {
    top: 0,
  },
  ellipseIcon: {
    top: 1,
    borderRadius: Border.br_xl,
  },
  text2: {
    top: 85,
    left: 72,
    fontSize: FontSize.size_6xl,
    fontWeight: "700",
    color: Color.colorBlack,
    width: 65,
    height: 35,
    textAlign: "left",
  },
  ellipseParent: {
    width: 500,
    height: 500,
    left: -25,
    top:-80,
  },
  groupFrame: {
    width: 500,
    height: 500,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
    left: 0,
    top: 0,
  },
  groupWrapper: {
    top: 46,
    left: 63,
    width: 200,
    height: 200,
  },
  rectangleParent: {
    left: 0,
    top: 0,
  },
  youHaveReached: {
    top: 14,
    left: 16,
    fontFamily: FontFamily.roboto,
    position: "absolute",
    fontWeight: "800",
    lineHeight: 20,
    fontSize: FontSize.size_xl,
    color: Color.indigoDye,
  },
  groupView: {
    left: 22,
    top: 105,
  },
  carSaving: {
    top: 50,
    left: 130,
    fontSize: FontSize.size_5xl,
    color: Color.black01,
    textAlign: "center",
    fontWeight: "800",
    fontFamily: FontFamily.roboto,
    lineHeight: 30,
  },
  groupChild1ShadowBox: {
    backgroundColor: Color.colorWhitesmoke_200,
    height: 95,
    elevation: 8,
    shadowRadius: 8,
    shadowColor: "rgba(74, 85, 104, 0.07)",
    borderRadius: Border.br_5xl,
    width: 327,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    left: 0,
    top: 0,
    position: "absolute",
  },
  rectangleWrapper: {
    top: 0,
  },
  addMoney: {
    top: 9,
  },
  icon: {
    height: "300%",
    width: "250%",
  },
  frame: {
    top: -20,
  },
  loremIpsumDolor: {
    fontSize: FontSize.size_smi,
    width: 188,
    height: 40,
    lineHeight: 20,
    color: Color.indigoDye,
    fontFamily: FontFamily.regularNoneMedium,
  },
  loremIpsumDolorSitAmetCoWrapper: {
    top: 33,
  },
  rectangleContainer: {
    top: 105,
  },
  editGoalEnd: {
    top: 114,
  },
  loremIpsumDolorSitAmetCoContainer: {
    top: 138,
  },
  groupPressable: {
    top: 126,
  },
  groupParent1: {
    top: 554,
    left: 25,
    height: 200,
    width: 327,
  },
  statusBarLight: {
    left: -2,
    width: 375,
    height: 42,
    top: 0,
    position: "absolute",
  },
  arrowDownChild: {
    height: "76.25%",
    width: "60.33%",
    top: "12.08%",
    right: "20.83%",
    bottom: "11.67%",
    left: "20.83%",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  arrowDown: {
    top: 50,
    left: 20,
    width: 40,
    height: 24,
  },
  goalTrackingPage: {
    backgroundColor: Color.colorWhitesmoke_100,
    flex: 1,
    height: 812,
    overflow: "hidden",
    width: "100%",
  },
  popupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
  },
  popupContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: Color.indigoDye,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
  },
});

export default GoalTrackingPage;
