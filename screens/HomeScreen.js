import { Keyboard, ScrollView, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
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
import { removeDuplicatesById } from '../actions/GlobalFunctions';
import { Add_Icon } from '../assets/icons/Icons';
import LoadingModal from '../components/LoadingModal';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { loading, userInfo, error } = useSelector(state => state.userInfo);
  const { loading: teachersLoading, closeTeacher, error: teachersError } = useSelector(state => state.closeTeachersState);
  const { loading: myTeachersLoading, myTeachers, error: myTeachersError } = useSelector(state => state.myTeachersState);
  const { loading: myGroupsLoading, myGroups, error: myGroupsError } = useSelector(state => state.myGroupsState);

  const [myFavTeachers, setMyFavTeachers] = useState([])
  const [mySubjects, setMySubjects] = useState([])
  const [subjectTitle, myFavTeachersTitle, myTeachersTitle, closeTeacherTitle, seeAll] = [t("my-subjects"), t("my-fav-teachers"), t("my teachers"), t("close teacher"), t("see-all")]

  const svg_icon = (props) => {
    return <Add_Icon height="80%" width="80%" viewBox="0 0 24 25" {...props} />
  }

  const item = {
    addButton: true,
    en: "Add Subject", ar: "إضافة مادة",
    svg: svg_icon
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
    const subjects = removeDuplicatesById(myGroups?.map(x => x?.subject))
    setMySubjects([...subjects, { ...item, id: 10000 }])
  }, [myGroups]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.white }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <SafeAreaView style={[globalStyles.body]} >
          {/* { display: (teachersLoading || myTeachersLoading || myGroupsLoading || loading) ? "none" : "flex" } */}
          {/* <LoadingModal visible={teachersLoading || myTeachersLoading || myGroupsLoading || loading} /> */}
          <HomeHeader user={userInfo} />
          {closeTeacher?.length > 0 && <AdsSlider data={closeTeacher} />}
          <SearchBar button={true} />
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
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback >
  )
}
