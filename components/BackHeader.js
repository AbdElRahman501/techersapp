import { StyleSheet, Image, TouchableOpacity, Text, View, StatusBar, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontFamily, Margin, fontEm, heightPercentage } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import { handleBackPress } from '../actions/navigationActions';
import { useNavigationState } from '@react-navigation/native';
export default function BackHeader({ title, onPress, onPressHandler, style }) {
    const statusBarHeight = StatusBar.currentHeight;
    const navigation = useNavigation();

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

    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <View style={[styles.header, { marginTop: statusBarHeight + 25, marginBottom: Margin.m_base }, style]}>
            {(history.length > 1 || onPress) && <TouchableOpacity onPress={onPress ? onPressHandler : handleGoBack}>
                <Image style={[styles.backIcon]}
                    source={require("../assets/icons/back-icon.png")}
                />
            </TouchableOpacity>}
            <Text style={[styles.headerTitle, { paddingRight: history.length > 1 ? fontEm(2.5) : 0 }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%",
    },
    backIcon: {
        width: fontEm(2),
        height: fontEm(2),
        resizeMode: "contain",
        marginLeft: fontEm(0.5)
    },
    headerTitle: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: fontEm(1.2),
        fontFamily: FontFamily.montserratArabic
    }

})