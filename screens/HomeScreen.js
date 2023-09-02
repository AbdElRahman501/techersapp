import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Color, Height, fontEm } from '../GlobalStyles'
import HomeHeader from '../components/HomeHeader'
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import AdsSlider from '../components/AdsSlider';
import SearchBar from '../components/SearchBar';
import t from '../actions/changeLanguage';
import SlideContainer from '../components/SlideContainer';
import { subjects, teachers } from '../data';
import Subject from '../components/Subject';
import ContainerTitle from '../components/ContainerTitle';
import TeacherCard from '../components/TeacherCard';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { loading, userInfo, error } = useSelector(state => state.userInfo);

  useEffect(() => {
    if (!userInfo) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SigninScreen' }],
      });
    }
  }, [userInfo])
  console.log("🚀 ~ file: HomeScreen.js:15 ~ HomeScreen ~ loading, userInfo,:", loading, userInfo)

  // const favTeachers = teachers.filter((item) => item.likes.find((x) => x.id !== 18));
  const favTeachers = teachers.slice().filter((teacher) => {
    return teacher.likes.some((like) => like.id === 18);
  });
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <SafeAreaView style={[styles.container]} >
          <HomeHeader user={userInfo} />
          <AdsSlider />
          <SearchBar />
          <ContainerTitle style={{ marginTop: 0 }} title={t("my-subjects")} pressedTitle={t("see-all")} pressHandler={() => console.log("all")} />
          <SlideContainer data={subjects}  >
            <Subject />
          </SlideContainer>
          {favTeachers.length > 0 && <>
            <ContainerTitle title={t("my-fav-teachers")} pressedTitle={t("see-all")} pressHandler={() => console.log("all")} />
            <SlideContainer data={favTeachers}  >
              <TeacherCard />
            </SlideContainer>
          </>}
          <ContainerTitle title={t("my teachers")} pressedTitle={t("see-all")} pressHandler={() => console.log("all")} />
          <SlideContainer data={teachers}  >
            <TeacherCard />
          </SlideContainer>
        </SafeAreaView>
      </ScrollView>
    </TouchableWithoutFeedback >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: fontEm(2),
    paddingHorizontal: 20,
    paddingBottom: Height.nav_tap + 20
  }
})