import { BackHandler, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ChangeLangButton from './ChangeLangButton'
import { Color, FontFamily, FontSize, Margin, Padding, } from "../GlobalStyles";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import t from '../actions/changeLanguage';
import { handleBackPress } from '../actions/navigationActions';

export default function Header({ lastSlide }) {
    const navigation = useNavigation();
    const skip = t("skip")

    const navigationState = useNavigationState(state => state);
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
        <View style={[styles.container]}>
            <ChangeLangButton />
            <TouchableOpacity
                style={[styles.skipButton]}
                onPress={() =>
                    navigation.navigate('SignUpOptions')
                }
            >
                <Text style={styles.skipButtonText}>{!lastSlide && skip}</Text>
            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Padding.page_p,
        marginTop: Margin.m_sm

    },

    skipButtonText: {
        textAlign: "right",
        fontSize: FontSize.size_lg,
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic
    }
})