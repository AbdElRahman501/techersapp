import { StyleSheet, Text, View, TouchableWithoutFeedback, ScrollView, Keyboard, Image, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontFamily, FontSize, Margin, Padding, fontEm, heightPercentage } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import DividerWithText from '../components/DividerWithText ';
import FancyInput from '../components/TextInput';
import PressedText from '../components/PressedText';
import { useNavigation } from "@react-navigation/native";
import { submitCheck } from '../actions/GlobalFunctions';
import t from "../actions/changeLanguage";
import { useDispatch, useSelector } from "react-redux";
import { Lock_Svg, Mail_OutLine_Svg } from '../assets/icons/Icons';
import { signIn } from '../store/actions/userActions';
import { userData } from '../data';
import PrimaryButton from '../components/PrimaryButton';
import { Ionicons } from '@expo/vector-icons';
import LoadingModal from '../components/LoadingModal';

export default function SigninScreen({ route }) {
    const phoneNumber = route.params?.phoneNumber
    const navigation = useNavigation();
    const { language } = useSelector(state => state.languageState);
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const [state, setState] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [{ emailOrPhoneNumber, password }, setSignInData] = useState({ emailOrPhoneNumber: phoneNumber || "", password: "" });
    const [checkInputs, setCheckInputs] = useState(false)
    const dispatch = useDispatch();

    const handleSubmit = () => {
        setSubmitted(true)
        if (submitCheck({ emailOrPhoneNumber, password }).isValid) {
            dispatch(signIn({ emailOrPhoneNumber, password }))
        } else {
            setCheckInputs(true)
        }
    };

    useEffect(() => {
        if (userInfo && !userInfo?.unCompleted) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        } else if (userInfo?.unCompleted) {
            navigation.reset({
                index: 0,
                routes: [{ name: "UserDataScreen" }],
            });
        }
    }, [userInfo])

    useEffect(() => {
        if (error?.message && submitted) {
            setState({ error })
        }
    }, [error]);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
                <BackHeader title={t("sign in")} />
                <LoadingModal visible={loading} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <View style={[styles.container]} >
                        <View style={[styles.form]}>
                            <Image
                                style={{ height: fontEm(6), width: "100%", marginBottom: fontEm(1), alignSelf: "center" }}
                                resizeMode="contain"
                                source={require('../assets/logoColoredTextMs.png')}
                            />
                            <Text style={styles.title}>{t("welcome-again")}</Text>
                            <FancyInput inputType={"emailOrPhoneNumber"} value={emailOrPhoneNumber} setState={setState}
                                checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                                placeholder={t("email or phone input")}
                                changHandler={(e) => setSignInData(pv => ({ ...pv, emailOrPhoneNumber: e }))}
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
                                {state.error && <Text style={styles.error}>{state.error?.message[language] || state.error?.message}</Text>}
                            </View>
                            <View style={[styles.inputField, styles.forgetPass, { margin: Margin.m_base, justifyContent: "flex-end" }]}>
                                <PressedText title={t("forgot-password")} pressHandler={() => console.log("pressed")} />
                            </View>
                            <PrimaryButton onPress={handleSubmit} disabled={state.error}>
                                <Text style={[styles.title, { color: Color.white }]}>
                                    {t("sign in")}
                                </Text>
                            </PrimaryButton>

                            <View style={[styles.parentFlexBox, { paddingHorizontal: Padding.p_8xl, marginVertical: Margin.m_base, flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
                                <Text style={styles.regularText}>{t("dont-have-account")}</Text>
                                <PressedText style={{ marginRight: 8 }} title={t("sign up")} pressHandler={() => navigation.navigate("SignUpOptions")} />
                            </View>
                            <DividerWithText text="او" />
                            <PrimaryButton style={styles.googleButton} onPress={() => dispatch(signIn(userData))} >
                                <Ionicons style={{ marginRight: Margin.m_base }} name={"logo-google"} size={FontSize.size_lg}
                                    color={Color.orange} />
                                <Text style={[styles.title]}>
                                    {t("sign in with google")}
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
        marginTop: 5
    },
    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    },
    forgetPass: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    googleButton: {
        maxWidth: 400,
        backgroundColor: Color.input_fill,
        borderColor: Color.lightGray,
        borderWidth: 2
    },
    regularText: {
        color: Color.black,
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_base,
    },
})