import { Keyboard, StyleSheet, TouchableWithoutFeedback, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import FancyInput from '../components/TextInput';
import t from '../actions/changeLanguage'
import BackHeader from '../components/BackHeader'
import { Address_Mark_Svg, Calender_Svg, Language_Svg, Parent_Phone_Svg, School_SVG, Student_Phone_SVG} from '../assets/icons/Icons'
import { Color, FontFamily, fontEm } from '../GlobalStyles';
import CustomText from '../components/CustemText';
import FancyButton from '../components/FancyButton';
import { submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import DatePicker from '../components/DatePicker';
import ListInput from '../components/ListInput';
import { useSelector } from 'react-redux';

export default function UserDataScreen({ route }) {
    const { user } = route.params;
    const { language } = useSelector(state => state.languageState)
    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState({ user, phoneNumber: "", parentPhone: "" });
    const [checkInputs, setCheckInputs] = useState(false)
    const navigation = useNavigation();
    const years = [
        { en: "first", ar: "الصف الاول" },
        { en: "first", ar: "الصف الاول" },
        { en: "first", ar: "الصف الاول" },
        { en: "first", ar: "الصف الاول" }];
    const schoolTypes = [
        { en: "Public School", ar: "مدرسة حكومية" },
        { en: "Private School", ar: "مدرسة خاصة" },
        { en: "International School", ar: "مدرسة دولية" },
        { en: "Language School", ar: "مدرسة لغات" },
        { en: "Experimental School", ar: "مدرسة تجريبية" },
        { en: "Secondary Art School", ar: "مدرسة ثانوية فنية" },
        { en: "Gifted Students School", ar: "مدرسة متفوقين" },
        { en: "Al-Azhar School", ar: "مدرسة الازهر" },
    ];

    const handleSubmit = () => {
        if (submitCheck({ phone: signUpData.parentPhoneNumber }).isValid) {
            navigation.navigate("Home")
        } else {
            setCheckInputs(true)
        }
    };

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