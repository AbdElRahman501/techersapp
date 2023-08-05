import { StyleSheet, View, ImageBackground, Text, Animated, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import { Color, Border, FontFamily, widthPercentage, heightPercentage, fontEm } from "../GlobalStyles";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function OBoardingSlides({ num, setLastSlide }) {
    const language = useSelector(state => state.languageState.language);

    const info = [{
        backgroundImageSource: require('../assets/onboardingBk1.png'),
        imageSource: require('../assets/image1.png'),
        title: {
            ar: "العثور على أقرب معلم للطلاب",
            en: "Find the Nearest Teachers for Students"
        },
        content: {
            ar: "يمكنك استخدام التطبيق للبحث عن معلم بالاسم أو المادة أو المنطقة",
            en: "The app can help you search for a teacher by name, subject, or location."
        }
    }, {
        backgroundImageSource: require('../assets/onboardingBk2.png'),
        imageSource: require('../assets/onboarding2.png'),
        title: {
            ar: "متابعة تقدم الأبناء للأهل",
            en: "Track Your Children's Progress for Parents"
        },
        content: {
            ar: "يمكن للأهل معرفة مواعيد الدروس والواجبات والامتحانات وحضور وغياب أولادهم",
            en: "The Al Ostaz App can help parents know their children's class schedules, homework, exams, and attendance."
        }
    }, {
        backgroundImageSource: require('../assets/onboardingBk3.png'),
        imageSource: require('../assets/onboarding3.png'),
        title: {
            ar: "إضافة فعاليات ومتابعة تقدم الطلاب للمعلمين",
            en: "Teachers Can Add Student Activities and Track Their Progress"
        },
        content: {
            ar: "يمكن للمعلمين إضافة واجبات ونتائج الامتحانات ومتابعة حضور ونتائج الطلاب ومدفوعاتهم المالية",
            en: "Teachers can add homework, exam grades, track student attendance, grades, and payments."
        }
    }];
    useEffect(() => {
        if (num === info.length - 1) {
            setLastSlide(true)
        } else (setLastSlide(false))
    }, [num])
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
                <Text style={[styles.title, styles.headlineTypo]} >{info[num].title[language]}</Text>
                <Text style={[styles.content, styles.headlineTypo]}>{info[num].content[language]}</Text>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    frameFlexBox: {
        flex: 1,
        alignItems: "center",
    },
    parentFlexBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    headlineTypo: {
        justifyContent: "center",
        textAlign: "center"
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
    onboarding1Icon: {
        flex: 1
      },
})