import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ToggleLanguage } from "../store/actions/langActions";
import { useDispatch, useSelector } from 'react-redux';
import { Color, FontFamily, FontSize } from '../GlobalStyles';

export default function ChangeLangButton() {
    const dispatch = useDispatch();

    const { language } = useSelector((state) => state.languageState);

    return (
        <TouchableOpacity onPress={() => dispatch(ToggleLanguage())} >
            <Text style={styles.skipButtonText}>{language === 'en' ? 'Arabic' : 'English'}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    skipButtonText: {
        textAlign: "left",
        fontSize: FontSize.size_lg,
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic
    },
})