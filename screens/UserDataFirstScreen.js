import { Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView, SafeAreaView, Image, Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, Margin, globalStyles } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import FancyInput from '../components/TextInput';
import { submitCheck } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import t from "../actions/changeLanguage";
import { useDispatch, useSelector } from 'react-redux'
import { Lock_Svg, User_Icon_Svg } from '../assets/icons/Icons';
import PrimaryButton from '../components/PrimaryButton';
import DividerWithText from '../components/DividerWithText ';
import CustomText from '../components/CustemText';
import StudentOption from '../components/StudentOption';
import { register } from '../store/actions/userActions';
import LoadingModal from '../components/LoadingModal';
import GenderSelection from '../components/GenderSelection';
import Checkbox from '../components/Checkbox';


export default function UserDataFirstScreen({ route }) {
    const { students, signUpData: data } = route.params;
    const { language } = useSelector(state => state.languageState)
    const { loading, userInfo, error } = useSelector(state => state.userInfo);
    const [state, setState] = useState({})
    const [signUpData, setSignUpData] = useState({ ...data, fullName: "", isParent: data.isParent || students?.length > 0, gender: "", password: data.password || "" });
    const [checkInputs, setCheckInputs] = useState(false)
    const [submitted, setSubmitted] = useState(false)

    const [trigger, setTrigger] = useState(students?.length > 0)
    const [signInAs, namePlaceholder, passwordPlaceholder, iamParentText, or] = [t("sign in as"), t("full-name-student"), t("password-input"), t("iam parent"), t("or")]
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const handleSubmit = () => {
        if (trigger) return setTrigger(false)
        setSubmitted(true)
        if (submitCheck({ password: signUpData.password, name: signUpData.fullName, gender: signUpData.gender }).isValid) {
            dispatch(register({ ...signUpData, unCompleted: true }))
        } else {
            setCheckInputs(true)
        }
    };
    useEffect(() => {
        if (userInfo) {
            if (userInfo && !userInfo?.unCompleted) {
                console.log("🚀 ~ file: SignupScreen.js:62 ~ SignUpScreen ~ userInfo:", userInfo.fullName, "go to Home")
                navigation.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                });
            } else if (userInfo?.unCompleted) {
                console.log("🚀 ~ file: SignupScreen.js:62 ~ SignUpScreen ~ userInfo:", userInfo.fullName, "un Completed go to UserDataScreen")
                navigation.reset({
                    index: 0,
                    routes: [{ name: "UserDataScreen" }],
                });
            }
        }
    }, [userInfo])

    useEffect(() => {
        if (error?.message && submitted) {
            setState({ error })
        }
    }, [error]);


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
                <BackHeader title={"user Data"} />
                <LoadingModal visible={loading} />
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
                            {!students?.length > 0 &&
                                <View style={[globalStyles.parentFlexBox, { width: "100%", maxWidth: 500, flexDirection: language === 'en' ? "row" : "row-reverse", justifyContent: "flex-start" }]}>
                                    <Checkbox checked={signUpData.isParent} onChange={(e) => setSignUpData(pv => ({ ...pv, isParent: e }))} />
                                    <View style={[globalStyles.parentFlexBox, { width: "80%", flexDirection: language === 'en' ? "row" : "row-reverse", flexWrap: "wrap" }]}>
                                        <CustomText style={globalStyles.regular}>{iamParentText}</CustomText>
                                    </View>
                                </View>
                            }

                            <PrimaryButton style={{ marginTop: Margin.m_lg }} onPress={handleSubmit} disabled={state.error}>
                                <Text style={[globalStyles.title, { color: Color.white }]}>
                                    {t("create new student")}
                                </Text>
                            </PrimaryButton>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback >
    )
}