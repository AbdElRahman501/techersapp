import React, { useEffect } from 'react'
import { View, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentage } from '../GlobalStyles';
import { serverWakeUp, updateVersion } from '../store/actions/deviceActions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_SUCCESS } from '../store/constants/userConstants';
import { getCloseTeachers, getMyTeachersData } from '../store/actions/teachersActions';
import { getMyGroups } from '../store/actions/groupsActions';
import { syncedData } from '../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { getSubjects } from '../store/actions/subjectsActions';
import transition from '../actions/transition';
import { getAds } from '../store/actions/adsActions';

const SplashScreen = () => {
  const { userInfo } = useSelector(state => state.userInfo);
  const [trigger, setTrigger] = React.useState(false);
  const navigation = useNavigation();

  const onClose = (pages) => {
    setTimeout(() => {
      setTrigger(true)
      setTimeout(() => {
        navigation.reset({
          index: 0,
          routes: pages,
        });
      }, 400)
    }, 2500)
  }

  const dispatch = useDispatch();

  const getUserData = async () => {
    try {
      const userInfoJSON = await AsyncStorage.getItem("userInfo");
      const userInfo = userInfoJSON ? JSON.parse(userInfoJSON) : null;
      if (userInfo) {
        dispatch({ type: USER_SUCCESS, payload: userInfo });
        dispatch(getSubjects(userInfo.id))
        dispatch(getAds(userInfo.id))
        if (userInfo.role === "student") {
          dispatch(syncedData(userInfo))
          dispatch(getCloseTeachers(userInfo.id));
          dispatch(getMyTeachersData())
          dispatch(getMyGroups());
          // onClose([{ name: "Home" }])
        } else {
          // onClose([{ name: "TeachersHomeScreen" }])
        }
      } else {
        dispatch(getSubjects())
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
    } else if (userInfo) {
      if (userInfo.role === "student") {
        onClose([{ name: "Home" }])
      } else {
        onClose([{ name: "TeachersHomeScreen" }])
      }
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(updateVersion("1.0.0.6"))
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
          style={[{ width: transition(widthPercentage(50), widthPercentage(600), 400, trigger), height: transition(widthPercentage(50), widthPercentage(600), 400, trigger) }]}
          source={require("../assets/logowhite.png")} />
      </View>

    </LinearGradient>
  );
};

export default SplashScreen;
