import { View, BackHandler, TouchableOpacity, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Notification_icon_Svg } from '../assets/icons/Icons'
import CustomText from './CustemText'
import t from '../actions/changeLanguage'
import { Color, FontSize, Height, Margin, Padding, fontEm, globalStyles } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { handleBackPress } from '../actions/navigationActions';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import CustomImage from './CustomImage '
import { getTheYear } from '../actions/GlobalFunctions'
import { years } from '../data'



const HomeHeader = ({ user }) => {
    const navigation = useNavigation();
    const navigationState = useNavigationState(state => state);

    const { language } = useSelector(state => state.languageState)
    const [history, setHistory] = useState([]);
    const schoolYear = getTheYear(years, user?.schoolYear)
    useEffect(() => {
        setHistory(navigationState.routes.map(route => route.name));
    }, [navigationState]);

    useEffect(() => {
        const backAction = () => {
            return handleBackPress(history);
        }
        BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backAction);
        };
    }, [history]);


    return (
        <View style={{
            width: "100%",
            marginTop: Platform.select({
                ios: Padding.p_sm,
                android: 0,
            }), flexDirection: language === "en" ? "row" : "row-reverse", justifyContent: "space-between", alignItems: "center"
        }}>
            <View style={{ flexDirection: language === "en" ? "row" : "row-reverse", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <CustomImage
                        style={{ height: Height.br_lg, width: Height.br_lg, borderRadius: Height.br_lg / 2 }}
                        resizeMode="contain"
                        source={user?.image || require('../assets/teachers/boy.png')}
                    />
                </TouchableOpacity>
                <View style={{ marginHorizontal: Margin.m_sm, gap: 3 }}>
                    <CustomText style={[globalStyles.regular, { fontSize: FontSize.size_lg, color: Color.darkcyan }]}>{t("welcome")}</CustomText>
                    <CustomText style={globalStyles.regular}>{user?.fullName || ""}</CustomText>
                    <CustomText style={globalStyles.smallText}>{schoolYear?.[language] || ""}</CustomText>
                </View>
            </View>
            <Notification_icon_Svg
                width={24}
                height={24}
                viewBox="0 0 24 24" />
        </View>
    )
}



export default HomeHeader;


