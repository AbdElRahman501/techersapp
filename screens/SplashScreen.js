import React, { useEffect } from 'react'
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { useSharedValue, Easing, withTiming } from 'react-native-reanimated';
import { widthPercentage } from '../GlobalStyles';
import { getLocation, serverWakeUp, updateVersion } from '../store/actions/deviceActions';
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

  const onClose = (page) => {
    size.value = withTiming(widthPercentage(1500), { duration: 1000, easing: Easing.cubic });
    translateY.value = withTiming(-1650, { duration: 1000, easing: Easing.cubic });
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: page }],
      });
    }, 1000)
  }

  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const dataJSON = await AsyncStorage.getItem("userInfo");
      if (dataJSON !== null) {
        const userInfo = JSON.parse(dataJSON);
        dispatch(syncedData(userInfo))
        dispatch({ type: USER_SUCCESS, payload: userInfo });
        if (userInfo?.unCompleted) {
          onClose('UserDataScreen')
          dispatch(serverWakeUp())
        } else {
          dispatch(getCloseTeachers(userInfo.id));
          dispatch(getMyTeachersData())
          dispatch(getMyGroups());
          onClose("Home")
        }
      } else {
        dispatch(serverWakeUp())
        onClose("OnboardingPages")
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      onClose("OnboardingPages")
      dispatch(serverWakeUp())

    }
  };

  useEffect(() => {
    if (!userInfo) {
      getUserData()
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(updateVersion("1.0.0.1"))
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
          resizeMode="cover"
          style={[{ width: size, height: size, transform: [{ translateY: translateY }] }]}
          source={require("../assets/logowhite.png")} />
      </View>

    </LinearGradient>
  );
};

export default SplashScreen;
