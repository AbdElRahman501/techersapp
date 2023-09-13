import React, { useEffect, useState } from 'react'
import UserDataScreen from "./screens/UserDataScreen";
import VerificationCodeScreen from "./screens/VerificationCodeScreen";
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
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './store/actions/userActions';
import SearchScreen from './screens/SearchScreen';
import Message from './components/Message';

const Stack = createNativeStackNavigator();

export default function MainComponents() {

    const [TheInitialRouteName, setInitialRouteName] = useState("");
    const { loading, userInfo, error } = useSelector(state => state.userInfo);

    const dispatch = useDispatch();


    useEffect(() => {
        if (!loading && loading != undefined && !TheInitialRouteName) {
            if (userInfo) {
                setInitialRouteName("Home")
            } else {
                setInitialRouteName("OnboardingPages")
            }
        }
    }, [userInfo])

    useEffect(() => {
        if (!userInfo) {
            dispatch(getUserData())
        }
    }, [dispatch]);
    return TheInitialRouteName && (
        <NavigationContainer >
            <Stack.Navigator
                initialRouteName={TheInitialRouteName}
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
            </Stack.Navigator>
            <Message />
            <TapBottomNavigator />
        </NavigationContainer >
    )
}
