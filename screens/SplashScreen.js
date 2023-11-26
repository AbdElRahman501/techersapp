import React, { useEffect } from 'react'
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue, Easing, withTiming } from 'react-native-reanimated';
import { widthPercentage } from '../GlobalStyles';
import { getLocation, previousSessionHandler, serverWakeUp, updateVersion } from '../store/actions/deviceActions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_SUCCESS } from '../store/constants/userConstants';
import { getCloseTeachers, getMyTeachersData } from '../store/actions/teachersActions';
import { getMyGroups } from '../store/actions/groupsActions';
import { syncedData } from '../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

const SplashScreen = () => {
  const size = useSharedValue(widthPercentage(50));
  const translateY = useSharedValue(0);
  const { userInfo } = useSelector(state => state.userInfo);
  const navigation = useNavigation();

  const onClose = (pages) => {
    setTimeout(() => {
      size.value = withTiming(widthPercentage(1500), { duration: 1000, easing: Easing.cubic });
      translateY.value = withTiming(-1650, { duration: 1000, easing: Easing.cubic });
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: pages,
        });
      }, 900)
    }, 1500)
  }

  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const userInfoJSON = await AsyncStorage.getItem("userInfo");
      const userInfo = userInfoJSON ? JSON.parse(userInfoJSON) : null;
      if (userInfo) {
        dispatch({ type: USER_SUCCESS, payload: userInfo });
        if (userInfo.role === "student") {
          dispatch(syncedData(userInfo))
          dispatch(getCloseTeachers(userInfo.id));
          dispatch(getMyTeachersData())
          dispatch(getMyGroups());
          onClose([{ name: "Home" }])
        } else {
          onClose([{ name: "TeachersHomeScreen" }])
        }
      } else {
        dispatch(serverWakeUp())
        onClose([{ name: "OnboardingPages" }])
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      onClose([{ name: "OnboardingPages" }])
      dispatch(serverWakeUp())

    }
  };

  useEffect(() => {
    if (!userInfo) {
      getUserData()
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(updateVersion("1.0.0.5"))
  }, [])


  return (
    <LinearGradient
      style={{
        flex: 1,
        justifyContent: "center"
      }}
      locations={[0, 0, 1]}
      colors={["#014871", "#014871", "#d7ede2"]}
    >
      <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
        <Animated.Image
          resizeMode="contain"
          style={[{ width: size, height: size }]}
          source={require("../assets/logowhite.png")} />
      </View>

    </LinearGradient>
  );
};

export default SplashScreen;
