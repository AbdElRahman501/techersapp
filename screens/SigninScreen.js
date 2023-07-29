import { StyleSheet, Dimensions, Image, TouchableOpacity, Text, View, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Border, Color, FontFamily, FontSize, Height, Margin, Padding } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import { Ionicons } from '@expo/vector-icons';
import DividerWithText from '../components/DividerWithText ';
import FancyInput from '../components/TextInput';
import FancyButton from '../components/FancyButton';
import PressedText from '../components/PressedText';
import { useNavigation } from '@react-navigation/core';

export default function SigninScreen() {
    const navigation = useNavigation();
    const [state, setState] = useState({ error: false, success: false })
    const [signInData, setSignInData] = useState({ email: "", password: "" });
    

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container]} >
                <BackHeader title={"تسجيل الدخول"} />
                <View style={[styles.form]}>
                    <Text style={styles.title}>مرحبا بك من جديد</Text>
                    <FancyInput placeholder={"ادخل عنوان البريد الاكتروني"} value={signInData.email} state={state}
                        rightIcon={"mail-outline"} leftIcon={"checkmark"}
                        changHandler={(e) => setSignInData(pv => ({ ...pv, email: e }))}
                    />
                    <FancyInput placeholder={"ادخل كلمة المرور"}
                        secureText={true} value={signInData.password} rightIcon={"lock-closed-outline"} state={state}
                        changHandler={(e) => setSignInData(pv => ({ ...pv, password: e }))}
                    />
                    <View style={[styles.inputField, styles.forgetPass, { justifyContent: state.error ? "space-between" : "flex-end" }]}>
                        {state.error && <Text style={styles.error}>*كلمة المرور التي ادخلتها غير صحيحه</Text>}
                        <PressedText title={"نسيت كلمه المرور ؟"} pressHandler={() => console.log("pressed")} />
                    </View>
                    <FancyButton title={["تسجيل الدخول", Color.darkcyan, Color.white]} pressHandler={() => console.log("🚀 ~ file: SigninScreen.js:16 ~ SigninScreen ~ signInData:", signInData)} />
                    <View style={[styles.parentFlexBox, { paddingHorizontal: Padding.p_8xl, marginVertical: Margin.m_base }]}>
                        <PressedText title={"انشاء حساب"} pressHandler={() => navigation.navigate("SignUpOptions")} />
                        <Text style={styles.regularText}>ليس لديك حساب ؟</Text>
                    </View>
                    <DividerWithText text="او" />
                    <FancyButton title={["تسجيل الدخول بستخدام جوجل", Color.input_fill, Color.black]}
                        customStyles={{ borderWidth: 2, borderColor: Color.input_stroke }}
                        leftIcon={["logo-google", 32, "orange"]}
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
        marginVertical: 74,
        paddingHorizontal: Padding.p_8xl,
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
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
        marginBottom: 18
    },
    forgetPass: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },

    regularText: {
        color: Color.black,
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_md,
    },
})