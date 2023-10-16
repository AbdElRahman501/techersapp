import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import Header from "../components/Header";
import OBoardingSlides from "../components/OBoardingSlides";
import { Color, globalStyles } from "../GlobalStyles";

export default function OnboardingPages() {
  const [lastSlide, setLastSlide] = useState(false);


  return (
    <SafeAreaView style={[globalStyles.container, { backgroundColor: Color.white, }]}>
      <Header lastSlide={lastSlide} />
      <OBoardingSlides setLastSlide={setLastSlide} />
    </SafeAreaView>
  );
};


