import { StyleSheet, Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView, SafeAreaView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Color, FontFamily, FontSize, Margin, Padding, fontEm, heightPercentage } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import DividerWithText from '../components/DividerWithText ';
import PressedText from '../components/PressedText';
import { useNavigation } from '@react-navigation/core';
import Checkbox from '../components/Checkbox';
import t from "../actions/changeLanguage";
import { useDispatch, useSelector } from 'react-redux'
import CustomText from '../components/CustemText';
import PrimaryButton from '../components/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';
import LoadingModal from '../components/LoadingModal';
import PhoneInput from '../components/PhoneInput';
import { getErrorMessage } from '../actions/GlobalFunctions';
import { PHONE_VERIFICATION_URL } from '../store/actions/api';
import axios from 'axios';
import CustomModal from '../components/CustomModal';


export default function SignUpScreen({ route }) {
    const { user } = route.params;
    const { language } = useSelector(state => state.languageState)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const navigation = useNavigation();
    const [signUpData, setSignUpData] = useState({ role: user, policy: false, phoneNumber: "" });
    const [valid, setValid] = useState(false);
    const [formattedPhone, setFormattedPhone] = useState("");

    const handleSubmit = () => {
        if (!valid) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
        } else {
            phoneNumberVerification(signUpData.phoneNumber)
        }
    };
    const phoneNumberVerification = async (phoneNumber) => {
        setLoading(true)
        try {
            const { data } = await axios.post(PHONE_VERIFICATION_URL, { phoneNumber, formattedPhone });
            if (!data) return
            setLoading(false)
            navigation.navigate("VerificationCodeScreen", { phoneNumber, code: data.code })
        } catch (error) {
            setLoading(false)
            let errorMessage = getErrorMessage(error?.response?.data || error)?.message
            setErrorMessage(errorMessage)
        }
    }

    const changeHandler = (text, valid) => {
        setSignUpData(pv => ({ ...pv, phoneNumber: text }));
        setValid(valid);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
                <BackHeader title={user === "teacher" ? t("sign-up-teacher") : t("sign-up-student")} />
                <LoadingModal visible={loading} />
                <CustomModal visible={errorMessage !== ""} onClose={() => setErrorMessage("")} buttonTitle={t("sign in")} handleSubmit={() => navigation.navigate("SigninScreen", { phoneNumber: signUpData.phoneNumber })} message={errorMessage[language]} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <View style={[styles.container]} >
                        <View style={[styles.form]}>
                            <ImageBackground
                                style={{ height: fontEm(6), width: "100%", marginBottom: fontEm(1), alignSelf: "center" }}
                                resizeMode="contain"
                                source={require('../assets/logoColoredTextMs.png')}
                            />
                            <PhoneInput value={signUpData.phoneNumber} onChangHandler={changeHandler} setFormattedPhone={setFormattedPhone} />

                            <View style={[styles.inputField, styles.parentFlexBox, { flexDirection: language === 'en' ? "row" : "row-reverse", justifyContent: "flex-start", marginVertical: fontEm(1) }]}>
                                <Checkbox checked={signUpData.policy} onChange={(e) => setSignUpData(pv => ({ ...pv, policy: e }))} />
                                <View style={[styles.parentFlexBox, { width: "80%", flexDirection: language === 'en' ? "row" : "row-reverse", flexWrap: "wrap" }]}>
                                    <CustomText style={styles.regularText}>{t("agree-to-terms-and-conditions-1")}</CustomText>
                                    <PressedText title={t("agree-to-terms-and-conditions-2")} pressHandler={() => console.log("pressed")} />
                                    <CustomText style={styles.regularText}>{t("and")}</CustomText>
                                    <PressedText title={t("agree-to-terms-and-conditions-3")} pressHandler={() => console.log("pressed")} />
                                    <CustomText style={styles.regularText}>{t("agree-to-terms-and-conditions-4")}</CustomText>
                                </View>

                            </View>
                            <PrimaryButton onPress={handleSubmit} disabled={!signUpData.policy || !valid}>
                                <Text style={styles.title}>
                                    {t("sign up")}
                                </Text>
                            </PrimaryButton>
                            <View style={[styles.parentFlexBox, { paddingHorizontal: Padding.p_8xl, marginVertical: Margin.m_base, flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
                                <Text style={styles.regularText}>{t("already have an account")}</Text>
                                <PressedText style={{ marginRight: 8 }} title={t("sign in")} pressHandler={() => navigation.navigate("SigninScreen")} />
                            </View>
                            <DividerWithText text={t("or")} />
                            <PrimaryButton style={styles.googleButton} onPress={() => console.log("pressed")} disabled={!signUpData.policy}>
                                <Ionicons style={{ marginRight: Margin.m_base }} name={"logo-google"} size={FontSize.size_lg}
                                    color={Color.orange} />
                                <Text style={[styles.title, { color: Color.black }]}>
                                    {t("sign up with google")}
                                </Text>
                            </PrimaryButton>

                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: "center",
        minHeight: heightPercentage(80),
        paddingHorizontal: Padding.page_p,

    },
    parentFlexBox: {
        flexDirection: "row",
        alignItems: "center",

    },
    form: {
        marginVertical: Margin.m_base,
        marginHorizontal: Margin.m_base,
        width: "100%",
        alignItems: 'center',
        maxWidth: 400
    },
    inputField: {
        width: "100%",
        maxWidth: 500,
    },
    error: {
        color: "red",
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.montserratArabic,
        paddingHorizontal: 8,
        marginVertical: 5
    },
    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
        color: Color.white
    },
    forgetPass: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    googleButton: {
        maxWidth: 400,
        backgroundColor: Color.white,
        borderColor: Color.lightGray,
        borderWidth: 2
    },
    regularText: {
        color: Color.black,
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_base,
    },
})