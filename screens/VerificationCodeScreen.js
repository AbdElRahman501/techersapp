import { Keyboard, StyleSheet, TouchableWithoutFeedback, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import BackHeader from '../components/BackHeader'
import t from '../actions/changeLanguage'
import { formatPhoneNumber } from '../actions/GlobalFunctions';
import CustomText from '../components/CustemText';
import { Color, FontFamily, FontSize, Margin, Padding, fontEm, heightPercentage } from '../GlobalStyles';
import PressedText from '../components/PressedText';
import { useSelector } from 'react-redux';
import OTPInput from '../components/OTP';
import CountdownTimer from '../components/CountdownTimer';
import { useNavigation } from '@react-navigation/core';

export default function VerificationCodeScreen({ route }) {
    const { language } = useSelector(state => state.languageState)
    const { userData } = route.params;
    const navigation = useNavigation();
    const [resend, setResend] = useState(false);

    const handleOTPComplete = otp => {
        navigation.navigate("ResetPasswordScreen", { userData })
    };
    const handleCountdownFinish = () => {
        setResend(true)
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView style={{ flex: 1, backgroundColor: Color.white }}>
                <BackHeader />
                <View style={[styles.container]} >
                    <View style={[styles.form]}>
                        <CustomText style={styles.title}>{t("enter-verification-code-title")}</CustomText>
                        <CustomText style={styles.regularText}>{t("enter-verification-code-description", { number: formatPhoneNumber(userData.parentPhone || userData.email) })}</CustomText>
                        <OTPInput onComplete={handleOTPComplete} />
                        <CountdownTimer initialTime={60} onCountdownFinish={handleCountdownFinish} resend={resend} setResend={setResend} />
                        <View style={[styles.parentFlexBox, { width: "100%", flexDirection: language === 'en' ? "row" : "row-reverse", flexWrap: "wrap" }]}>
                            <CustomText style={styles.regularText}>{t("didn't-receive")}</CustomText>
                            <PressedText disabled={!resend} title={t("resend")} pressHandler={() => setResend(false)} />
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
        width: "100%",
        alignItems: 'center',
        justifyContent: "center",
        minHeight: heightPercentage(80)
    },
    parentFlexBox: {
        justifyContent: "center",
        flexDirection: "row",
        alignItems: "center",

    },
    form: {
        width: "100%",
        marginVertical: Margin.m_base,
        paddingHorizontal: Padding.page_p,
    },
    title: {
        fontSize: FontSize.size_xxl,
        fontFamily: FontFamily.montserratArabic,
        marginBottom: Margin.m_base,
        textAlign: "center",

    },
    regularText: {
        fontSize: FontSize.size_base,
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic,
        marginBottom: Margin.m_base,
        textAlign: "center",

    },



})