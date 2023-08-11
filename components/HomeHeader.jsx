import { StyleSheet, Image, View, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Notification_icon_Svg } from '../assets/icons/Icons'
import CustomText from '../components/CustemText'
import t from '../actions/changeLanguage'
import { Color, FontFamily, fontEm } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { handleBackPress } from '../actions/navigationActions';
import { useNavigationState } from '@react-navigation/native';


const HomeHeader = () => {
    const { language } = useSelector(state => state.languageState)

    const [history, setHistory] = useState([]);
    const navigationState = useNavigationState(state => state);

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

    const name = "Abdelrahman Ahmed"
    const year = "الصف الثالث الثانوي"
    return (
        <View style={{ width: "100%", flexDirection: language === "en" ? "row" : "row-reverse", justifyContent: "space-between", marginTop: 10, alignItems: "center" }}>
            <View style={{ flexDirection: language === "en" ? "row" : "row-reverse", alignItems: "center" }}>
                <Image
                    style={{ height: fontEm(3.5), width: fontEm(3.5), borderRadius: 50 }}
                    resizeMode="contain"
                    source={require('../assets/teachers/boy.png')}
                />
                <View style={{ marginHorizontal: fontEm(1) }}>
                    <CustomText style={[styles.title, { color: Color.darkcyan }]}>{t("welcome")}</CustomText>
                    <CustomText style={styles.regularText}>{name}</CustomText>
                    <CustomText style={styles.smallText}>{year}</CustomText>
                </View>
            </View>
            <Notification_icon_Svg
                width={fontEm(1.5)}
                height={fontEm(1.5)}
                viewBox="0 0 24 24" />
        </View>
    )
}



export default HomeHeader;

const styles = StyleSheet.create({

    title: {
        fontSize: fontEm(1.1),
        fontFamily: FontFamily.montserratArabic,

    },
    regularText: {
        fontSize: fontEm(1),
        fontFamily: FontFamily.montserratArabic,
    },
    smallText: {
        fontSize: fontEm(0.6),
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic,
    }
})

