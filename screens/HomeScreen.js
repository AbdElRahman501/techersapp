import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, Button, Text, BackHandler, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontFamily, fontEm } from '../GlobalStyles'
import HomeHeader from '../components/HomeHeader'
import { signOut } from '../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';

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
        <View style={[styles.container]} >
          <HomeHeader />
          {/* <Button title='Sign Out' onPress={() => dispatch(signOut())} /> */}
          {/* <Footer /> */}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: fontEm(2),
    paddingHorizontal: 20
  }
})