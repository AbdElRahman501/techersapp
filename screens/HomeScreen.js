import { ScrollView, SafeAreaView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, globalStyles } from '../GlobalStyles'
import HomeHeader from '../components/HomeHeader'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import AdsSlider from '../components/AdsSlider';
import SearchBar from '../components/SearchBar';
import t from '../actions/changeLanguage';
import SlideContainer from '../components/SlideContainer';
import Subject from '../components/Subject';
import ContainerTitle from '../components/ContainerTitle';
import TeacherCard from '../components/TeacherCard';
import TapBottomNavigator from '../components/TapBottomNavigator';
import FilterButton from '../components/FilterButton';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { userInfo } = useSelector(state => state.userInfo);
  const { language } = useSelector(state => state.languageState);
  const { closeTeacher } = useSelector(state => state.closeTeachersState);
  const { myTeachers } = useSelector(state => state.myTeachersState);
  const { myGroups } = useSelector(state => state.myGroupsState);
  const { subjects } = useSelector(state => state.subjectsState)
  const { schoolYears } = useSelector(state => state.schoolYearsState)
  const [myFavTeachers, setMyFavTeachers] = useState([])
  const [subjectTitle, myFavTeachersTitle, myTeachersTitle, closeTeacherTitle, seeAll] = [t("my-subjects"), t("my-fav-teachers"), t("my teachers"), t("close teacher"), t("see-all")]

  useEffect(() => {
    if (!userInfo) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SigninScreen' }],
      });
    }
  }, [userInfo]);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[globalStyles.body]}>
          <HomeHeader user={userInfo} language={language} schoolYears={schoolYears} />
          {closeTeacher?.length > 0 && <AdsSlider data={closeTeacher} />}
          <View style={{ flexDirection: "row", gap: 20, width: "100%" }} >
            <SearchBar button={true} />
            <FilterButton button={true} />
          </View>
          <ContainerTitle style={{ marginTop: 0 }} title={subjectTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
          <SlideContainer data={subjects} myGroups={myGroups} language={language}  >
            <Subject />
          </SlideContainer>
          {myFavTeachers?.length > 0 && <>
            <ContainerTitle title={myFavTeachersTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
            <SlideContainer data={myFavTeachers} subjects={subjects} language={language}  >
              <TeacherCard />
            </SlideContainer>
          </>}
          {myTeachers?.length > 0 && <>
            <ContainerTitle title={myTeachersTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
            <SlideContainer data={myTeachers} subjects={subjects} language={language}  >
              <TeacherCard />
            </SlideContainer>
          </>}
          {closeTeacher?.length > 0 && <>
            <ContainerTitle title={closeTeacherTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
            <SlideContainer data={closeTeacher} subjects={subjects} language={language}  >
              <TeacherCard />
            </SlideContainer>
          </>}
        </View>
      </ScrollView>
      <TapBottomNavigator currentScreen={"Home"} />
    </SafeAreaView>
  )
}
