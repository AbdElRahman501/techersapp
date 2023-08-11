import { StyleSheet, Image, TouchableOpacity, Text, View, BackHandler } from 'react-native'
import React, { useState, useEffect } from 'react'
import { FontFamily, fontEm, heightPercentage } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import { handleBackPress } from '../actions/navigationActions';
import { useNavigationState } from '@react-navigation/native';
export default function BackHeader({ title }) {

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
        <View style={styles.header}>
            {history.length > 1 && <TouchableOpacity onPress={handleGoBack}>
                <Image style={[styles.backIcon]}
                    imageStyle={{
                        resizeMode: "contain",
                    }}
                    source={require("../assets/icons/back-icon.png")}
                />
            </TouchableOpacity>}
            <Text style={[styles.headerTitle, { paddingRight: history.length > 1 ? fontEm(2) : 0 }]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: heightPercentage(20),
        marginHorizontal: fontEm(1),
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    backIcon: {
        width: fontEm(2),
        height: fontEm(2)
    },
    headerTitle: {
        flex: 1,
        textAlign: "center",
        fontSize: fontEm(1.2),
        fontFamily: FontFamily.montserratArabic
    }

})