import { Keyboard, StyleSheet, TouchableWithoutFeedback, ScrollView, View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import FancyInput from '../components/TextInput';
import t from '../actions/changeLanguage'
import BackHeader from '../components/BackHeader'
import { Address_Mark_Svg, Calender_Svg, Language_Svg, Parent_Phone_Svg, School_SVG, Student_Phone_SVG } from '../assets/icons/Icons'
import { Color, FontFamily, FontSize, Margin, Padding, heightPercentage } from '../GlobalStyles';
import CustomText from '../components/CustemText';
import { submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import DatePicker from '../components/DatePicker';
import ListInput from '../components/ListInput';
import { useSelector, useDispatch } from 'react-redux';
import { register, signIn } from '../store/actions/userActions';
import { years } from '../data';
import { schoolTypes } from '../data';
import PrimaryButton from '../components/PrimaryButton';
import * as data from '../data';

export default function UserDataScreen() {
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState({});
    const [checkInputs, setCheckInputs] = useState(false)
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (submitCheck({ phone: signUpData.parentPhoneNumber }).isValid) {
            console.log("🚀 ~ file: UserDataScreen.js:32 ~ handleSubmit ~ signUpData:", signUpData)
            // let education = schoolTypes.map((x, i) => ({ id: i + 1, ...x })).find(x => x.id === signUpData.educationType);
            // let theShoolYearSelection = years.map((x, i) => ({ id: i + 1, ...x })).find(x => x.id === signUpData.schoolYear);
            dispatch(register(signUpData))
            // dispatch(signIn({ ...data.emptyData, educationType: education, schoolYear: theShoolYearSelection, ...signUpData }))
        } else {
            setCheckInputs(true)
        }
    };
    useEffect(() => {
        console.log("🚀 ~ file: UserDataScreen.js:42 ~ useEffect ~ userInfo:", userInfo)
        if (userInfo && !userInfo?.unCompleted) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        } else if (userInfo && signUpData.name) {
            setSignUpData({ ...userInfo })
        }
    }, [userInfo])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }} >
                <BackHeader title={t("personal-data")} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{ flex: 1 }}>
                    <View style={[styles.container]} >
                        <View style={[styles.form]}>
                            <CustomText style={[styles.title, { marginBottom: Margin.m_xl }]}>{t("sign-up-thanks")}</CustomText>

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
                            <FancyInput inputType={"address"} value={signUpData.address || ""} setState={setState}
                                checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                                placeholder={t("placeholder-address")} leftIcon={"checkmark"}
                                changHandler={(e) => setSignUpData(pv => ({ ...pv, address: e }))}
                            >
                                <Address_Mark_Svg />
                            </FancyInput>
                            <ListInput
                                options={years.map((x, i) => ({ id: i + 1, ...x }))}
                                placeholder={t("placeholder-schoole-year")}
                                value={signUpData.schoolYear || ""}
                                changHandler={(e) => setSignUpData(pv => ({ ...pv, schoolYear: e }))}
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
                                options={schoolTypes.map((x, i) => ({ id: i + 1, ...x }))}
                                placeholder={t("placeholder-education-type")}
                                value={signUpData.educationType || ""}
                                changHandler={(e) => {
                                    console.log(e);
                                    setSignUpData(pv => ({ ...pv, educationType: e }))
                                }}
                            >
                                <Language_Svg />
                            </ListInput>
                            <PrimaryButton style={{ marginTop: Margin.m_lg }} onPress={handleSubmit}>
                                <Text style={[styles.title, { color: Color.white }]}>
                                    {t(loading ? "loading" : "submit")}
                                </Text>
                            </PrimaryButton>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>

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
})