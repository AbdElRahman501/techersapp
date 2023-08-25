import React, { useState, useEffect } from 'react'
import { View, Image, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from '../store/actions/userActions';


const SplashScreen = ({ setInitialRouteName }) => {
  const [hideSplashScreen, setHideSplashScreen] = useState(false);
  const { loading, userInfo, error } = useSelector(state => state.userInfo);

  const dispatch = useDispatch();


  useEffect(() => {
    setTimeout(() => {
      setHideSplashScreen(true);
    }, 2000);
  }, []);

  useEffect(() => {
    if (!loading && hideSplashScreen) {
      console.log("🚀 ~ file: SplashScreen.js:28 ~ useEffect ~ userInfo:", userInfo)
      if (userInfo) {
        setInitialRouteName("Home")
      } else {
        setInitialRouteName("OnboardingPages")
      }
    }
  }, [userInfo, hideSplashScreen])

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch]);


  return (
    <>
      <StatusBar
        backgroundColor="#014871" // Set your desired background color
        barStyle="light-content"   // Set text and icon color to light
      />
      <LinearGradient
        style={styles.splashScreen}
        locations={[0, 0, 1]}
        colors={["#014871", "#014871", "#d7ede2"]}
      >
        <ImageBackground
          style={styles.icon}
          resizeMode="cover"
          source={require("../assets/1splashscreen.png")}
        >
          <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" }]}>
            <Image
              style={styles.logo}
              resizeMode="center"
              source={require("../assets/logowhite.png")} />
          </View>

        </ImageBackground>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "50%",
    height: "50%",
  },
  icon: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  splashScreen: {
    flex: 1,
    justifyContent: "center"
  },
});

export default SplashScreen;
