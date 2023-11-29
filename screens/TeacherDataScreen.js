import { Keyboard, TouchableWithoutFeedback, ScrollView, View, Text, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import t from '../actions/changeLanguage'
import BackHeader from '../components/BackHeader'
import { School_SVG } from '../assets/icons/Icons'
import { Color, Margin, globalStyles } from '../GlobalStyles';
import CustomText from '../components/CustemText';
import { useNavigation } from '@react-navigation/core';
import ListInput from '../components/ListInput';
import { useSelector, useDispatch } from 'react-redux';
import { teacherRegister } from '../store/actions/userActions';
import { years } from '../data';
import PrimaryButton from '../components/PrimaryButton';
import LoadingModal from '../components/LoadingModal';

export default function TeacherDataScreen({ route }) {
  const { signUpData } = route.params;
  const { language } = useSelector(state => state.languageState)
  const { loading, userInfo, error } = useSelector(state => state.userInfo);
  const { subjects } = useSelector(state => state.subjectsState);
  const [state, setState] = useState({})
  const [subject, setSubject] = useState("")
  const [schoolYears, setSchoolYears] = useState([])
  const [checkInputs, setCheckInputs] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const mainSubject = { subject: subject?.en, schoolYears: [schoolYears.en] }
    if (mainSubject) {
      setState({})
      dispatch(teacherRegister({ ...signUpData, mainSubject, verified: true }))
    } else {
      setCheckInputs(true)
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigation.reset({
        index: 0,
        routes: [{ name: "TeachersHomeScreen" }],
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
              <ListInput
                setState={setState}
                checkInputs={checkInputs}
                value={subject?.[language] || ""}
                data={subjects} placeholder={t("my-subjects")}
                changHandler={(e) => setSubject(e)}
              >
                <School_SVG />
              </ListInput>
              <ListInput
                setState={setState}
                checkInputs={checkInputs}
                value={schoolYears?.[language] || ""}
                data={years} placeholder={t("placeholder-schoole-year")}
                changHandler={(e) => setSchoolYears(e)}
              >
                <School_SVG />
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

