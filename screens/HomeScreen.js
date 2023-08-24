import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, Button, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { Color, fontEm } from '../GlobalStyles'
import HomeHeader from '../components/HomeHeader'
import { signOut } from '../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import AdsSlider from '../components/AdsSlider';
import SearchBar from '../components/SearchBar';
import t from '../actions/changeLanguage';
import SlideContainer from '../components/SlideContainer';
import { subjects, teachers } from '../data';
import ChangeLangButton from '../components/ChangeLangButton';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { loading, userInfo, error } = useSelector(state => state.userInfo);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!userInfo) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SigninScreen' }],
      });
    }
  }, [userInfo])
  console.log("🚀 ~ file: HomeScreen.js:15 ~ HomeScreen ~ loading, userInfo,:", loading, userInfo)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={{ flex: 1 }}>
        <SafeAreaView style={[styles.container]} >
          <HomeHeader />
          <AdsSlider />
          <SearchBar />
          <SlideContainer type={"Subject"} data={subjects} title={t("my-subjects")} pressedTitle={t("see-all")} pressHandler={() => console.log("all")} />
          <SlideContainer type={"Teacher"} data={teachers} title={t("my-fav-teachers")} pressedTitle={t("see-all")} pressHandler={() => console.log("all")} />
          <SlideContainer type={"Teacher"} data={teachers} title={t("my-fav-teachers")} pressedTitle={t("see-all")} pressHandler={() => console.log("all")} />
          <Button title='Sign Out' onPress={() => dispatch(signOut())} />
          <ChangeLangButton />
          {/* <Footer /> */}
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
    paddingHorizontal: 20
  }
})