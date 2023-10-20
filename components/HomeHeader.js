import { StyleSheet, Image, View, BackHandler, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Notification_icon_Svg } from '../assets/icons/Icons'
import CustomText from './CustemText'
import t from '../actions/changeLanguage'
import { Color, FontFamily, FontSize, fontEm } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { handleBackPress } from '../actions/navigationActions';
import { useNavigation, useNavigationState } from '@react-navigation/native';



const HomeHeader = ({ user }) => {
    const navigation = useNavigation();
    const navigationState = useNavigationState(state => state);

    const { language } = useSelector(state => state.languageState)
    const [history, setHistory] = useState([]);

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
        <View style={{ width: "100%", flexDirection: language === "en" ? "row" : "row-reverse", justifyContent: "space-between",  alignItems: "center" }}>
            <View style={{ flexDirection: language === "en" ? "row" : "row-reverse", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Image
                        style={{ height: fontEm(3.5), width: fontEm(3.5), borderRadius: 50 }}
                        resizeMode="contain"
                        source={require('../assets/teachers/boy.png')}
                    />
                </TouchableOpacity>
                <View style={{ marginHorizontal: fontEm(1) }}>
                    <CustomText style={[styles.title, { color: Color.darkcyan }]}>{t("welcome")}</CustomText>
                    <CustomText style={styles.regularText}>{user?.fullName || ""}</CustomText>
                    <CustomText style={styles.smallText}>{user?.schoolYear[language] || ""}</CustomText>
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

const styles = StyleSheet.create({

    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,

    },
    regularText: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
    },
    smallText: {
        fontSize: FontSize.size_sm,
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic,
    }
})

