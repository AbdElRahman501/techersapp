import React from 'react'
import { View, Modal } from 'react-native'
import { Color, Margin, globalStyles } from '../GlobalStyles';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import CustomText from './CustemText';
import PressedText from './PressedText';
import CountdownTimer from './CountdownTimer';
import OTPInput from './OTP';
import t from '../actions/changeLanguage'

export default function VerifyPhoneModal({ phoneNumberVerification, resendDuration, data, signUpData, onClose, visible }) {
    const { language } = useSelector(state => state.languageState)
    const { code, students, time } = data
    const navigation = useNavigation();
    const content = t("enter-verification-code-description", { number: signUpData?.phoneNumber })

    const handleOTPComplete = otp => {
        if (code === otp) {
            onClose()
            navigation.navigate("UserData1", { students, signUpData })
        }
    };

    const initialTime = resendDuration - Math.floor(Math.abs(Date.now() - time) / 1000)
    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={globalStyles.modalContainer}>
                <View style={globalStyles.modalContent} >
                    <CustomText style={[globalStyles.title, { marginBottom: Margin.m_base, letterSpacing: 1.2, textAlign: "center", }]}>{t("enter-verification-code-title")}</CustomText>
                    {signUpData?.phoneNumber && <CustomText style={[globalStyles.regular, { letterSpacing: 1.2, lineHeight: 30, color: Color.gray_200, textAlign: "center", }]}>
                        {content}
                    </CustomText>}
                    <PressedText style={{ textAlign: "center" }} title={t("edit")} pressHandler={onClose} />
                    <View>
                        <OTPInput length={code?.length} onComplete={handleOTPComplete} />
                    </View>
                    <CountdownTimer initialTime={Math.max(initialTime, 0)} />
                    <View style={[{ flexDirection: language === 'en' ? "row" : "row-reverse", justifyContent: "center" }]}>
                        <CustomText style={[globalStyles.regular, { color: Color.gray_200 }]}>{t("didn't-receive")}</CustomText>
                        <PressedText disabled={initialTime > 0} title={t("resend")} pressHandler={() => phoneNumberVerification(signUpData?.phoneNumber)} />
                    </View>
                </View>
            </View>
        </Modal>

    )
}

