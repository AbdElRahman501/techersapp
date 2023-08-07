import * as React from "react";
import {  View, Image, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";


const SplashScreen = () => {
  return (
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
