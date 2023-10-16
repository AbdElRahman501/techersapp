import { Keyboard, TouchableWithoutFeedback, ScrollView, View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import FancyInput from '../components/TextInput';
import t from '../actions/changeLanguage'
import BackHeader from '../components/BackHeader'
import { Address_Mark_Svg, Calender_Svg, Language_Svg, Parent_Phone_Svg, School_SVG } from '../assets/icons/Icons'
import { Color, Margin, globalStyles } from '../GlobalStyles';
import CustomText from '../components/CustemText';
import { submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import DatePicker from '../components/DatePicker';
import ListInput from '../components/ListInput';
import { useSelector, useDispatch } from 'react-redux';
import { register, signOut } from '../store/actions/userActions';
import { years } from '../data';
import { schoolTypes } from '../data';
import PrimaryButton from '../components/PrimaryButton';
import PressedText from '../components/PressedText';

export default function UserDataScreen() {
    const { language } = useSelector(state => state.languageState)
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState({});
    const [checkInputs, setCheckInputs] = useState(false)
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (submitCheck({ phone: signUpData.parentPhoneNumber }).isValid) {
            console.log("🚀 ~ file: UserDataScreen.js:32 ~ handleSubmit ~ signUpData:", signUpData)
            // dispatch(register(signUpData))
        } else {
            setCheckInputs(true)
        }
    };
    console.log("🚀 ~ file: UserDataScreen.js:44 ~ useEffect ~ userInfo:", userInfo)
    useEffect(() => {
        if (userInfo && !userInfo?.unCompleted) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        } else if (userInfo) {
            setSignUpData({ ...userInfo })
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: "SignUpOptions" }],
            });
        }
    }, [userInfo])


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }} >
                <BackHeader title={t("personal-data")} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}>
                    <View style={globalStyles.bodyContainer} >
                        <View style={[globalStyles.form]}>
                            <CustomText style={[globalStyles.title, { marginBottom: Margin.m_xl }]}>{t("sign-up-thanks")}</CustomText>

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
                                options={years.map(x => x[language])}
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
                                options={schoolTypes.map(x => x[language])}
                                placeholder={t("placeholder-education-type")}
                                value={signUpData.educationType || ""}
                                changHandler={(e) => setSignUpData(pv => ({ ...pv, educationType: e }))}
                            >
                                <Language_Svg />
                            </ListInput>
                            <PrimaryButton style={{ marginTop: Margin.m_lg }} onPress={handleSubmit}>
                                <Text style={[globalStyles.title, { color: Color.white }]}>
                                    {t(loading ? "loading" : "submit")}
                                </Text>
                            </PrimaryButton>
                            <PressedText title={"logout"} pressHandler={() => dispatch(signOut())} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback >

    )
}

