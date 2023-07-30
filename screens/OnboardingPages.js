import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Text, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, widthPercentage, heightPercentage, fontEm } from "../GlobalStyles";
import { TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';


export default function OnboardingPages() {
  const navigation = useNavigation();
  const [num, setNum] = useState(0)

  const info = [{
    backgroundImageSource: require('../assets/onboardingBk1.png'),
    imageSource: require('../assets/image1.png'),
    title: "يمكن للطلاب العثور علي كل المعلمين بالقرب منهم",
    content: "يمكنك التطبيق من البحث عن معلم عن طريق ادخال الاسم او الماده او المنطقه"
  }, {
    backgroundImageSource: require('../assets/onboardingBk2.png'),
    imageSource: require('../assets/onboarding2.png'),
    title: "يمكن للأباء متابعه تقدم اولادهم",
    content: "يمكن التطبيق الأباء من معرفه مواعيد الدروس و واجبات و امتحانات و الحضور والغياب لاولاده"
  }, {
    backgroundImageSource: require('../assets/onboardingBk3.png'),
    imageSource: require('../assets/onboarding3.png'),
    title: "يمكن للمعلم اضافه فعاليات الطلاب ومتابعة تقدمهم",
    content: "اضافة الواجبات و نتائج الامتحانات و متابعه حضور الطلاب و نتائج امتحاناتهم و مدفوعاتهم الماليه"
  }]

  const next = () => {
    if (num < info.length - 1) {
      setNum(pv => pv + 1)
    } else {
      navigation.navigate("SignUpOptions")
      setTimeout(() => {
        setNum(0)
      }, 500);
    }
  }

  return (
    <ImageBackground
      style={[styles.onboarding1Icon, styles.frameFlexBox]}
      imageStyle={{
        height: "80%",
        resizeMode: "contain",
        alignSelf: "flex-start"
      }}
      source={info[num].backgroundImageSource}
    >
      <TouchableOpacity
        style={[styles.skipButton, styles.parentFlexBox]}
        onPress={() => navigation.navigate("SignUpOptions")}
      >
        <Text style={styles.skipButtonText}>{num !== info.length - 1 && "تخطي"}</Text>
      </TouchableOpacity>
      <SafeAreaView style={styles.frameFlexBox}>

        <ImageBackground
          style={styles.image1Icon}
          resizeMode="contain"
          source={info[num].imageSource}
        />
        <View
          style={[styles.rectangleParent, styles.parentFlexBox]}
          collapsable
        >
          {info.map((x, i) => <Animated.View key={i} style={[num === i ? styles.frameChild : styles.frameItem, styles.frameLayout]} />)}
        </View>
        <Text style={[styles.title, styles.headlineTypo]} > {info[num].title} </Text>
        <Text style={[styles.content, styles.headlineTypo]}> {info[num].content} </Text>
      </SafeAreaView>
      <TouchableOpacity
        style={[styles.parent, styles.parentFlexBox]}
        onPress={next}
      >
        <Text style={styles.parentText}> {num === info.length - 1 ? "ابدأ الان" : "التالي"}</Text>
        {num !== info.length - 1 && <Ionicons name="arrow-forward" size={24}
          color={Color.white} />}
      </TouchableOpacity>

    </ImageBackground>
  );
};

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
    textAlign: "center",
    justifyContent: "center"
    // fontFamily: FontFamily.montserratArabic,
  },
  skipButton: {
    marginTop: fontEm(1),
    marginBottom: fontEm(1),
    width: "80%",
    justifyContent: "flex-end"
  },
  skipButtonText: {
    fontSize: fontEm(1),
    color: Color.gray_200,
    fontFamily: FontFamily.montserratArabic
  },
  image1Icon: {
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
    alignSelf: "stretch",
    fontFamily: FontFamily.montserratArabic

  },
  content: {
    fontSize: fontEm(1),
    color: Color.gray_200,
    margin: 12,
    alignSelf: "stretch",
    fontFamily: FontFamily.montserratArabic

  },
  parent: {
    borderRadius: Border.br_13xl,
    height: fontEm(3.5),
    width: "80%",
    justifyContent: "center",
    backgroundColor: Color.darkcyan
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
    backgroundColor: "#fff",
    flex: 1,
    paddingVertical: 74,
  },
});

