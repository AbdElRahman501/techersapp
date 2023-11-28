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
import { getSubject, removeDuplicatesById } from '../actions/GlobalFunctions';
import { Add_Icon } from '../assets/icons/Icons';
import TapBottomNavigator from '../components/TapBottomNavigator';
import FilterButton from '../components/FilterButton';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { userInfo } = useSelector(state => state.userInfo);
  const { closeTeacher } = useSelector(state => state.closeTeachersState);
  const { myTeachers } = useSelector(state => state.myTeachersState);
  const { myGroups } = useSelector(state => state.myGroupsState);
  const { subjects } = useSelector(state => state.subjectsState)
  const [myFavTeachers, setMyFavTeachers] = useState([])
  const [mySubjects, setMySubjects] = useState([])
  const [subjectTitle, myFavTeachersTitle, myTeachersTitle, closeTeacherTitle, seeAll] = [t("my-subjects"), t("my-fav-teachers"), t("my teachers"), t("close teacher"), t("see-all")]


  const item = {
    addButton: true,
    en: "Add Subject", ar: "إضافة مادة",
    imageSource: (props) => <Add_Icon {...props} />
  }


  useEffect(() => {
    if (!userInfo) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SigninScreen' }],
      });
    }
  }, [userInfo]);

  useEffect(() => {
    const subs = removeDuplicatesById(myGroups?.map(x => {
      return getSubject(subjects, x?.subject)
    }))
    setMySubjects([...subs, { ...item, id: 10000 }])
  }, [myGroups]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={[globalStyles.body]}>
          {/* { display: (teachersLoading || myTeachersLoading || myGroupsLoading || loading) ? "none" : "flex" } */}
          {/* <LoadingModal visible={teachersLoading || myTeachersLoading || myGroupsLoading || loading} /> */}
          <HomeHeader user={userInfo} />
          {closeTeacher?.length > 0 && <AdsSlider data={closeTeacher} />}
          <View style={{ flexDirection: "row", gap: 20, width: "100%" }} >
            <SearchBar button={true} />
            <FilterButton button={true} />
          </View>
          <ContainerTitle style={{ marginTop: 0 }} title={subjectTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
          {mySubjects?.length > 0 &&
            <SlideContainer data={mySubjects}  >
              <Subject />
            </SlideContainer>
          }
          {myFavTeachers?.length > 0 && <>
            <ContainerTitle title={myFavTeachersTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
            <SlideContainer data={myFavTeachers}  >
              <TeacherCard />
            </SlideContainer>
          </>}
          {myTeachers?.length > 0 && <>
            <ContainerTitle title={myTeachersTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
            <SlideContainer data={myTeachers}  >
              <TeacherCard />
            </SlideContainer>
          </>}
          {closeTeacher?.length > 0 && <>
            <ContainerTitle title={closeTeacherTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
            <SlideContainer data={closeTeacher}  >
              <TeacherCard />
            </SlideContainer>
          </>}
        </View>
      </ScrollView>
      <TapBottomNavigator currentScreen={"Home"} />
    </SafeAreaView>
  )
}
