import React, { useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, ImageBackground, ScrollView, View, Text } from 'react-native'
import BackHeader from '../components/BackHeader'
import { Border, Color, FontFamily, FontSize, fontEm } from '../GlobalStyles';
import FancyInput from '../components/TextInput';
import t from '../actions/changeLanguage';
import { useSelector } from 'react-redux';
import CustomText from '../components/CustemText';
import { Lock_Svg } from '../assets/icons/Icons';
import FancyButton from '../components/FancyButton';
import { getTextInputAlign, submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';

const ResetPasswordScreen = () => {
    const { language } = useSelector(state => state.languageState)
    const navigation = useNavigation();

    const [checkInputs, setCheckInputs] = useState(false)
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [state, setState] = useState({})


    const handleSubmit = () => {
        if (password === confirmPassword) {
            if (submitCheck({ password, password: confirmPassword }).isValid) {
                navigation.navigate("HomeScreen")
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
            <ScrollView style={{ flex: 1 }}>
                <View style={[styles.container]} >
                    <BackHeader />
                    <View style={[styles.form]}>
                        <ImageBackground
                            style={{ height: fontEm(6), alignSelf: "center", width: "100%",marginBottom: fontEm(1) }}
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
                        <FancyButton customStyles={{ marginTop: fontEm(2) }} title={[t("submit"), Color.darkcyan, Color.white]} pressHandler={handleSubmit} />
                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    form: {
        flex: 1,
        width: "100%",
        marginVertical: fontEm(1.5),
        paddingHorizontal: fontEm(1),
    },
    title: {
        fontSize: fontEm(2),
        fontFamily: FontFamily.montserratArabic,
        marginBottom: fontEm(0.5),
        textAlign: "center",

    },
    regularText: {
        fontSize: fontEm(1),
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic,
        marginBottom: fontEm(0.5),
        textAlign: "center",

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
