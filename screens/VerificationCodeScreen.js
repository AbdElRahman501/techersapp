import { Keyboard, TouchableWithoutFeedback, ScrollView, View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import BackHeader from '../components/BackHeader'
import t from '../actions/changeLanguage'
import { formatPhoneNumber } from '../actions/GlobalFunctions';
import CustomText from '../components/CustemText';
import { Color, Margin, fontEm, globalStyles, heightPercentage } from '../GlobalStyles';
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
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }} >
                <BackHeader />
                <ScrollView style={{ flex: 1 }}>
                    <View style={[globalStyles.container, { minHeight: heightPercentage(80) }]} >
                        <View style={{ width: "100%" }}>
                            <CustomText style={[globalStyles.title, { marginBottom: Margin.m_base, textAlign: "center", }]}>{t("enter-verification-code-title")}</CustomText>
                            <CustomText style={[globalStyles.regular, { marginBottom: Margin.m_base, color: Color.gray_200, textAlign: "center", }]}>{t("enter-verification-code-description", { number: formatPhoneNumber(userData.parentPhone || userData.email) })}</CustomText>
                            <View style={globalStyles.container}>
                                <OTPInput onComplete={handleOTPComplete} />
                            </View>
                            <CountdownTimer initialTime={60} onCountdownFinish={handleCountdownFinish} resend={resend} setResend={setResend} />
                            <View style={[globalStyles.container, { width: "100%", flexDirection: language === 'en' ? "row" : "row-reverse", flexWrap: "wrap" }]}>
                                <CustomText style={[globalStyles.regular, { color: Color.gray_200 }]}>{t("didn't-receive")}</CustomText>
                                <PressedText disabled={!resend} title={t("resend")} pressHandler={() => setResend(false)} />
                            </View>
                            <PressedText style={{ textAlign: "center", marginVertical: fontEm(1) }} title={t("use-email")} pressHandler={() => console.log("pressed")} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback >
    )
}

