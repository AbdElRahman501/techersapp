import React, { useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback, ImageBackground, ScrollView, View, Text } from 'react-native'
import BackHeader from '../components/BackHeader'
import { Color, FontFamily, FontSize, Margin, Padding, fontEm, heightPercentage } from '../GlobalStyles';
import FancyInput from '../components/TextInput';
import t from '../actions/changeLanguage';
import { useDispatch, useSelector } from 'react-redux';
import CustomText from '../components/CustemText';
import { Lock_Svg } from '../assets/icons/Icons';
import { submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import PrimaryButton from '../components/PrimaryButton';

const ResetPasswordScreen = ({ route }) => {
    const { language } = useSelector(state => state.languageState)
    const { loading, userInfo, error } = useSelector(state => state.userInfo)
    const navigation = useNavigation();
    const { userData } = route.params;
    const [checkInputs, setCheckInputs] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [state, setState] = useState({})
    const dispatch = useDispatch();



    const handleSubmit = () => {
        if (password === confirmPassword) {
            if (submitCheck({ password, password: confirmPassword }).isValid) {
                // dispatch(signIn({ email: userData.email, phoneNumber: userData.phoneNumber, password }))
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

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView style={{ flex: 1, backgroundColor: Color.white }}>
                <BackHeader />
                <View style={styles.container} >
                    <View style={[styles.form]}>
                        <ImageBackground
                            style={{ height: fontEm(6), alignSelf: "center", width: "100%", marginBottom: fontEm(1) }}
                            resizeMode="contain"
                            source={require('../assets/logoColoredTextMs.png')}
                        />
                        <CustomText style={styles.title}>{t("create-new-password")}</CustomText>
                        <CustomText style={styles.regularText}>{t("create-new-password-description")}</CustomText>
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

                        <View style={[styles.inputField, styles.forgetPass, { justifyContent: "flex-start" }]}>
                            {state.error && <Text style={styles.error}>{state.error?.message[language]}</Text>}
                        </View>
                        <PrimaryButton style={{ marginTop: Margin.m_lg }} onPress={handleSubmit}>
                            <Text style={[styles.title, { color: Color.white }]}>
                                {t(loading ? "loading" : "submit")}
                            </Text>
                        </PrimaryButton>
                    </View>
                </View>

            </ScrollView>
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
    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    },
    regularText: {
        color: Color.darkgray,
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_base,
    },
    inputField: {
        width: "100%",
        maxWidth: 500,
    },
    forgetPass: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center"
    },
    error: {
        color: "red",
        fontSize: fontEm(0.9),
        fontFamily: FontFamily.montserratArabic,
        paddingHorizontal: 8,
        marginVertical: 5
    },
});

export default ResetPasswordScreen;
