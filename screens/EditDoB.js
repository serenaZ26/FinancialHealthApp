import * as React from "react";
import { Font } from 'expo';
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles";

const EditDoB = () => {
  return (
    <View style={styles.editDob}>
      <Image
        style={[styles.statusBarLight, styles.statusBarLightPosition]}
        contentFit="cover"
        source={require("../assets/status-bar--light7.png")}
      />
      <TextInput
        style={[styles.controlsTextFieldFloatin, styles.controlsPosition1]}
        label="Leisure"
        placeholder="AED"
        mode="outlined"
        placeholderTextColor="#72777a"
        theme={{
          fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
      />
      <Image
        style={[
          styles.materialSymbolseditOutlineIcon,
          styles.materialIconLayout,
        ]}
        contentFit="cover"
        source={require("../assets/materialsymbolseditoutlinerounded.png")}
      />
      <TextInput
        style={[styles.controlsTextFieldFloatin1, styles.controlsPosition]}
        label="Food"
        mode="outlined"
        placeholderTextColor="#72777a"
        theme={{
          fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
      />
      <Image
        style={[
          styles.materialSymbolseditOutlineIcon1,
          styles.materialIconLayout,
        ]}
        contentFit="cover"
        source={require("../assets/materialsymbolseditoutlinerounded.png")}
      />
      <TextInput
        style={[styles.controlsTextFieldFloatin2, styles.controlsPosition]}
        label="Transportation"
        placeholder="AED"
        mode="outlined"
        placeholderTextColor="#72777a"
        theme={{
          fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
      />
      <Image
        style={[
          styles.materialSymbolseditOutlineIcon2,
          styles.materialIconLayout,
        ]}
        contentFit="cover"
        source={require("../assets/materialsymbolseditoutlinerounded.png")}
      />
      <TextInput
        style={[styles.controlsTextFieldFloatin3, styles.controlsPosition1]}
        label="Groceries"
        placeholder="AED"
        mode="outlined"
        placeholderTextColor="#72777a"
        theme={{
          fonts: { regular: { fontFamily: "Roboto", fontWeight: "Regular" } },
          colors: { text: "#090a0a" },
        }}
      />
      <Image
        style={[
          styles.materialSymbolseditOutlineIcon3,
          styles.materialIconLayout,
        ]}
        contentFit="cover"
        source={require("../assets/materialsymbolseditoutlinerounded.png")}
      />
      <Button
        style={styles.loginButton}
        mode="contained"
        labelStyle={styles.loginButtonBtn}
        contentStyle={styles.loginButtonBtn1}
      >{`Save `}</Button>
      <Text style={styles.editUserProfile}>Edit User Profile</Text>
      <View style={styles.choosingDateParent}>
        <View style={styles.choosingDate}>
          <View style={[styles.light, styles.darkPosition]}>
            <View style={styles.background} />
            <Image
              style={styles.vuesaxlinearcalendarIcon}
              contentFit="cover"
              source={require("../assets/vuesaxlinearcalendar2.png")}
            />
            <View style={[styles.line, styles.linePosition]} />
            <Text style={styles.choosingDate1}>13/06/2022</Text>
          </View>
          <View style={styles.darkPosition}>
            <View style={styles.background1} />
            <Image
              style={styles.vuesaxlinearcalendarIcon}
              contentFit="cover"
              source={require("../assets/vuesaxlinearcalendar3.png")}
            />
            <View style={[styles.line1, styles.linePosition]} />
            <Text style={styles.choosingDate2}>25/11/1999</Text>
          </View>
        </View>
        <Text style={styles.dateOfBirth} numberOfLines={1}>
          Date of Birth
        </Text>
      </View>
      <Image
        style={styles.arrowDownIcon}
        contentFit="cover"
        source={require("../assets/arrowdown1.png")}
      />
      <View style={[styles.partialsOverlay, styles.statusBarLightPosition]} />
      <View style={[styles.calendar, styles.dayFlexBox2]}>
        <View style={styles.calendar1}>
          <View style={[styles.month, styles.monthFlexBox]}>
            <Image
              style={styles.iconCalendarPrev}
              contentFit="cover"
              source={require("../assets/icon--calendar--prev.png")}
            />
            <Text style={[styles.november2022, styles.weekday1Typo]}>
              November 1999
            </Text>
            <Image
              style={styles.iconCalendarPrev}
              contentFit="cover"
              source={require("../assets/icon--calendar--next.png")}
            />
          </View>
          <View style={styles.weekFlexBox}>
            <View style={[styles.day, styles.dayFlexBox1]}>
              <Text style={[styles.weekday1, styles.weekday1Typo]}>Su</Text>
            </View>
            <View style={[styles.day, styles.dayFlexBox1]}>
              <Text style={[styles.weekday1, styles.weekday1Typo]}>Mo</Text>
            </View>
            <View style={[styles.day, styles.dayFlexBox1]}>
              <Text style={[styles.weekday1, styles.weekday1Typo]}>Tu</Text>
            </View>
            <View style={[styles.day, styles.dayFlexBox1]}>
              <Text style={[styles.weekday1, styles.weekday1Typo]}>We</Text>
            </View>
            <View style={[styles.day, styles.dayFlexBox1]}>
              <Text style={[styles.weekday1, styles.weekday1Typo]}>Th</Text>
            </View>
            <View style={[styles.day, styles.dayFlexBox1]}>
              <Text style={[styles.weekday1, styles.weekday1Typo]}>Fr</Text>
            </View>
            <View style={[styles.day, styles.dayFlexBox1]}>
              <Text style={[styles.weekday1, styles.weekday1Typo]}>Sa</Text>
            </View>
          </View>
          <View style={[styles.week, styles.weekFlexBox]}>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date, styles.dateTypo]}>30</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date, styles.dateTypo]}>31</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>1</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>2</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>3</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>4</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>5</Text>
            </View>
          </View>
          <View style={[styles.week, styles.weekFlexBox]}>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>6</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>7</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>8</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>9</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>10</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>11</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>12</Text>
            </View>
          </View>
          <View style={[styles.week, styles.weekFlexBox]}>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>13</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>14</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>15</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>16</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>17</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>18</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>19</Text>
            </View>
          </View>
          <View style={[styles.week, styles.weekFlexBox]}>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>20</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>21</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>22</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>23</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>24</Text>
            </View>
            <View style={[styles.day33, styles.dayFlexBox]}>
              <Text style={[styles.date26, styles.dateTypo]}>25</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>26</Text>
            </View>
          </View>
          <View style={[styles.week, styles.weekFlexBox]}>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>27</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>28</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>29</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date2, styles.dateTypo]}>30</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date, styles.dateTypo]}>1</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date, styles.dateTypo]}>2</Text>
            </View>
            <View style={[styles.day7, styles.dayFlexBox]}>
              <Text style={[styles.date, styles.dateTypo]}>3</Text>
            </View>
          </View>
        </View>
        <View style={[styles.clear, styles.dayFlexBox]}>
          <Text style={[styles.clear1, styles.dateTypo]}>Clear</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginButtonBtn: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
    fontFamily: "Roboto",
  },
  loginButtonBtn1: {
    borderRadius: 48,
    height: 50,
  },
  statusBarLightPosition: {
    top: 0,
    position: "absolute",
  },
  controlsPosition1: {
    height: 52,
    left: 45,
    right: 47,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
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
  darkPosition: {
    left: "0%",
    bottom: "7.69%",
    right: "2.23%",
    top: "0%",
    width: "97.77%",
    height: "92.31%",
    position: "absolute",
  },
  linePosition: {
    borderRightWidth: 0.5,
    borderRadius: 0.001,
    borderStyle: "dashed",
    left: "31.89%",
    bottom: "9.38%",
    right: "67.83%",
    top: "9.58%",
    width: "0.29%",
    height: "81.04%",
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    position: "absolute",
  },
  dayFlexBox2: {
    alignItems: "center",
    backgroundColor: Color.neutralColorsWhite,
  },
  monthFlexBox: {
    paddingHorizontal: 0,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  weekday1Typo: {
    fontFamily: FontFamily.openSans,
    textAlign: "left",
    fontWeight: "700",
    fontSize: FontSize.size_sm,
  },
  dayFlexBox1: {
    justifyContent: "center",
    padding: Padding.p_3xs,
    flex: 1,
  },
  weekFlexBox: {
    flexDirection: "row",
    width: 230,
  },
  dayFlexBox: {
    alignSelf: "stretch",
    alignItems: "center",
  },
  dateTypo: {
    fontWeight: "600",
    fontFamily: FontFamily.openSans,
    textAlign: "left",
  },
  statusBarLight: {
    left: 2,
    width: 375,
    height: 45,
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
    top: 589,
    right: 78,
    left: 77,
    position: "absolute",
  },
  editUserProfile: {
    top: 48,
    left: 99,
    fontSize: FontSize.size_5xl,
    lineHeight: 20,
    fontWeight: "800",
    color: Color.black01,
    textAlign: "center",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  background: {
    borderRadius: Border.br_7xs,
    backgroundColor: Color.colorGray_300,
    shadowOpacity: 1,
    elevation: 8,
    shadowRadius: 8,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowColor: "rgba(16, 16, 16, 0.24)",
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    position: "absolute",
    width: "100%",
  },
  vuesaxlinearcalendarIcon: {
    height: "60%",
    width: "13.71%",
    top: "20%",
    right: "77.14%",
    bottom: "20%",
    left: "9.14%",
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  line: {
    shadowColor: "rgba(245, 245, 245, 0.4)",
    borderColor: Color.colorGainsboro_100,
  },
  choosingDate1: {
    fontSize: FontSize.regularNoneMedium_size,
    color: Color.colorsBackgroundsLight,
    textShadowColor: "rgba(245, 245, 245, 0.4)",
    textShadowRadius: 8,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textAlign: "justify",
    lineHeight: 16,
    left: "41.14%",
    top: "30%",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  light: {
    display: "none",
  },
  background1: {
    backgroundColor: Color.neutralColorsWhite,
    bottom: "0%",
    right: "0%",
    height: "100%",
    left: "0%",
    top: "0%",
    borderRadius: Border.br_5xs,
    position: "absolute",
    width: "100%",
  },
  line1: {
    borderColor: Color.colorGray_100,
    shadowColor: "rgba(16, 16, 16, 0.24)",
    borderRightWidth: 0.5,
    borderRadius: 0.001,
    borderStyle: "dashed",
    left: "31.89%",
    bottom: "9.38%",
    right: "67.83%",
    top: "9.58%",
    width: "0.29%",
    height: "81.04%",
  },
  choosingDate2: {
    color: Color.colorGray_300,
    textShadowColor: "rgba(16, 16, 16, 0.24)",
    fontSize: FontSize.size_sm,
    textShadowRadius: 8,
    textShadowOffset: {
      width: 2,
      height: 2,
    },
    textAlign: "justify",
    lineHeight: 16,
    left: "41.14%",
    top: "30%",
    fontFamily: FontFamily.roboto,
    position: "absolute",
  },
  choosingDate: {
    height: "65%",
    width: "82.49%",
    top: "37.5%",
    right: "18.43%",
    bottom: "-2.5%",
    left: "-0.92%",
    borderColor: Color.indigoDye,
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  dateOfBirth: {
    marginTop: -40,
    marginLeft: -108.5,
    top: "50%",
    left: "50%",
    lineHeight: 12,
    fontFamily: FontFamily.regularNoneMedium,
    color: Color.indigoDye,
    width: 217,
    height: 12,
    textAlign: "left",
    fontWeight: "700",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  choosingDateParent: {
    height: "9.85%",
    width: "57.87%",
    top: "47.41%",
    right: "29.33%",
    bottom: "42.73%",
    left: "12.8%",
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
  partialsOverlay: {
    left: -5,
    backgroundColor: Color.inkDarkest,
    width: 382,
    opacity: 0.7,
    height: 812,
  },
  iconCalendarPrev: {
    width: 16,
    height: 16,
    overflow: "hidden",
  },
  november2022: {
    color: Color.colorBlack,
  },
  month: {
    paddingVertical: Padding.p_8xs,
    width: 230,
    paddingHorizontal: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  weekday1: {
    color: Color.colorDarkslategray_200,
  },
  day: {
    height: 32,
    alignItems: "center",
    backgroundColor: Color.neutralColorsWhite,
  },
  date: {
    color: Color.colorDarkgray,
    fontSize: FontSize.size_smi,
    fontWeight: "600",
  },
  day7: {
    justifyContent: "center",
    padding: Padding.p_3xs,
    flex: 1,
    backgroundColor: Color.neutralColorsWhite,
  },
  date2: {
    fontSize: FontSize.size_smi,
    fontWeight: "600",
    color: Color.colorDarkslategray_200,
  },
  week: {
    height: 32,
  },
  date26: {
    color: Color.neutralColorsWhite,
    fontSize: FontSize.size_smi,
    fontWeight: "600",
  },
  day33: {
    backgroundColor: Color.colorDodgerblue,
    justifyContent: "center",
    padding: Padding.p_3xs,
    flex: 1,
    borderRadius: Border.br_5xs,
  },
  calendar1: {
    padding: Padding.p_3xs,
  },
  clear1: {
    color: Color.colorDarkslategray_200,
    fontWeight: "600",
    fontSize: FontSize.size_xs,
  },
  clear: {
    borderBottomRightRadius: Border.br_5xs,
    borderBottomLeftRadius: Border.br_5xs,
    paddingVertical: Padding.p_3xs,
    paddingHorizontal: 0,
    justifyContent: "space-between",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Color.colorGainsboro_200,
    borderStyle: "solid",
    backgroundColor: Color.neutralColorsWhite,
  },
  calendar: {
    top: 267,
    left: 57,
    width: 250,
    borderWidth: 1,
    borderColor: Color.colorGainsboro_200,
    borderStyle: "solid",
    borderRadius: Border.br_5xs,
    position: "absolute",
  },
  editDob: {
    backgroundColor: Color.colorWhitesmoke_100,
    overflow: "hidden",
    height: 812,
    width: "100%",
    flex: 1,
  },
});

export default EditDoB;
