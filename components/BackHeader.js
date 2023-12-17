import { TouchableOpacity, Text, View, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Height, Margin, globalStyles } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import { handleBackPress } from '../actions/navigationActions';
import { useNavigationState } from '@react-navigation/native';
import { previousSessionHandler } from '../store/actions/deviceActions';
import { AntDesign } from '@expo/vector-icons';

export default function BackHeader({ title, onPressHandler, style }) {
    const navigation = useNavigation();

    const [history, setHistory] = useState([]);
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        const theHistory = navigationState.routes.map(route => route.name)
        setHistory(theHistory);
        if (theHistory.includes('UserData1') || theHistory.includes('TeacherSignUpScreen')) {
            previousSessionHandler(navigationState.routes)
        } else {
            previousSessionHandler([])
        }
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
        <View style={[globalStyles.parentFlexBox, { height: Height.hi_s, marginVertical: Margin.m_sm, width: "100%", justifyContent: (history.length > 1 || onPressHandler) ? 'space-between' : "center" }, style]}>
            {(history.length > 1 || onPressHandler) &&
                <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={onPressHandler ? onPressHandler : handleGoBack}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            }
            <Text style={globalStyles.title}>{title}</Text>
            {(history.length > 1 || onPressHandler) && <View style={{ marginHorizontal: 10, width: 24, height: 24 }} />}
        </View>
    )
}
