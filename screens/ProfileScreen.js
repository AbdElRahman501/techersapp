import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, SafeAreaView, Modal, Text } from 'react-native';
import { getUsers, signOut } from '../store/actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Border, Color, FontSize, Height, Margin, globalStyles } from '../GlobalStyles';
import CustomImage from '../components/CustomImage ';
import CustomText from '../components/CustemText';
import { Burger_Button_Icon, Earth_Icon, Logout_Icon, Teacher_Icon, Theme_Icon } from '../assets/icons/Icons';
import SettingItem from '../components/SettingItem';
import { ToggleLanguage } from '../store/actions/langActions';
import t from '../actions/changeLanguage';
import AlertModal from '../components/alertModal';
import UsersModal from '../components/UsersModal';
import LoadingModal from '../components/LoadingModal';
import TapBottomNavigator from '../components/TapBottomNavigator';
import { getTheYear } from '../actions/GlobalFunctions';

export default function ProfileScreen() {
    const { language } = useSelector(state => state.languageState)
    const { loading, userInfo, error } = useSelector(state => state.userInfo)
    const { schoolYears } = useSelector(state => state.schoolYearsState)
    const { switchLoading, switchError, loading: loadingUsers, users, error: usersError } = useSelector(state => state.usersState)
    const [visible, setVisible] = useState(false)
    const [usersVisible, setUsersVisible] = useState(false)
    const dispatch = useDispatch()
    const [logout, cancel] = [t("logout"), t("cancel")]

    useEffect(() => {
        dispatch(getUsers())
    }, [])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }} >
            <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={[globalStyles.body]}>
                    <LoadingModal visible={switchLoading || loading} />
                    <AlertModal
                        visible={visible || loading}
                        imageSource={require('../assets/icons/alert.png')}
                        title={t("logout title")}
                        content={t("logout description")}
                        primaryButton={logout}
                        primaryButtonStyle={{ backgroundColor: Color.red }}
                        secondaryButton={cancel}
                        primaryButtonSubmit={() => { setVisible(false); dispatch(signOut()) }}
                        secondaryButtonSubmit={() => setVisible(false)}
                    />
                    {users?.length > 0 && <UsersModal usersVisible={usersVisible || switchLoading} setUsersVisible={setUsersVisible} users={users} userInfo={userInfo} />}

                    <View style={{ marginHorizontal: Margin.m_base, flexDirection: language === "en" ? "row" : "row-reverse", alignItems: "center" }}>
                        <TouchableOpacity disabled={!users?.length} onPress={() => setUsersVisible(true)} style={[globalStyles.student, { borderWidth: 0, minWidth: "80%", marginVertical: 0, flexDirection: language === "en" ? "row" : "row-reverse", alignItems: "center" }]}>
                            <CustomImage
                                style={{ height: Height.hi_m, width: Height.hi_m, borderRadius: Border.br_3xl }}
                                resizeMode="contain"
                                source={require('../assets/teachers/boy.png')}
                            />
                            <View style={{ marginHorizontal: Margin.m_sm, gap: 3 }}>
                                <CustomText style={[globalStyles.regular, { color: Color.darkcyan }]}>{userInfo?.fullName || ""}</CustomText>
                                <CustomText style={globalStyles.smallText}>{getTheYear(schoolYears, userInfo?.schoolYear)[language] || ""}</CustomText>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log("burger button")}>
                            <Burger_Button_Icon width={24} height={24} viewBox="0 0 24 24" />
                        </TouchableOpacity>
                    </View>
                    <CustomText style={[globalStyles.regular, { marginVertical: Margin.m_base, fontSize: FontSize.size_lg, width: "100%" }]} >
                        {t("general")}
                    </CustomText>

                    <SettingItem Icon={() => <Earth_Icon />} title={t("language")} regular={language === "en" ? "en" : "عربي"} pressHandler={() => dispatch(ToggleLanguage())} />
                    <SettingItem Icon={() => <Teacher_Icon />} title={t("my teachers")} pressHandler={() => console.log("my teachers")} />
                    <SettingItem Icon={() => <Theme_Icon />} title={t("theme")} regular={t("light")} pressHandler={() => console.log("Theme")} />
                    <CustomText style={[globalStyles.regular, { marginVertical: Margin.m_base, fontSize: FontSize.size_lg, width: "100%" }]} >
                        {t("account")}
                    </CustomText>
                    <SettingItem Icon={() => <Logout_Icon />} style={{ color: Color.red }} title={logout} pressHandler={() => setVisible(true)} />
                </View>
            </ScrollView >
            <TapBottomNavigator currentScreen={'Profile'} />
        </SafeAreaView>
    )
}

