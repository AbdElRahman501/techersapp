import { Text, View, TouchableWithoutFeedback, ImageBackground, Keyboard, ScrollView, SafeAreaView } from 'react-native'
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
import LoadingModal from '../components/LoadingModal';
import GenderSelection from '../components/GenderSelection';


export default function TeacherSignUpScreen({ route }) {
  const { signUpData: data } = route.params;
  const { language } = useSelector(state => state.languageState)
  const { loading, userInfo, error } = useSelector(state => state.userInfo);
  const [state, setState] = useState({})
  const [signUpData, setSignUpData] = useState({ ...data, name: "", gender: "", password: "" });
  const [checkInputs, setCheckInputs] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [namePlaceholder, passwordPlaceholder] = [t("full-name-teacher"), t("password-input")]
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    setSubmitted(true)
    if (submitCheck({ password: signUpData.password, name: signUpData.name, gender: signUpData.gender }).isValid) {
      // dispatch(teacherRegister(signUpData))
      navigation.navigate("AddressScreen", { signUpData })
    } else {
      setCheckInputs(true)
    }
  };


  useEffect(() => {
    if (error?.message && submitted) {
      setState({ error })
    }
  }, [error]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
        <BackHeader title={t("sign-up-teacher")} />
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

              <View style={{ width: "100%" }}>
                <GenderSelection role={data.role} checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                  setState={setState}
                  genderSelection={(e) => setSignUpData({ ...signUpData, gender: e })} gender={signUpData.gender}
                />
                <FancyInput inputType={"name"} value={signUpData.name} setState={setState}
                  checkInputs={checkInputs} setCheckInputs={setCheckInputs}
                  autoCapitalize="words"
                  placeholder={namePlaceholder}
                  changHandler={(e) => setSignUpData(pv => ({ ...pv, name: e }))}
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
                  {t("continue")}
                </Text>
              </PrimaryButton>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback >
  )
}