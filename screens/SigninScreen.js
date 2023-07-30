import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { Color, FontFamily, FontSize, Padding, fontEm } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import DividerWithText from '../components/DividerWithText ';
import FancyInput from '../components/TextInput';
import FancyButton from '../components/FancyButton';
import PressedText from '../components/PressedText';
import { useNavigation } from '@react-navigation/core';
import { submitCheck } from '../actions/GlobalFunctions';

export default function SigninScreen() {
    const navigation = useNavigation();
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
            <View style={[styles.container]} >
                <BackHeader title={"تسجيل الدخول"} />
                <View style={[styles.form]}>
                    <Text style={styles.title}>مرحبا بك من جديد</Text>
                    <FancyInput inputType={"email"} value={email} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={"ادخل عنوان بريدك الاكتروني"}
                        rightIcon={"mail-outline"} leftIcon={"checkmark"}
                        changHandler={(e) => setSignInData(pv => ({ ...pv, email: e }))}
                    />
                    <FancyInput inputType={"password"} placeholder={"ادخل كلمه مرور"}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs} value={password}
                        rightIcon={"lock-closed-outline"} setState={setState}
                        changHandler={(e) => setSignInData(pv => ({ ...pv, password: e }))}
                    />
                    <View style={[styles.inputField, styles.forgetPass, { justifyContent: "flex-start" }]}>
                        {state.error && <Text style={styles.error}>{state.error?.message}</Text>}
                    </View>
                    <View style={[styles.inputField, styles.forgetPass, { margin: fontEm(1), justifyContent: "flex-end" }]}>
                        <PressedText title={"نسيت كلمه المرور ؟"} pressHandler={() => console.log("pressed")} />
                    </View>
                    <FancyButton title={["تسجيل الدخول", Color.darkcyan, Color.white]} pressHandler={handleSubmit} />
                    <View style={[styles.parentFlexBox, { paddingHorizontal: Padding.p_8xl, marginVertical: fontEm(1) }]}>
                        <PressedText title={"انشاء حساب"} pressHandler={() => navigation.navigate("SignUpOptions")} />
                        <Text style={styles.regularText}>ليس لديك حساب ؟</Text>
                    </View>
                    <DividerWithText text="او" />
                    <FancyButton title={["تسجيل الدخول بستخدام جوجل", Color.input_fill, Color.black]}
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
        fontSize: fontEm(1.2),
    },
})