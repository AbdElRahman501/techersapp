import React, { useEffect, useState } from "react";
import { StyleSheet, View, ImageBackground, Text, Animated, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, widthPercentage, heightPercentage, fontEm } from "../GlobalStyles";
import { Ionicons } from '@expo/vector-icons';
import t from "../actions/cahngeLanguage";
import { useDispatch, useSelector } from "react-redux";
import OBoardingSlides from "../components/OBoardingSlides";
import { changeLanguage } from "../store/actions/langActions";
import Header from "../components/Header";

export default function OnboardingPages() {
  const navigation = useNavigation();
  const language = useSelector(state => state.languageState.language);
  const [lastSlide, setLastSlide] = useState(false);
  const [num, setNum] = useState(0)

  const next = () => {
    if (!lastSlide) {
      setNum(pv => pv + 1)
    } else {
      navigation.navigate("SignUpOptions")
      setTimeout(() => {
        setNum(0)
      }, 500);
    }
  }
  return (
    <View
      style={[styles.onboarding1Icon, styles.frameFlexBox]}>
      <Header lastSlide={lastSlide} />
      <OBoardingSlides num={num} setLastSlide={setLastSlide} />
      <TouchableOpacity
        style={[styles.parent, styles.parentFlexBox]}
        onPress={next}
      >
        <Text style={[styles.parentText]}> {lastSlide ? t("start") : t("next")}</Text>
        {!lastSlide && <Ionicons name="arrow-forward" size={24}
          color={Color.white} />}
      </TouchableOpacity>
    </View>

  );
};
// parentFlexBox , skipButton, skipButtonText
const styles = StyleSheet.create({
  frameFlexBox: {
    flex: 1,
    alignItems: "center",
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  frameLayout: {
    width: 5,
    backgroundColor: Color.darkcyan,
    borderRadius: Border.br_37xl,
  },
  headlineTypo: {
    justifyContent: "center",
    textAlign: "center"
  },
  ge1Icon: {
    height: heightPercentage(45),
    width: widthPercentage(100)
  },
  frameChild: {
    height: 20,
    margin: 5,
  },
  frameItem: {
    height: 5,
    opacity: 0.3,
    margin: 5,
  },
  rectangleParent: {
    width: 25,
    marginTop: 18,
    height: 20,
  },
  title: {
    fontSize: fontEm(1.5),
    color: Color.black,
    margin: 12,
    marginHorizontal: fontEm(1),
    alignSelf: "stretch",
    fontFamily: FontFamily.montserratArabic

  },
  content: {
    fontSize: fontEm(1),
    color: Color.gray_200,
    margin: 12,
    marginHorizontal: fontEm(1),
    alignSelf: "stretch",
    fontFamily: FontFamily.montserratArabic

  },
  parent: {
    borderRadius: Border.br_13xl,
    height: fontEm(3.5),
    width: "80%",
    justifyContent: "center",
    backgroundColor: Color.darkcyan,
    marginBottom: 74,
  },
  parentText: {
    fontSize: fontEm(1.5),
    fontWeight: "bold",
    color: "white",
    fontFamily: FontFamily.montserratArabic

  },
  frame: {
    marginTop: 38,
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "center",
  },
  onboarding1Icon: {
    flex: 1,
    paddingTop: 50,
  },
});

