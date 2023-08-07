import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontFamily, FontSize, Margin, Padding, fontEm } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import DividerWithText from '../components/DividerWithText ';
import FancyInput from '../components/TextInput';
import FancyButton from '../components/FancyButton';
import PressedText from '../components/PressedText';
import { useNavigation } from '@react-navigation/core';
import Checkbox from '../components/Checkbox';
import { submitCheck } from '../actions/GlobalFunctions';
import t from "../actions/cahngeLanguage";
import { useSelector } from 'react-redux'
import CustomText from '../components/CustemText';


export default function SignUpScreen({ route }) {
    const { user } = route.params;
    const { language } = useSelector(state => state.languageState)
    const navigation = useNavigation();
    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState({ user, fullName: "", policy: false, email: "", password: "" });
    const [checkInputs, setCheckInputs] = useState(false)


    const handleSubmit = () => {
        if (submitCheck({ email: signUpData.email, password: signUpData.password, name: signUpData.fullName }).isValid) {
            navigation.navigate("UserDataScreen", { user })
        } else {
            setCheckInputs(true)
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container]} >
                <BackHeader title={user === "teacher" ? t("sign-up-teacher") : t("sign-up-student")} />
                <View style={[styles.form]}>
                    <FancyInput inputType={"name"} value={signUpData.fullName} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={user === "teacher" ? t("full-name-teacher") : t("full-name-student")}
                        rightIcon={"person-outline"} leftIcon={"checkmark"}
                        changHandler={(e) => setSignUpData(pv => ({ ...pv, fullName: e }))}
                    />
                    <FancyInput inputType={"email"} value={signUpData.email} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={t("email-input")}
                        rightIcon={"mail-outline"} leftIcon={"checkmark"}
                        changHandler={(e) => setSignUpData(pv => ({ ...pv, email: e }))}
                    />
                    <FancyInput inputType={"password"} value={signUpData.password} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={t("password-input")} rightIcon={"lock-closed-outline"}
                        changHandler={(e) => setSignUpData(pv => ({ ...pv, password: e }))}
                    />
                    <View style={[styles.inputField, styles.forgetPass, { justifyContent: "flex-start" }]}>
                        {state.error && <Text style={styles.error}>{state.error?.message}</Text>}
                    </View>
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
                    <FancyButton title={[t("sign up"), Color.darkcyan, Color.white]} pressHandler={handleSubmit} disabled={!signUpData.policy} />
                    <View style={[styles.parentFlexBox, { paddingHorizontal: Padding.p_8xl, marginVertical: Margin.m_base, flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
                        <Text style={styles.regularText}>{t("already have an account")}</Text>
                        <PressedText style={{ marginRight: 8 }} title={t("sign in")} pressHandler={() => navigation.navigate("SignUpOptions")} />
                    </View>
                    <DividerWithText text={t("or")} />
                    <FancyButton title={[t("sign up with google"), Color.input_fill, Color.black]}
                        customStyles={{ borderWidth: 2, borderColor: Color.input_stroke }}
                        leftIcon={["logo-google", fontEm(2), "orange"]}
                        pressHandler={() => console.log("pressed")} />
                </View>
            </View>

        </TouchableWithoutFeedback >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
    },
    parentFlexBox: {
        flexDirection: "row",
        alignItems: "center",

    },
    form: {
        marginVertical: fontEm(1.5),
        paddingHorizontal: fontEm(1),
        flex: 1,
        width: "100%",
        alignItems: 'center'
    },
    inputField: {
        width: "100%",
        maxWidth: 500,
    },
    error: {
        color: "red",
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: fontEm(1.2),
        fontFamily: FontFamily.montserratArabic,
        marginBottom: fontEm(1)
    },
    forgetPass: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },

    regularText: {
        color: Color.black,
        fontFamily: FontFamily.montserratArabic,
        fontSize: fontEm(1),
    },
})