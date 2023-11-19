import { TouchableOpacity, Text, View, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, Margin, globalStyles } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import { handleBackPress } from '../actions/navigationActions';
import { useNavigationState } from '@react-navigation/native';
import { Next_Icon } from '../assets/icons/Icons';
import { previousSessionHandler } from '../store/actions/deviceActions';
export default function BackHeader({ title, onPress, onPressHandler, style }) {
    const navigation = useNavigation();

    const [history, setHistory] = useState([]);
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        setHistory(navigationState.routes.map(route => route.name));
        previousSessionHandler(navigationState.routes)
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
        <View style={[globalStyles.parentFlexBox, { marginVertical: Margin.m_sm, width: "100%", justifyContent: (history.length > 1 || onPress) ? 'space-between' : "center" }, style]}>
            {(history.length > 1 || onPress) &&
                <TouchableOpacity style={{ padding: 5 }} onPress={onPress ? onPressHandler : handleGoBack}>
                    <Next_Icon color={Color.black} width={26} height={26} viewBox="0 0 26 26" style={{ transform: [{ scaleX: -1 }] }} />
                </TouchableOpacity>
            }
            <Text style={globalStyles.title}>{title}</Text>
            {(history.length > 1 || onPress) && <View style={{ margin: 5, width: 26, height: 26 }} />}
        </View>
    )
}
