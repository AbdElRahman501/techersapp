import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { ToggleLanguage } from "../store/actions/langActions";
import { useDispatch, useSelector } from 'react-redux';
import { Color, FontFamily, fontEm } from '../GlobalStyles';

export default function ChangeLangButton() {
    const dispatch = useDispatch();

    const { language } = useSelector((state) => state.languageState);

    return (
        <TouchableOpacity
            style={[styles.skipButton]}
            onPress={() => dispatch(ToggleLanguage())}
        >
            <Text style={styles.skipButtonText}>{language === 'en' ? 'Arabic' : 'English'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    skipButton: {
        marginTop: fontEm(1),
        marginBottom: fontEm(1),
        width: "40%",
        justifyContent: "flex-end"
    },
    skipButtonText: {
        textAlign: "left",
        fontSize: fontEm(1),
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic
    },
})