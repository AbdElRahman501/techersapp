import { Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView, SafeAreaView, Image, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, Margin, globalStyles } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import FancyInput from '../components/TextInput';
import { submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import t from "../actions/changeLanguage";
import { useSelector } from 'react-redux'
import { Lock_Svg, User_Icon_Svg } from '../assets/icons/Icons';
import PrimaryButton from '../components/PrimaryButton';
import DividerWithText from '../components/DividerWithText ';
import CustomText from '../components/CustemText';
import StudentOption from '../components/StudentOption';
import GenderSelection from '../components/GenderSelection';
import Checkbox from '../components/Checkbox';


export default function UserDataFirstScreen({ route }) {
    const { students, signUpData: data } = route.params;
    const { language } = useSelector(state => state.languageState)
    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState({ ...data, fullName: "", isParent: data.isParent || students?.length > 0, gender: "", password: data.password || "" });
    const [checkInputs, setCheckInputs] = useState(false)

    const [trigger, setTrigger] = useState(students?.length > 0)
    const [signInAs, namePlaceholder, passwordPlaceholder, iamParentText, or, continueText, createNewStudent] = [t("sign in as"), t("full-name-student"), t("password-input"), t("iam parent"), t("or"), t("continue"), t("create new student")]
    const navigation = useNavigation();

    const handleSubmit = () => {
        if (trigger) return setTrigger(false)
        if (submitCheck({ password: signUpData.password, name: signUpData.fullName, gender: signUpData.gender }).isValid) {
            navigation.navigate("AddressScreen", { signUpData: signUpData })
        } else {
            setCheckInputs(true)
        }
    };

    useEffect(() => {
        if (data.phoneNumber) {
            let { phoneNumber, parentPhoneNumber, ...restOfData } = signUpData
            if (signUpData.isParent) {
                setSignUpData({ ...restOfData, parentPhoneNumber: data.phoneNumber })
            } else {
                setSignUpData({ ...restOfData, phoneNumber: data.phoneNumber })
            }
        }
    }, [signUpData.isParent])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
                <BackHeader title={t("sign-up-student")} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1 }}>
                    <View style={globalStyles.bodyContainer} >
                        <View style={[globalStyles.form]}>
                            <ImageBackground
                                style={globalStyles.logo}
                                resizeMode="contain"
                                source={require('../assets/logoColoredTextMs.png')}
                            />
                            <View style={{ width: "100%", display: trigger ? "flex" : 'none' }}>
                                <CustomText style={globalStyles.title}> {signInAs} </CustomText>
                                {students.map((student => <StudentOption key={student.id} student={student} />))}
                                <DividerWithText text={or} />
                            </View>
                            <View style={{ width: "100%", display: trigger ? "none" : 'flex' }}>
                                <GenderSelection role={data.role} checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                                    setState={setState}
                                    genderSelection={(e) => setSignUpData({ ...signUpData, gender: e })} gender={signUpData.gender}
                                />
                                <FancyInput inputType={"name"} value={signUpData.fullName} setState={setState}
                                    checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                                    autoCapitalize="words"
                                    placeholder={namePlaceholder}
                                    changHandler={(e) => setSignUpData(pv => ({ ...pv, fullName: e }))}
                                >
                                    <User_Icon_Svg />
                                </FancyInput>
                                {!data.password &&
                                    <FancyInput inputType={"password"} value={signUpData.password} setState={setState}
                                        checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                                        placeholder={passwordPlaceholder} rightIcon={"lock-closed-outline"}
                                        changHandler={(e) => setSignUpData(pv => ({ ...pv, password: e }))}
                                    >
                                        <Lock_Svg />
                                    </FancyInput>
                                }
                                <View style={[globalStyles.parentFlexBox, { width: "100%" }]}>
                                    {state.error && <Text style={[globalStyles.smallText, { color: Color.red }]}>{state.error?.message[language] || state.error?.message}</Text>}
                                </View>
                            </View>
                            <PrimaryButton style={{ marginTop: Margin.m_lg }} onPress={handleSubmit} disabled={state.error}>
                                <Text style={[globalStyles.title, { color: Color.white }]}>
                                    {students.length > 0 ? createNewStudent : continueText}
                                </Text>
                            </PrimaryButton>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback >
    )
}