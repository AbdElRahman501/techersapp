import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, ScrollView, View, Text } from 'react-native'

import React, { useEffect, useRef, useState } from 'react'
import BackHeader from '../components/BackHeader'
import t from '../actions/cahngeLanguage'
import { formatPhoneNumber } from '../actions/GlobalFunctions';
import CustomText from '../components/CustemText';
import { Border, Color, FontFamily, fontEm } from '../GlobalStyles';
import PressedText from '../components/PressedText';
import { useSelector } from 'react-redux';
import OTPInput from '../components/OTP';
import CountdownTimer from '../components/CountdownTimer ';

export default function VerificationCodeScreen({ route }) {
    const { language } = useSelector(state => state.languageState)
    const { userData } = route.params;

    const [time, setTime] = useState("1:59");



    const [first, setFirst] = useState("");
    const [second, setSecond] = useState("");
    const [third, setThird] = useState("");
    const [fourth, setFourse] = useState("");

    const [isFocused, setIsFocused] = useState(false);

    const inputts = [useRef(null), useRef(null), useRef(null), useRef(null)]

    const focusInput = (inputRef) => {
        if (inputRef.current) {
            inputRef.current.focus(); // Use the focus() method on the ref
        }
    };

    useEffect(() => {
        if (first.length === 1) {
            if (second.length === 1) {
                if (third.length === 1) {
                    if (fourth.length === 1) {
                    } else {
                        focusInput(inputts[3])
                    }
                } else {

                    focusInput(inputts[2])
                }
            } else {
                focusInput(inputts[1])
            }
        }

    }, [first, second, third, fourth])

    const handleOTPComplete = otp => {
        console.log(`OTP entered: ${otp}`);
    };
    const handleCountdownFinish = () => {
        console.log("Done!");
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView style={{ flex: 1 }}>
                <View style={[styles.container]} >
                    <BackHeader />
                    <View style={[styles.form]}>
                        <CustomText style={styles.title}>{t("enter-verification-code-title")}</CustomText>
                        <CustomText style={styles.regularText}>{t("enter-verification-code-description", { number: formatPhoneNumber(userData.parentPhone) })}</CustomText>
                        <OTPInput onComplete={handleOTPComplete} />
                        <CountdownTimer initialTime={60} onCountdownFinish={handleCountdownFinish} />
                        <View style={[styles.parentFlexBox, { width: "100%", flexDirection: language === 'en' ? "row" : "row-reverse", flexWrap: "wrap" }]}>
                            <CustomText style={styles.regularText}>{t("didn't-receive")}</CustomText>
                            <PressedText title={t("resend")} pressHandler={() => console.log("pressed")} />
                        </View>
                        <PressedText style={{ textAlign: "center", marginVertical: fontEm(1) }} title={t("use-email")} pressHandler={() => console.log("pressed")} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    parentFlexBox: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",

    },
    form: {
        flex: 1,
        width: "100%",
        marginVertical: fontEm(1.5),
        paddingHorizontal: fontEm(1),
    },
    title: {
        fontSize: fontEm(2),
        fontFamily: FontFamily.montserratArabic,
        marginBottom: fontEm(0.5),
        textAlign: "center",

    },
    regularText: {
        fontSize: fontEm(1),
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic,
        marginBottom: fontEm(0.5),
        textAlign: "center",

    },
    inputContainer: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    input: {
        backgroundColor: Color.white,
        borderRadius: Border.br_6xl,
        borderWidth: 2,
        height: fontEm(4),
        width: fontEm(4),
        fontSize: fontEm(2),
        fontFamily: FontFamily.montserratArabic,
        textAlign: "center",
    },
    fancyButton: {
        marginVertical: fontEm(2),
    }


})