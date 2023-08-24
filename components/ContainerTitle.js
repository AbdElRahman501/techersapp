import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressedText from './PressedText'
import { FontFamily, FontSize } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import t from '../actions/changeLanguage'

export default function ContainerTitle({ title, pressedTitle, pressHandler }) {
    const { language } = useSelector(state => state.languageState)
    return (
        <View style={[styles.parentFlexBox, { flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
            <Text style={styles.title} >{title}</Text>
            <PressedText style={{ fontSize: FontSize.size_base }} title={pressedTitle} pressHandler={pressHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    parentFlexBox: {
        marginBottom: 24,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "end",
    },
    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
    }

})