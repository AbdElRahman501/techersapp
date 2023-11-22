import { Text, View, TouchableWithoutFeedback, ScrollView, Keyboard, Image, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontSize, Margin, Padding, globalStyles } from '../GlobalStyles'
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
            dispatch(signIn({ emailOrPhoneNumber, password, navigateToUserScreen }))
        } else {
            setCheckInputs(true)
        }
    };

    const navigateToUserScreen = (students) => {
        const signUpData = {
            role: "student",
            policy: true,
            isParent: true,
            password: password,
            parentPhoneNumber: students[0].parentPhoneNumber,
        }
        navigation.navigate("UserData1", { students, signUpData })
    }
    useEffect(() => {
        if (userInfo?.role === "student") {
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        } else if (userInfo?.role === "teacher") {
            navigation.reset({
                index: 0,
                routes: [{ name: "TeachersHomeScreen" }],
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
                    contentContainerStyle={{ flex: 1 }}>
                    <View style={[globalStyles.bodyContainer]} >
                        <View style={[globalStyles.form]}>
                            <Image
                                style={globalStyles.logo}
                                resizeMode="contain"
                                source={require('../assets/logoColoredTextMs.png')}
                            />
                            <Text style={globalStyles.title}>{t("welcome-again")}</Text>
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
                            <View style={[globalStyles.parentFlexBox, { width: "100%" }]}>
                                {state.error && <Text style={[globalStyles.smallText, { color: Color.red }]}>{state.error?.message[language] || state.error?.message}</Text>}
                            </View>
                            <View style={[globalStyles.parentFlexBox, { width: "100%", flexDirection: language === 'en' ? "row" : "row-reverse", marginVertical: Margin.m_sm }]}>
                                <PressedText title={t("forgot-password")} pressHandler={() => console.log("pressed")} />
                            </View>
                            <PrimaryButton onPress={handleSubmit} disabled={state.error}>
                                <Text style={[globalStyles.title, { color: Color.white }]}>
                                    {t("sign in")}
                                </Text>
                            </PrimaryButton>

                            <View style={[globalStyles.parentFlexBox, { paddingHorizontal: Padding.p_8xl, marginVertical: Margin.m_base, flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
                                <Text style={globalStyles.regular}>{t("dont-have-account")}</Text>
                                <PressedText style={{ marginRight: 8 }} title={t("sign up")} pressHandler={() => navigation.navigate("SignUpOptions")} />
                            </View>
                            <DividerWithText text={t("or")} />
                            <PrimaryButton style={globalStyles.googleButton} onPress={() => console.log("pressed google")} >
                                <Ionicons style={{ marginRight: Margin.m_base }} name={"logo-google"} size={FontSize.size_lg}
                                    color={Color.orange} />
                                <Text style={[globalStyles.title]}>
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
