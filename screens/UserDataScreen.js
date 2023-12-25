import { Keyboard, TouchableWithoutFeedback, ScrollView, View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import FancyInput from '../components/TextInput';
import t from '../actions/changeLanguage'
import BackHeader from '../components/BackHeader'
import { Calender_Svg, Language_Svg, Parent_Phone_Svg, School_SVG } from '../assets/icons/Icons'
import { Color, Margin, globalStyles } from '../GlobalStyles';
import CustomText from '../components/CustemText';
import { submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import DatePicker from '../components/DatePicker';
import ListInput from '../components/ListInput';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../store/actions/userActions';
import { schoolTypes } from '../data';
import PrimaryButton from '../components/PrimaryButton';
import LoadingModal from '../components/LoadingModal';

export default function UserDataScreen({ route }) {
    const { signUpData: data } = route.params;
    const { language } = useSelector(state => state.languageState)
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const { schoolYears: years } = useSelector(state => state.schoolYearsState);
    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState(data);
    const [checkInputs, setCheckInputs] = useState(false)
    const navigation = useNavigation();
    const [phoneNumberPlaceholder] = [t("placeholder-parent-phone")];
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const { parentPhoneNumber, birthDay } = signUpData
        const schoolYear = signUpData?.schoolYear?.en
        const educationType = signUpData?.educationType?.en
        if (submitCheck({ phone: parentPhoneNumber }).isValid && birthDay && educationType && schoolYear) {
            setState({})
            dispatch(register({ ...signUpData, educationType, schoolYear }))
        } else {
            setCheckInputs(true)
        }
    };
    useEffect(() => {
        if (userInfo) {
            navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
            });
        }
    }, [userInfo])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }} >
                <BackHeader title={t("personal-data")} />
                <LoadingModal visible={loading} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}>
                    <View style={globalStyles.bodyContainer} >
                        <View style={[globalStyles.form]}>
                            <CustomText style={[globalStyles.title, { marginBottom: Margin.m_xl }]}>{t("sign-up-thanks")}</CustomText>
                            {!signUpData.isParent &&
                                <FancyInput inputType={"phone"} value={signUpData.parentPhoneNumber || ""} setState={setState}
                                    checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                                    placeholder={phoneNumberPlaceholder} keyboardType={"phone-pad"}
                                    changHandler={(e) => setSignUpData(pv => ({ ...pv, parentPhoneNumber: e }))}
                                >
                                    <Parent_Phone_Svg />
                                </FancyInput>
                            }
                            <ListInput
                                setState={setState}
                                checkInputs={checkInputs}
                                value={signUpData.schoolYear?.[language] || ""}
                                data={years} placeholder={t("placeholder-schoole-year")}
                                changHandler={(e) => setSignUpData(pv => ({ ...pv, schoolYear: e || "" }))}
                            >
                                <School_SVG />
                            </ListInput>
                            <DatePicker
                                setState={setState}
                                checkInputs={checkInputs}
                                placeholder={t("placeholder-birth-day")}
                                value={signUpData.birthDay || ""}
                                changHandler={(e) => setSignUpData(pv => ({ ...pv, birthDay: e || "" }))}
                            >
                                <Calender_Svg />
                            </DatePicker>
                            <ListInput
                                setState={setState}
                                checkInputs={checkInputs}
                                value={signUpData.educationType?.[language] || ""}
                                data={schoolTypes} placeholder={t("placeholder-education-type")}
                                changHandler={(e) => setSignUpData(pv => ({ ...pv, educationType: e || "" }))}
                            >
                                <Language_Svg />
                            </ListInput>
                            <View style={[globalStyles.parentFlexBox, { width: "100%" }]}>
                                {(state.error || error) && <Text style={[globalStyles.smallText, { color: Color.red }]}>{state.error?.message[language] || state.error?.message}</Text>}
                            </View>
                            <PrimaryButton disabled={loading} style={{ marginTop: Margin.m_lg }} onPress={handleSubmit}>
                                <Text style={[globalStyles.title, { color: Color.white }]}>
                                    {t(loading ? "loading" : "submit")}
                                </Text>
                            </PrimaryButton>
                            {/* <PressedText title={"logout"} pressHandler={() => dispatch(signOut())} /> */}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback >

    )
}

