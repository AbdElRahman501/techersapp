import { StyleSheet, Image, TouchableOpacity, Text, View, StatusBar, BackHandler, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontFamily, FontSize, Margin, fontEm } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import { handleBackPress } from '../actions/navigationActions';
import { useNavigationState } from '@react-navigation/native';
export default function BackHeader({ title, onPress, onPressHandler, style }) {
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
        <View style={[styles.header, { marginBottom: Margin.m_base }, style]}>
            {(history.length > 1 || onPress) && <TouchableOpacity onPress={onPress ? onPressHandler : handleGoBack}>
                <Image style={[styles.backIcon]}
                    source={require("../assets/icons/back-icon.png")}
                />
            </TouchableOpacity>}
            <Text style={[styles.headerTitle, { paddingRight: history.length > 1 ? Margin.m_sm*5 : 0 }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%",
        marginTop: Platform.OS === "ios" ? Margin.m_sm : StatusBar.currentHeight + 25,
    },
    backIcon: {
        width: 24,
        height: 24,
        resizeMode: "contain",
        margin: Margin.m_sm
    },
    headerTitle: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic
    }

})