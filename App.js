const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from 'expo-font';
import OnboardingPages from "./screens/OnboardingPages";
import SplashScreen from "./components/SplashScreen";
import SignUpOptions from "./screens/SignupOptions";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import SigninScreen from "./screens/SigninScreen";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);
  

  React.useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Montserrat-Arabic': require('./assets/fonts/Montserrat-Arabic-Regular.ttf'),
        // Add more font styles if you have different font weights or styles.
      });
    }

    loadFonts();
  }, []);

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);
  }, []);


  return (
    <>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {hideSplashScreen ? (
            <Stack.Navigator
              initialRouteName="OnboardingPages"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen
                name="OnboardingPages"
                component={OnboardingPages}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SignUpOptions"
                component={SignUpOptions}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SigninScreen"
                component={SigninScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          ) : (
            <SplashScreen />
          )}
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
export default App;
