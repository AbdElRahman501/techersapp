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
import { signOut, update } from '../store/actions/userActions';
import { years } from '../data';
import { schoolTypes } from '../data';
import PrimaryButton from '../components/PrimaryButton';
import PressedText from '../components/PressedText';
import Address from '../components/Address';
import governorates from '../locales/governorates.json';
import cities from '../locales/cities.json';
import { getLocation } from '../store/actions/deviceActions';
import LoadingModal from '../components/LoadingModal';

export default function UserDataScreen() {
    const { language } = useSelector(state => state.languageState)
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const { loading: locationLoading, location, error: locationError } = useSelector(state => state.locationState);
    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState({});
    const [checkInputs, setCheckInputs] = useState(false)
    const navigation = useNavigation();
    const [phoneNumberPlaceholder, governoratePlaceholder, cityPlaceholder] = [t("placeholder-parent-phone"), t("placeholder-governorate"), t("placeholder-city")];
    const dispatch = useDispatch();

    const handleSubmit = () => {
        const { governorate, city, parentPhoneNumber, birthDay, educationType, schoolYear } = signUpData
        if (submitCheck({ phone: parentPhoneNumber }).isValid && birthDay && educationType && schoolYear) {
            console.log("🚀 ~ file: UserDataScreen.js:37 ~ handleSubmit ~ signUpData:", signUpData)
            dispatch(update({ ...signUpData, unCompleted: false }))
        } else {
            setCheckInputs(true)
            console.log("🚀 ~ file: UserDataScreen.js:47 ~ handleSubmit ~ setCheckInputs:", true)
        }
    };
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

    useEffect(() => {
        if (!location) {
            dispatch(getLocation())
        }
    }, [location])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }} >
                <BackHeader title={t("personal-data")} />
                <LoadingModal visible={loading || locationLoading} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}>
                    <View style={globalStyles.bodyContainer} >
                        <View style={[globalStyles.form]}>
                            <CustomText style={[globalStyles.title, { marginBottom: Margin.m_xl }]}>{t("sign-up-thanks")}</CustomText>
                            {!userInfo?.parentPhoneNumber &&
                                <FancyInput inputType={"phone"} value={signUpData.parentPhoneNumber || ""} setState={setState}
                                    checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                                    placeholder={phoneNumberPlaceholder} keyboardType={"phone-pad"}
                                    changHandler={(e) => setSignUpData(pv => ({ ...pv, parentPhoneNumber: e }))}
                                >
                                    <Parent_Phone_Svg />
                                </FancyInput>
                            }
                            <View style={{
                                display: location ? 'none' : 'flex', width: "100%",
                                gap: Margin.m_base, flexDirection: language === "en" ? "row" : "row-reverse"
                            }} >
                                <ListInput
                                    style={{ flex: 2 }}
                                    value={signUpData.governorate?.[language] || ""}
                                    data={governorates}
                                    placeholder={governoratePlaceholder}
                                    changHandler={(e) => setSignUpData(pv => ({ ...pv, city: "", governorate: e }))}
                                />
                                {signUpData.governorate &&
                                    <ListInput
                                        style={{ flex: 2 }}
                                        value={signUpData.city?.[language] || ""}
                                        data={cities.filter(x => x.governorate_id === signUpData.governorate.id)}
                                        placeholder={cityPlaceholder}
                                        changHandler={(e) => setSignUpData(pv => ({ ...pv, city: e }))}
                                    />
                                }
                            </View>
                            <ListInput
                                data={years} placeholder={t("placeholder-schoole-year")}
                                changHandler={(e) => setSignUpData(pv => ({ ...pv, schoolYear: e.value }))}
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
                                data={schoolTypes} placeholder={t("placeholder-education-type")}
                                changHandler={(e) => setSignUpData(pv => ({ ...pv, educationType: e.en }))}
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

