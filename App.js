const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Font } from "expo";
import { useEffect } from "react";
import UserInfoInputPage from "./screens/UserInfoInputPage";
import UserIcon from "./components/UserIcon";
import GroupIcon from "./components/GroupIcon";
import GroupIcon1 from "./components/GroupIcon1";
import GroupIcon2 from "./components/GroupIcon2";
import GroupIcon3 from "./components/GroupIcon3";
import GroupIcon4 from "./components/GroupIcon4";
import IconMoneybag from "./components/IconMoneybag";
import GroupIcon5 from "./components/GroupIcon5";
import AccountCreationPage from "./screens/AccountCreationPage";
import LoadingPage from "./screens/LoadingPage";
import ResetPasswordPage from "./screens/ResetPasswordPage";
import LoginPage from "./screens/LoginPage";
import HelpAndSupportPage from "./screens/HelpAndSupportPage";
import MonthlyInputPage from "./screens/MonthlyInputPage";
import GoalCreationPage from "./screens/GoalCreationPage";
import WeeklyInputPage from "./screens/WeeklyInputPage";
import GoalCompletionPage from "./screens/GoalCompletionPage";
import EditDoB from "./screens/EditDoB";
import EditUserProfilePage from "./screens/EditUserProfilePage";
import HomePage from "./screens/HomePage";
import FinancialHealthScoreOvervie from "./screens/FinancialHealthScoreOvervie";
import FinacialHealthScorePage from "./screens/FinacialHealthScorePage";
import GoalTrackingPage from "./screens/GoalTrackingPage";
import SavingsGoalsPage from "./screens/SavingsGoalsPage";
import MenuScreen from "./components/MenuScreen";
import ArrowDown from "./components/ArrowDown";
import AndroidStatusBar from "./components/AndroidStatusBar";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import * as eva from "@eva-design/eva";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();
function BottomTabsRoot({ navigation }) {
  const [bottomTabItemsNormal] = React.useState([
    <GroupIcon />,
    <GroupIcon2 />,
    <GroupIcon1 />,
    <GroupIcon5 />,
  ]);
  const [bottomTabItemsActive] = React.useState([
    <IconMoneybag />,
    <GroupIcon4 />,
    <GroupIcon3 />,
    <UserIcon />,
  ]);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, descriptors, navigation }) => {
        const activeIndex = state.index;
        return (
          <View
            style={{
              height: 40,
              width: "98.13%",
              maxWidth: "100%",
              overflow: "hidden",
              maxHeight: "100%",
              flexDirection: "row",
              justifyContent: "space-between", // Distribute the icons evenly
              paddingHorizontal: 20,
            }}
          >
            {bottomTabItemsNormal.map((item, index) => {
              const isFocused = state.index === index;
              return (
                <Pressable
                  key={index}
                  onPress={() => {
                    navigation.navigate({
                      name: state.routes[index].name,
                      merge: true,
                    });
                  }}
                >
                  {activeIndex === index
                    ? bottomTabItemsActive[index] || item
                    : item}
                </Pressable>
              );
            })}
          </View>
        );
      }}
    >
      <Tab.Screen
        name="SavingsGoalsPage"
        component={SavingsGoalsPage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="FinancialHealthScoreOvervie"
        component={FinancialHealthScoreOvervie}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="EditUserProfilePage"
        component={EditUserProfilePage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Inter': require('@expo-google-fonts/inter'),
      });
    }
    loadFonts();
  }, []);
  
  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);
  }, []);

  function MaterialIcon({ name, style }) {
    const { height, tintColor, ...iconStyle } = StyleSheet.flatten(style);
    return (
      <MIcon name={name} size={height} color={tintColor} style={iconStyle} />
    );
  }

  const IconProvider = (name) => ({
    toReactElement: (props) => MaterialIcon({ name, ...props }),
  });

  function createIconsMap() {
    return new Proxy(
      {},
      {
        get(target, name) {
          return IconProvider(name);
        },
      },
    );
  }
  const MaterialIconsPack = {
    name: "material",
    icons: createIconsMap(),
  };

  return (
    <>
      <IconRegistry icons={[MaterialIconsPack]} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {hideSplashScreen ? (
            <Stack.Navigator
              initialRouteName="LoginPage"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="BottomTabsRoot" component={BottomTabsRoot} />
              <Stack.Screen
                name="UserInfoInputPage"
                component={UserInfoInputPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AccountCreationPage"
                component={AccountCreationPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoadingPage"
                component={LoadingPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ResetPasswordPage"
                component={ResetPasswordPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LoginPage"
                component={LoginPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="HelpAndSupportPage"
                component={HelpAndSupportPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MonthlyInputPage"
                component={MonthlyInputPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GoalCreationPage"
                component={GoalCreationPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="WeeklyInputPage"
                component={WeeklyInputPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GoalCompletionPage"
                component={GoalCompletionPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EditDoB"
                component={EditDoB}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="FinacialHealthScorePage"
                component={FinacialHealthScorePage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="GoalTrackingPage"
                component={GoalTrackingPage}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <LoadingPage />
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
export default App;
