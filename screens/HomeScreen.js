import { Keyboard, ScrollView, Text, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, globalStyles } from '../GlobalStyles'
import HomeHeader from '../components/HomeHeader'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import AdsSlider from '../components/AdsSlider';
import SearchBar from '../components/SearchBar';
import t from '../actions/changeLanguage';
import SlideContainer from '../components/SlideContainer';
import { teachers } from '../data';
import Subject from '../components/Subject';
import ContainerTitle from '../components/ContainerTitle';
import TeacherCard from '../components/TeacherCard';
import { findMyTeachers, removeDuplicatesById } from '../actions/GlobalFunctions';
export default function HomeScreen() {
  const navigation = useNavigation();
  const { loading, userInfo, error } = useSelector(state => state.userInfo);
  const [myTeachers, setMyTeachers] = useState([])
  const [myFavTeachers, setMyFavTeachers] = useState([])
  const [mySubjects, setMySubjects] = useState([])
  const [subjectTitle, myFavTeachersTitle, myTeachersTitle, seeAll] = [t("my-subjects"), t("my-fav-teachers"), t("my teachers"), t("see-all")]


  useEffect(() => {
    if (!userInfo) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SigninScreen' }],
      });
    } else {
      const myT = findMyTeachers(teachers, userInfo.myTeachers || [])
      const myFav = myT.filter(x => x.favorite === true)
      setMyTeachers(myT)
      setMyFavTeachers(myFav)
      setMySubjects(removeDuplicatesById(myT.map(x => x.mainSubject)))
    }
  }, [userInfo])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={{ flex: 1, backgroundColor: Color.white }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <SafeAreaView style={[globalStyles.body]} >
          <HomeHeader user={userInfo} />
          <AdsSlider />
          <SearchBar button={true} />
          <ContainerTitle style={{ marginTop: 0 }} title={subjectTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
          {mySubjects.length > 0 ?
            <SlideContainer data={mySubjects}  >
              <Subject />
            </SlideContainer>
            : <Text>Add one</Text>
          }
          {myFavTeachers.length > 0 && <>
            <ContainerTitle title={myFavTeachersTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
            <SlideContainer data={myFavTeachers}  >
              <TeacherCard />
            </SlideContainer>
          </>}
          {myTeachers.length > 0 && <>
            <ContainerTitle title={myTeachersTitle} pressedTitle={seeAll} pressHandler={() => console.log("all")} />
            <SlideContainer data={myTeachers}  >
              <TeacherCard />
            </SlideContainer>
          </>}
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback >
  )
}
