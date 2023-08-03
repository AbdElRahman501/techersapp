const Stack = createNativeStackNavigator();
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import OnboardingPages from "./screens/OnboardingPages";
import SplashScreen from "./components/SplashScreen";
import SignUpOptions from "./screens/SignupOptions";
import MIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { IconRegistry, ApplicationProvider } from "@ui-kitten/components";
import * as eva from "@eva-design/eva";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SigninScreen from "./screens/SigninScreen";
import SignUpScreen from "./screens/SignupScreen";
import { Provider } from 'react-redux';
import store from "./store";

const App = () => {
  const [hideSplashScreen, setHideSplashScreen] = React.useState(false);

  const [fontsLoaded] = useFonts({
    "Montserrat-Arabic": require("./assets/fonts/Montserrat-Arabic-Regular.ttf"),
  });

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 1000);
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
                <Stack.Screen
                  name="SignUpScreen"
                  component={SignUpScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
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
