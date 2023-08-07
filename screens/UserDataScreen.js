import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import FancyInput from '../components/TextInput';
import t from '../actions/cahngeLanguage'
import BackHeader from '../components/BackHeader'
import { Address_Mark_Svg, Calender_Svg, Language_Svg, Lock_Svg, Mail_OutLine_Svg, Parent_Phone_Svg, School_SVG, Student_Phone_SVG, User_Icon_Svg } from '../assets/icons/Icons'
import { Color, FontFamily, fontEm } from '../GlobalStyles';
import CustomText from '../components/CustemText';
import FancyButton from '../components/FancyButton';
import { submitCheck } from '../actions/GlobalFunctions';

export default function UserDataScreen({ route }) {
    const { user } = route.params;

    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState({ user, phone: "", parentPhone: "" });
    const [checkInputs, setCheckInputs] = useState(false)


    const handleSubmit = () => {
        if (submitCheck({ phone: signUpData.parentPhone }).isValid) {
            console.log("submit");
            console.log("🚀 ~ file: UserDataScreen.js:17 ~ UserDataScreen ~ signUpData:", signUpData)

        } else {
            setCheckInputs(true)
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container]} >
                <BackHeader title={t("personal-data")} />
                <View style={[styles.form]}>
                    <CustomText style={styles.title}>{t("sign-up-thanks")}</CustomText>

                    <FancyInput inputType={"phone"} value={signUpData.phone} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={t("placeholder-student-phone")} leftIcon={"checkmark"}
                        changHandler={(e) => setSignUpData(pv => ({ ...pv, phone: e }))}
                    >
                        <Student_Phone_SVG />
                    </FancyInput>
                    <FancyInput inputType={"phone"} value={signUpData.parentPhone} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={t("placeholder-parent-phone")} leftIcon={"checkmark"}
                        changHandler={(e) => setSignUpData(pv => ({ ...pv, parentPhone: e }))}
                    >
                        <Parent_Phone_Svg />
                    </FancyInput>
                    <FancyInput inputType={"addres"} value={signUpData.address} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={t("placeholder-address")} leftIcon={"checkmark"}
                        changHandler={(e) => setSignUpData(pv => ({ ...pv, address: e }))}
                    >
                        <Address_Mark_Svg />
                    </FancyInput>
                    <FancyInput inputType={"list"} value={signUpData.schooleYear} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={t("placeholder-schoole-year")} leftIcon={"checkmark"}
                        changHandler={(e) => setSignUpData(pv => ({ ...pv, schooleYear: e }))}
                    >
                        <School_SVG />
                    </FancyInput>
                    <FancyInput inputType={"date"} value={signUpData.birthDay} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={t("placeholder-birth-day")} leftIcon={"checkmark"}
                        changHandler={(e) => setSignUpData(pv => ({ ...pv, birthDay: e }))}
                    >
                        <Calender_Svg />
                    </FancyInput>
                    <FancyInput inputType={"list"} value={signUpData.eduType} setState={setState}
                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                        placeholder={t("placeholder-education-type")} leftIcon={"checkmark"}
                        changHandler={(e) => setSignUpData(pv => ({ ...pv, eduType: e }))}
                    >
                        <Language_Svg />
                    </FancyInput>
                    <FancyButton customStyles={styles.button} title={[t("submit"), Color.darkcyan, Color.white]} pressHandler={handleSubmit} disabled={false} />

                </View>


            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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