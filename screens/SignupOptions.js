import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, ImageBackground, Image, View, SafeAreaView, Platform } from "react-native";
import { Border, FontFamily, Color, FontSize, Padding, heightPercentage, widthPercentage, Margin } from "../GlobalStyles";
import { useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import PressedText from "../components/PressedText";
import t from "../actions/changeLanguage";
import Header from "../components/Header";

const SignUpOptions = () => {
  const { language } = useSelector(state => state.languageState);
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}
        source={require('../assets/onboardingBk1.png')}
      >
        <Header lastSlide={true} />

        <Image
          style={{ flex: 1, width: "90%" , maxWidth: 450 }}
          resizeMode="contain"
          source={require("../assets/image-2.png")}
        />
        <Text style={[styles.title, { fontSize: FontSize.size_xl, paddingHorizontal: Padding.page_p }]}>
          {t("Join us and explore new ways of learning.")}
        </Text>
        <Text style={[styles.content, { paddingHorizontal: Padding.page_p }]}>
          {t("Whether you are a teacher, a student, or a parent, we have something for you.")}
        </Text>
        <View style={{ marginTop: Margin.m_lg }} >
          <Text style={[styles.content, { color: Color.darkcyan, margin: Margin.m_base }]} >{t("join as")}</Text>
          <View style={[styles.flexContainer, { gap: Margin.m_base }]}>
            <PrimaryButton style={[styles.button, styles.secButton]} onPress={() => navigation.navigate('SignUpScreen', { user: "teacher" })} >
              <Text style={[styles.title, { color: Color.darkcyan }]}>
                {t("teacher")}
              </Text>
            </PrimaryButton>
            <PrimaryButton style={[styles.button]} onPress={() => navigation.navigate("SignUpScreen", { user: "student" })} >
              <Text style={[styles.title, { color: Color.white }]}>
                {t("student or parent")}
              </Text>
            </PrimaryButton>
          </View>
        </View>
        <View style={[styles.flexContainer , {marginBottom: Platform.select({
            ios: Margin.m_xxl,
            android: Margin.m_base,
          }),}]} >
          <View style={[styles.parentFlexBox, { flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
            <Text style={styles.regularText}>{t("already have an account")}</Text>
            <PressedText style={{ marginRight: 8 }} title={t("sign in")} pressHandler={() => navigation.navigate("SigninScreen")} />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView >
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center",

  },
  regularText: {
    color: Color.black,
    fontFamily: FontFamily.montserratArabic,
    fontSize: FontSize.size_base,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Padding.p_xl,
  },
  button: {
    width: 150,
    borderRadius: Border.br_6xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secButton: {
    backgroundColor: Color.white,
    borderColor: Color.darkcyan,
    borderWidth: 1
  },
  title: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratArabic,
    textAlign: 'center',

  },
  content: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratArabic,
    color: Color.gray_200,
    textAlign: 'center',


  },
});

export default SignUpOptions;
