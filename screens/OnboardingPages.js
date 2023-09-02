import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Header from "../components/Header";
import OBoardingSlides from "../components/OBoardingSlides";
import { Color } from "../GlobalStyles";

export default function OnboardingPages() {
  const [lastSlide, setLastSlide] = useState(false);


  return (
    <SafeAreaView style={styles.container}>
      <Header lastSlide={lastSlide} />
      <OBoardingSlides setLastSlide={setLastSlide} />
    </SafeAreaView>
  );
};
// parentFlexBox , skipButton, skipButtonText
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.white,

  }

});

