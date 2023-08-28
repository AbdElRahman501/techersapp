import { Keyboard, StyleSheet, TouchableWithoutFeedback, ScrollView, View } from 'react-native'
import React, { useState,useEffect } from 'react'
import FancyInput from '../components/TextInput';
import t from '../actions/changeLanguage'
import BackHeader from '../components/BackHeader'
import { Address_Mark_Svg, Calender_Svg, Language_Svg, Parent_Phone_Svg, School_SVG, Student_Phone_SVG } from '../assets/icons/Icons'
import { Color, FontFamily, fontEm } from '../GlobalStyles';
import CustomText from '../components/CustemText';
import FancyButton from '../components/FancyButton';
import { submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import DatePicker from '../components/DatePicker';
import ListInput from '../components/ListInput';
import { useSelector , useDispatch } from 'react-redux';
import { signIn } from '../store/actions/userActions';
import { years } from '../data';
import { schoolTypes } from '../data';

export default function UserDataScreen({ route }) {
    const userData = route.params.signUpData;
    const { language } = useSelector(state => state.languageState)
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState({ ...userData, phoneNumber: "", parentPhone: "" });
    const [checkInputs, setCheckInputs] = useState(false)
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (submitCheck({ phone: signUpData.parentPhoneNumber }).isValid) {
            dispatch(signIn({ email: signUpData.email, phoneNumber: signUpData.phoneNumber, password: signUpData.password }))
        } else {
            setCheckInputs(true)
        }
    };
    useEffect(() => {
        if (userInfo) {
            console.log("🚀 ~ file: UserDataScreen.js:40 ~ useEffect ~ userInfo:", userInfo)
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
            // navigation.navigate("Home")
        }
    }, [userInfo])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ScrollView style={{ flex: 1 }}>
                <View style={[styles.container]} >
                    <BackHeader title={t("personal-data")} />
                    <View style={[styles.form]}>
                        <CustomText style={styles.title}>{t("sign-up-thanks")}</CustomText>

                        <FancyInput inputType={"phone"} value={signUpData.phoneNumber || ""} setState={setState}
                            keyboardType={"phone-pad"}
                            checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                            placeholder={t("placeholder-student-phone")} leftIcon={"checkmark"}
                            changHandler={(e) => setSignUpData(pv => ({ ...pv, phoneNumber: e }))}
                        >
                            <Student_Phone_SVG />
                        </FancyInput>
                        <FancyInput inputType={"phone"} value={signUpData.parentPhoneNumber || ""} setState={setState}
                            checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                            placeholder={t("placeholder-parent-phone")} keyboardType={"phone-pad"}
                            changHandler={(e) => setSignUpData(pv => ({ ...pv, parentPhoneNumber: e }))}
                        >
                            <Parent_Phone_Svg />
                        </FancyInput>
                        <FancyInput inputType={"addres"} value={signUpData.address || ""} setState={setState}
                            checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                            placeholder={t("placeholder-address")} leftIcon={"checkmark"}
                            changHandler={(e) => setSignUpData(pv => ({ ...pv, address: e }))}
                        >
                            <Address_Mark_Svg />
                        </FancyInput>
                        <ListInput
                            options={years.map(x => x[language])}
                            placeholder={t("placeholder-schoole-year")}
                            value={signUpData.schooleYear || ""}
                            changHandler={(e) => setSignUpData(pv => ({ ...pv, schooleYear: e }))}
                        >
                            <School_SVG />
                        </ListInput>
                        <DatePicker
                            placeholder={t("placeholder-birth-day")}
                            value={signUpData.birthDay || ""}
                            changHandler={(e) => setSignUpData(pv => ({ ...pv, birthDay: e }))}
                        >
                            <Calender_Svg />
                        </DatePicker>
                        <ListInput
                            options={schoolTypes.map(x => x[language])}
                            placeholder={t("placeholder-education-type")}
                            value={signUpData.educationType || ""}
                            changHandler={(e) => setSignUpData(pv => ({ ...pv, educationType: e }))}
                        >
                            <Language_Svg />
                        </ListInput>

                        <FancyButton customStyles={styles.button} title={[t("submit"), Color.darkcyan, Color.white]} pressHandler={handleSubmit} disabled={false} />

                    </View>
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    form: {
        marginVertical: fontEm(1.5),
        paddingHorizontal: fontEm(1),
        flex: 1,
        width: "100%",
        alignItems: 'center'
    },
    title: {
        width: "95%",
        fontSize: fontEm(1.2),
        fontFamily: FontFamily.montserratArabic,
        marginBottom: fontEm(1),

    },
    button: {
        marginVertical: fontEm(1.5)
    }
})