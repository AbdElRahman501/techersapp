import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from './store/actions/userActions';
import SearchScreen from './screens/SearchScreen';
import Message from './components/Message';
import UserDataFirstScreen from './screens/UserDataFirstScreen';
import { StatusBar } from 'react-native';
import { getLocation, serverWakeUp, updateVersion } from './store/actions/deviceActions';

const Stack = createNativeStackNavigator();

export default function MainComponents() {

    const [TheInitialRouteName, setInitialRouteName] = useState("");
    const { loading, userInfo, error } = useSelector(state => state.userInfo);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!loading && !TheInitialRouteName) {
            if (userInfo) {
                if (userInfo?.unCompleted) {
                    dispatch(getLocation())
                    setInitialRouteName("UserDataScreen")
                } else {
                    setInitialRouteName("Home")
                }
            } else {
                dispatch(getLocation())
                setInitialRouteName("OnboardingPages")
            }
        }
    }, [userInfo, loading])

    useEffect(() => {
        if (!userInfo) {
            dispatch(getUserData())
        }
    }, [userInfo]);

    useEffect(() => {
        dispatch(updateVersion("1.0.0"))
        dispatch(serverWakeUp())
    }, [])

    return TheInitialRouteName && (
        <NavigationContainer >
            <>
                <StatusBar
                    backgroundColor="white"
                    barStyle="dark-content"
                />
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
                </Stack.Navigator>
                <Message />
                <TapBottomNavigator TheInitialRouteName={TheInitialRouteName} />
            </>
        </NavigationContainer >
    )
}
