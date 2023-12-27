import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SettingItem from '../components/SettingItem'
import { Logout_Icon } from '../assets/icons/Icons'
import AlertModal from '../components/alertModal'
import t from '../actions/changeLanguage'
import { Color } from '../GlobalStyles'
import { signOut } from '../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core';

export default function TeachersHomeScreen() {
  const [visible, setVisible] = useState(false)
  const [logout, cancel] = [t("logout"), t("cancel")]
  const dispatch = useDispatch()
  const { loading, userInfo, error } = useSelector(state => state.userInfo);

  const navigation = useNavigation();

  useEffect(() => {
    if (!userInfo) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SigninScreen' }],
      });
    }
  }, [userInfo]);

  return (
    <View>
      <AlertModal
        visible={visible}
        type={'danger'}
        title={t("logout title")}
        content={t("logout description")}
        primaryButton={logout}
        primaryButtonStyle={{ backgroundColor: Color.red }}
        secondaryButton={cancel}
        primaryButtonSubmit={() => { setVisible(false); dispatch(signOut()) }}
        secondaryButtonSubmit={() => setVisible(false)}
      />
      <Text>TeachersHomeScreen</Text>
      <SettingItem Icon={() => <Logout_Icon />} style={{ color: Color.red }} title={logout} pressHandler={() => setVisible(true)} />
    </View>
  )
}

const styles = StyleSheet.create({})