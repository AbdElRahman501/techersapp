import { Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView, SafeAreaView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Color, Margin, globalStyles } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import PressedText from '../components/PressedText';
import { useNavigation } from '@react-navigation/core';
import Checkbox from '../components/Checkbox';
import t from "../actions/changeLanguage";
import { useSelector } from 'react-redux'
import CustomText from '../components/CustemText';
import PrimaryButton from '../components/PrimaryButton';
import LoadingModal from '../components/LoadingModal';
import PhoneInput from '../components/PhoneInput';
import { getErrorMessage, isDataExpired, modifyStudent } from '../actions/GlobalFunctions';
import { PHONE_VERIFICATION_URL } from '../store/actions/api';
import axios from 'axios';
import AlertModal from '../components/alertModal';
import VerifyPhoneModal from '../components/VerifyPhoneModal';
import { schoolTypes, years } from '../data';


export default function SignUpScreen({ route }) {
    const { user } = route.params;
    const { language } = useSelector(state => state.languageState)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const navigation = useNavigation();
    const [signUpData, setSignUpData] = useState({ role: user, policy: false, phoneNumber: "" });
    const [valid, setValid] = useState(false);
    const [formattedPhone, setFormattedPhone] = useState("");
    const [signIn, change] = [t("sign in"), t("change")];
    const resendDuration = 90

    const [visible, setVisible] = useState(false);

    const handleSubmit = () => {
        if (!valid) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
        } else {
            phoneNumberVerification(signUpData.phoneNumber)

        }
    };
    const phoneNumberVerification = async (phoneNumber) => {
        if (!isDataExpired(data?.time, resendDuration) && data?.phoneNumber === phoneNumber) {
            setVisible(true)
            return
        }
        setLoading(true)
        try {
            const { data: { students, ...data } } = await axios.post(PHONE_VERIFICATION_URL, { phoneNumber, formattedPhone });
            if (!data) return
            console.log("🚀 ~ file: SignupScreen.js:51 ~ phoneNumberVerification ~ data:", data)
            setLoading(false)
            setData({ students: students.map(student => modifyStudent(student, years, schoolTypes)), ...data })
            setVisible(true)
        } catch (error) {
            setLoading(false)
            let errorMessage = getErrorMessage(error?.response?.data || error)?.message
            setErrorMessage(errorMessage || "")
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
                <AlertModal
                    visible={errorMessage !== null}
                    imageSource={require('../assets/icons/alert.png')}
                    title={errorMessage?.title[language] || errorMessage}
                    content={errorMessage?.content[language] || ""}
                    primaryButton={change}
                    secondaryButton={errorMessage ? signIn : null}
                    primaryButtonSubmit={() => setErrorMessage(null)}
                    secondaryButtonSubmit={() => { setErrorMessage(null); navigation.navigate("SigninScreen", { phoneNumber: signUpData.phoneNumber }) }}
                />
                <VerifyPhoneModal visible={visible} resendDuration={resendDuration} data={data} phoneNumberVerification={phoneNumberVerification} onClose={() => setVisible(false)} signUpData={signUpData} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}>
                    <View style={globalStyles.bodyContainer} >
                        <View style={[globalStyles.form]}>
                            <ImageBackground
                                style={globalStyles.logo}
                                resizeMode="contain"
                                source={require('../assets/logoColoredTextMs.png')}
                            />
                            <PhoneInput value={signUpData.phoneNumber} onChangHandler={changeHandler} setFormattedPhone={setFormattedPhone} />

                            <View style={[globalStyles.parentFlexBox, { width: "100%", maxWidth: 500, flexDirection: language === 'en' ? "row" : "row-reverse", justifyContent: "flex-start", marginVertical: Margin.m_sm }]}>
                                <Checkbox checked={signUpData.policy} onChange={(e) => setSignUpData(pv => ({ ...pv, policy: e }))} />
                                <View style={[globalStyles.parentFlexBox, { width: "80%", flexDirection: language === 'en' ? "row" : "row-reverse", flexWrap: "wrap" }]}>
                                    <CustomText style={globalStyles.regular}>{t("agree-to-terms-and-conditions-1")}</CustomText>
                                    <PressedText title={t("agree-to-terms-and-conditions-2")} pressHandler={() => console.log("pressed")} />
                                    <CustomText style={globalStyles.regular}>{t("and")}</CustomText>
                                    <PressedText title={t("agree-to-terms-and-conditions-3")} pressHandler={() => console.log("pressed")} />
                                    <CustomText style={globalStyles.regular}>{t("agree-to-terms-and-conditions-4")}</CustomText>
                                </View>

                            </View>
                            <PrimaryButton onPress={handleSubmit} disabled={!signUpData.policy || !valid}>
                                <Text style={[globalStyles.title, { color: Color.white }]}>
                                    {t("sign up")}
                                </Text>
                            </PrimaryButton>
                            <View style={[globalStyles.parentFlexBox, { marginVertical: Margin.m_base, flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
                                <Text style={globalStyles.regular}>{t("already have an account")}</Text>
                                <PressedText style={{ marginRight: 8 }} title={t("sign in")} pressHandler={() => navigation.navigate("SigninScreen")} />
                            </View>
                            {/* <DividerWithText text={t("or")} />
                            <PrimaryButton style={[globalStyles.secondaryButton, { borderColor: Color.lightGray }]} onPress={() => console.log("pressed")} disabled={!signUpData.policy}>
                                <Ionicons style={{ marginRight: Margin.m_base }} name={"logo-google"} size={FontSize.size_lg}
                                    color={Color.orange} />
                                <Text style={[globalStyles.title, { color: Color.black }]}>
                                    {t("sign up with google")}
                                </Text>
                            </PrimaryButton> */}

                        </View>

                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback >
    )
}
