import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { Color, FontFamily, FontSize, Padding, fontEm } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import DividerWithText from '../components/DividerWithText ';
import FancyInput from '../components/TextInput';
import FancyButton from '../components/FancyButton';
import PressedText from '../components/PressedText';
import { useNavigation } from '@react-navigation/core';
import { submitCheck } from '../actions/GlobalFunctions';
import t from "../actions/cahngeLanguage";
import { useSelector } from "react-redux";
import { Lock_Svg, Mail_OutLine_Svg } from '../assets/icons/Icons';

export default function SigninScreen() {
    const navigation = useNavigation();
    const { language } = useSelector(state => state.languageState);
    const [state, setState] = useState({})
    const [{ email, password }, setSignInData] = useState({ email: "", password: "" });
    const [checkInputs, setCheckInputs] = useState(false)


    const handleSubmit = () => {
        if (submitCheck({ email, password }).isValid) {
            console.log("submit");
        } else {
            setCheckInputs(true)
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView style={{ flex: 1 }}>
                <View style={[styles.container]} >
                    <BackHeader title={t("sign in")} />
                    <View style={[styles.form]}>
                        <Text style={styles.title}>{t("welcome-again")}</Text>
                        <FancyInput inputType={"email"} value={email} setState={setState}
                            checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                            placeholder={t("email-input")}
                            keyboardType={"email-address"}
                            changHandler={(e) => setSignInData(pv => ({ ...pv, email: e }))}
                        >
                            <Mail_OutLine_Svg />
                        </FancyInput>
                        <FancyInput inputType={"password"} placeholder={t("password-input")}
                            checkInputs={checkInputs} setCheckInputs={setCheckInputs} value={password}
                            setState={setState}
                            changHandler={(e) => setSignInData(pv => ({ ...pv, password: e }))}
                        >
                            <Lock_Svg />
                        </FancyInput>
                        <View style={[styles.inputField, styles.forgetPass, { justifyContent: "flex-start" }]}>
                            {state.error && <Text style={styles.error}>{state.error?.message[language]}</Text>}
                        </View>
                        <View style={[styles.inputField, styles.forgetPass, { margin: fontEm(1), justifyContent: "flex-end" }]}>
                            <PressedText title={t("forgot-password")} pressHandler={() => console.log("pressed")} />
                        </View>
                        <FancyButton title={[t("sign in"), Color.darkcyan, Color.white]} pressHandler={handleSubmit} />
                        <View style={[styles.signUP, { flexDirection: language === "en" ? "row-reverse" : "row" }]}>
                            <PressedText title={t("sign up")} pressHandler={() => navigation.navigate("SignUpOptions")} />
                            <Text style={styles.regularText}>{t("dont-have-account")}</Text>
                        </View>
                        <DividerWithText text="او" />
                        <FancyButton title={[t("sign in with google"), Color.input_fill, Color.black]}
                            customStyles={{ borderWidth: 2, borderColor: Color.input_stroke }}
                            leftIcon={["logo-google", fontEm(2), "orange"]}
                            pressHandler={() => console.log("pressed")} />
                    </View>
                </View>
            </ScrollView>

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
        // flexDirection: "row",
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
        fontSize: fontEm(1.2),
    },
    signUP: {
        paddingHorizontal: Padding.p_8xl,
        marginVertical: fontEm(1),
        alignItems: "center",
    }
})