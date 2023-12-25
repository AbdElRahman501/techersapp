import React, { useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, ImageBackground, ScrollView, View, Text, SafeAreaView } from 'react-native'
import BackHeader from '../components/BackHeader'
import { Color, FontFamily, FontSize, Margin, Padding, fontEm, globalStyles, heightPercentage } from '../GlobalStyles';
import FancyInput from '../components/TextInput';
import t from '../actions/changeLanguage';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '../components/CustemText';
import { Lock_Svg } from '../assets/icons/Icons';
import { getErrorMessage, submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import PrimaryButton from '../components/PrimaryButton';
import { signIn, update } from '../store/actions/userActions';
import Axios from 'axios';
import { RESET_PASSWORD_URL } from '../store/actions/api';
import AlertModal from '../components/alertModal';

const ResetPasswordScreen = ({ route }) => {
    const { emailOrPhoneNumber } = route?.params
    const { language } = useSelector(state => state.languageState)
    const navigation = useNavigation();
    const [checkInputs, setCheckInputs] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [state, setState] = useState({})
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const resetPassword = async () => {
        setLoading(true)
        try {
            let { data: { message } } = await Axios.put(RESET_PASSWORD_URL, { emailOrPhoneNumber, newPassword: password });
            setLoading(false)
            if (!message) return
            if (message === "Password reset Successfully") {
                setVisible(true)
            }
        } catch (error) {
            setLoading(false)
            let errorMessage = getErrorMessage(error?.response?.data || error)?.message
            console.log("🚀 ~ file: ResetPasswordScreen.js:39 ~ resetPassword ~ errorMessage:", errorMessage)
        }
    }
    const handleSubmit = () => {
        if (password === confirmPassword) {
            if (submitCheck({ password, password: confirmPassword }).isValid) {
                resetPassword()
            } else {
                setCheckInputs(true)
            }
        } else {
            setState({
                error: {
                    message: {
                        ar: 'كلمة المرور غير متطابقة',
                        en: 'Passwords do not match'
                    }
                }
            })
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
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
                <BackHeader />
                <AlertModal
                    visible={visible}
                    imageSource={require('../assets/icons/alert.png')}
                    title={"Password reset successfully"}
                    content={"Sign in to your account"}
                    primaryButton={"sign in"}
                    primaryButtonSubmit={() => dispatch(signIn({ emailOrPhoneNumber, password, navigateToUserScreen }))}
                />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container} >
                        <View style={styles.form}>
                            <ImageBackground
                                style={{ height: fontEm(6), alignSelf: "center", width: "100%", marginBottom: fontEm(1) }}
                                resizeMode="contain"
                                source={require('../assets/logoColoredTextMs.png')}
                            />
                            <CustomText style={globalStyles.title}>{t("create-new-password")}</CustomText>
                            <CustomText style={[globalStyles.regular, { color: Color.gray_200, marginVertical: Margin.m_base }]}>{t("create-new-password-description")}</CustomText>
                            <FancyInput inputType={"password"} placeholder={t("password-input")}
                                checkInputs={checkInputs} setCheckInputs={setCheckInputs} value={password}
                                setState={setState}
                                changHandler={(e) => setPassword(e)}
                            >
                                <Lock_Svg />
                            </FancyInput>
                            <FancyInput inputType={"password"} placeholder={t("password-input-confirm")}
                                checkInputs={checkInputs} setCheckInputs={setCheckInputs} value={confirmPassword}
                                setState={setState}
                                changHandler={(e) => setConfirmPassword(e)}
                            >
                                <Lock_Svg />
                            </FancyInput>

                            <View style={[globalStyles.rowContainer, { width: "100%" }]}>
                                {state.error && <Text style={[globalStyles.smallText, { color: Color.red, padding: 5 }]}>{state.error?.message[language]}</Text>}
                            </View>
                            <PrimaryButton style={{ marginTop: Margin.m_lg }} onPress={handleSubmit}>
                                <Text style={[globalStyles.title, { color: Color.white }]}>
                                    {t(loading ? "loading" : "submit")}
                                </Text>
                            </PrimaryButton>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: 'center',
        justifyContent: "center",
        minHeight: heightPercentage(80),
        paddingHorizontal: Padding.page_p,

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
    },
    forgetPass: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
});

export default ResetPasswordScreen;
