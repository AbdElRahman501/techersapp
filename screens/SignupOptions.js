import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, ImageBackground, Animated, View, SafeAreaView } from "react-native";
import { Border, FontFamily, Color, FontSize, Padding, Margin, globalStyles } from "../GlobalStyles";
import { useSelector } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import PressedText from "../components/PressedText";
import t from "../actions/changeLanguage";
import Header from "../components/Header";
import transition from "../actions/transition";

const SignUpOptions = () => {
  const { language } = useSelector(state => state.languageState);
  const navigation = useNavigation();
  const [trigger, setTrigger] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setTrigger(true);
    }, 150);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%" }}
        source={require('../assets/onboardingBk1.png')}
      >
        <Header lastSlide={true} />

        <Animated.Image
          style={{ flex: 1, width: "90%", maxWidth: 450, transform: [{ translateY: transition(50, 0, 300, trigger) }], opacity: transition(0, 1, 300, trigger) }}
          resizeMode="contain"
          source={require("../assets/image-2.png")}
        />
        <Animated.Text
          style={[globalStyles.title, { fontSize: 20, paddingHorizontal: Padding.page_p, transform: [{ translateY: transition(50, 0, 500, trigger) }], opacity: transition(0, 1, 500, trigger) }]}>
          {t("Join us and explore new ways of learning.")}
        </Animated.Text>
        <Animated.Text
          style={[styles.content, { paddingHorizontal: Padding.page_p, transform: [{ translateY: transition(50, 0, 600, trigger) }], opacity: transition(0, 1, 600, trigger) }]}>
          {t("Whether you are a teacher, a student, or a parent, we have something for you.")}
        </Animated.Text>
        <View style={{ marginTop: Margin.m_lg, gap: 10 }} >
          <Text style={[styles.content, { color: Color.darkcyan }]} >{t("join as")}</Text>
          <PrimaryButton style={[styles.button, { width: 250 }]} onPress={() => navigation.navigate("SignUpScreen", { user: "student", isParent: false })} >
            <Text style={[styles.title, { color: Color.white }]}>
              {t("student")}
            </Text>
          </PrimaryButton>
          <View style={[styles.flexContainer, { gap: 10 }]}>
            <PrimaryButton style={[styles.button, styles.secButton]} onPress={() => navigation.navigate('SignUpScreen', { user: "teacher" })} >
              <Text style={[styles.title, { color: Color.darkcyan }]}>
                {t("teacher")}
              </Text>
            </PrimaryButton>
            <PrimaryButton style={[styles.button, styles.secButton]} onPress={() => navigation.navigate("SignUpScreen", { user: "student", isParent: true })} >
              <Text style={[styles.title, { color: Color.darkcyan }]}>
                {t("parent")}
              </Text>
            </PrimaryButton>
          </View>
        </View>
        <View style={[styles.flexContainer, { marginBottom: Margin.m_base }]} >
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
    width: 120,
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
