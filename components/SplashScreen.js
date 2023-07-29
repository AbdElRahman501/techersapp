import * as React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontFamily, Color } from "../GlobalStyles";

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
        <Text style={styles.droosLk} numberOfLines={1}>
          Droos LK
        </Text>
      </ImageBackground>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  droosLk: {
    fontSize: 50,
    fontWeight: "700",
    color: Color.white,
    textAlign: "center",
  },
  icon: {
    flex:1,
    overflow: "hidden",
    justifyContent:"center",
    backgroundColor: "transparent",
  },
  splashScreen: {
    flex: 1,
    justifyContent:"center"
  },
});

export default SplashScreen;
