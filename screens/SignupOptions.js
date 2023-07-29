import * as React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Border, FontFamily, Color, FontSize, Padding } from "../GlobalStyles";
import { ImageBackground } from "react-native";

const SignUpOptions = () => {

  const navigation = useNavigation();

  return (
    <View style={[styles.onboarding5, styles.text1FlexBox]}>
      <TouchableOpacity style={[styles.image2Parent, styles.parentShadowBox]}
        onPress={() => navigation.navigate("OnboardingPages")}
      >
        <ImageBackground
          style={[styles.image2Icon, styles.image2IconLayout]}
          imageStyle={{
            resizeMode: "contain",
          }}
          source={require("../assets/image-2.png")}
        />
        <Text style={[styles.text, styles.textTypo]}>انضم كمعلم</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.image2Parent, styles.parentShadowBox]}
        onPress={() => navigation.navigate("OnboardingPages")}
      >
        <ImageBackground
          style={[styles.image2Icon, styles.image2IconLayout]}
          imageStyle={{
            resizeMode: "contain",
          }}
          source={require("../assets/image-3.png")}
        />
        <Text style={[styles.text, styles.textTypo]}>انضم كطالب او ولي أمر </Text>
      </TouchableOpacity>

      <View style={styles.signIn}>
        <TouchableOpacity onPress={() => navigation.navigate("SigninScreen")}>
          <Text style={[styles.signInText, { color: Color.darkcyan, marginRight: 5 }]}>تسجيل الدخول</Text>
        </TouchableOpacity>
        <Text style={styles.signInText}>لديك حساب بالفعل ؟ </Text>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text1FlexBox: {
    justifyContent: "center",
    alignItems: "center",
  },
  parentShadowBox: {
    alignSelf: "stretch",
    padding: 18,
    marginVertical: 24,
    shadowOpacity: 1,
    elevation: 12,
    shadowRadius: 9,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowColor: "rgba(0, 0, 0, 0.60)",
    borderRadius: Border.br_6xl,
    backgroundColor: Color.white,
    overflow: "hidden",
  },
  signIn: {
    position: 'absolute',
    bottom: 74, // Adjust the distance from the bottom as needed
    flexDirection: 'row', // This sets the children in a horizontal layout
    alignItems: 'center', // This centers the children vertically (adjust as needed)
    justifyContent: 'space-between'
  },
  signInText: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserratArabic
  },
  textTypo: {
    marginTop: 24,
    color: Color.darkcyan,
    textAlign: "center",
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.montserratArabic,
  },
  image2Icon: {
    maxWidth: "100%",
    height: 220,
    alignSelf: "stretch",
  },
  onboarding5: {
    flex: 1,
    paddingHorizontal: 48,
    paddingTop: Padding.p_23xl,
    paddingBottom: Padding.p_23xl,
    overflow: "hidden",
    backgroundColor: Color.white,
    justifyContent: "center",
  },
});

export default SignUpOptions;
