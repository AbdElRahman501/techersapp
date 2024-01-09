import React from 'react'
import UserDataScreen from "./screens/UserDataScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import SubjectScreen from "./screens/SubjectScreen";
import CommunityScreen from "./screens/CommunityScreen";
import ScheduleScreen from "./screens/ScheduleScreen";
import ProfileScreen from "./screens/ProfileScreen";
import TapBottomNavigator from "./components/TapBottomNavigator";
import TeacherScreen from "./screens/TeacherScreen";
import OnboardingPages from "./screens/OnboardingPages";
import SignUpOptions from "./screens/SignupOptions";
import { NavigationContainer } from "@react-navigation/native";
import SigninScreen from "./screens/SigninScreen";
import SignUpScreen from "./screens/SignupScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from './screens/SearchScreen';
import Message from './components/Message';
import UserDataFirstScreen from './screens/UserDataFirstScreen';
import { StatusBar } from 'react-native';
import TeacherSignUpScreen from './screens/TeacherSignUpScreen';
import SplashScreen from './screens/SplashScreen';
import TeacherDataScreen from './screens/TeacherDataScreen';
import AddressScreen from './screens/AddressScreen';
import TeachersHomeScreen from './screens/TeachersHomeScreen';

const Stack = createNativeStackNavigator();

export default function MainComponents() {


    return (
        <NavigationContainer >
            <>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
                <Stack.Navigator
                    initialRouteName={"Splash Screen"}
                    screenOptions={{ headerShown: false }}
                >
                    <Stack.Screen name="Splash Screen" component={SplashScreen}
                        options={{ headerShown: false }} />
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
                    <Stack.Screen name="UserData1" component={UserDataFirstScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="Home" component={HomeScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="Community" component={CommunityScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="Schedule" component={ScheduleScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="Profile" component={ProfileScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="SubjectScreen" component={SubjectScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="TeacherScreen" component={TeacherScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="SearchScreen" component={SearchScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="TeacherSignUpScreen" component={TeacherSignUpScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="TeacherDataScreen" component={TeacherDataScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="AddressScreen" component={AddressScreen}
                        options={{ headerShown: false }} />
                    <Stack.Screen name="TeachersHomeScreen" component={TeachersHomeScreen}
                        options={{ headerShown: false }} />
                </Stack.Navigator>
                <Message />
            </>
        </NavigationContainer >
    )
}
