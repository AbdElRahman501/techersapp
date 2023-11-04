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
import SearchScreen from './screens/SearchScreen';
import Message from './components/Message';
import UserDataFirstScreen from './screens/UserDataFirstScreen';
import { StatusBar } from 'react-native';
import { getLocation, serverWakeUp, updateVersion } from './store/actions/deviceActions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_SUCCESS } from './store/constants/userConstants';
import { getTeachersData } from './store/actions/teachersActions';

const Stack = createNativeStackNavigator();

export default function MainComponents() {

    const [TheInitialRouteName, setInitialRouteName] = useState("");
    const { userInfo } = useSelector(state => state.userInfo);

    const dispatch = useDispatch();

    const getUserData = async () => {
        try {
            const dataJSON = await AsyncStorage.getItem("userInfo");
            if (dataJSON !== null) {
                const userInfo = JSON.parse(dataJSON);
                dispatch({ type: USER_SUCCESS, payload: userInfo });
                if (userInfo?.unCompleted) {
                    setInitialRouteName("UserDataScreen")
                } else {
                    dispatch(getTeachersData());
                    setInitialRouteName("Home")
                }
            } else {
                console.log("🚀 ~ file: MainComponents.js:64 ~ getUserData ~ No data found:")
                dispatch(getLocation())
                setInitialRouteName("OnboardingPages")
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            dispatch(getLocation())
            setInitialRouteName("OnboardingPages")
        }
    };

    useEffect(() => {
        if (!userInfo && !TheInitialRouteName) {
            getUserData()
        }
    }, [userInfo, TheInitialRouteName]);

    useEffect(() => {
        dispatch(updateVersion("1.0.0.0"))
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
