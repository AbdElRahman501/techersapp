const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import OnboardingPages from "./screens/OnboardingPages";
import SplashScreen from "./components/SplashScreen";
import SignUpOptions from "./screens/SignupOptions";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./screens/SigninScreen";
import SignUpScreen from "./screens/SignupScreen";
import { Provider } from 'react-redux';
import store from "./store";
import UserDataScreen from "./screens/UserDataScreen";
import VerificationCodeScreen from "./screens/VerificationCodeScreen";
import { Color } from "./GlobalStyles";
import { StatusBar } from "expo-status-bar";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import HomeScreen from "./screens/HomeScreen";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  const [fontsLoaded] = useFonts({
    "Montserrat-Arabic": require("./assets/fonts/Montserrat-Arabic-Regular.ttf"),
  });

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 5000);
  }, []);



  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer>
            {hideSplashScreen ? (
              <>
                <StatusBar
                  backgroundColor={Color.darkcyan}
                  barStyle="light-content"
                />
                <Stack.Navigator
                  initialRouteName="OnboardingPages"
                  screenOptions={{ headerShown: false }}
                >
                  <Stack.Screen name="OnboardingPages" component={OnboardingPages}
                    options={{ headerShown: false }} />
                  <Stack.Screen name="SignUpOptions" component={SignUpOptions}
                    options={{ headerShown: false }} />
                  <Stack.Screen name="SigninScreen" component={SigninScreen}
                    options={{ headerShown: false }} />
                  <Stack.Screen name="SignUpScreen" component={SignUpScreen}
                    options={{ headerShown: false }} />
                  <Stack.Screen name="UserDataScreen" component={UserDataScreen}
                    options={{ headerShown: false }} />
                  <Stack.Screen name="VerificationCodeScreen" component={VerificationCodeScreen}
                    options={{ headerShown: false }} />
                  <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}
                    options={{ headerShown: false }} />
                  <Stack.Screen name="HomeScreen" component={HomeScreen}
                    options={{ headerShown: false }} />
                </Stack.Navigator>
              </>
            ) : (
              <SplashScreen />
            )}
          </NavigationContainer>
        </ApplicationProvider>
      </Provider>

    </>
  );
};
export default App;
