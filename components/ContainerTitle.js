import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PressedText from './PressedText'
import { FontFamily, FontSize, Margin } from '../GlobalStyles'
import { useSelector } from 'react-redux'

export default function ContainerTitle({ title, pressedTitle, pressHandler, style }) {
    const { language } = useSelector(state => state.languageState)
    return (
        <View style={[styles.parentFlexBox, { flexDirection: language === 'en' ? "row" : "row-reverse" }, style]}>
            <Text style={styles.title} >{title}</Text>
            {pressedTitle &&
                <PressedText style={{ fontSize: FontSize.size_base }} title={pressedTitle} pressHandler={pressHandler} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    parentFlexBox: {
        marginTop: Margin.m_base,
        marginBottom: Margin.m_sm,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "end",
    },
    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
    }

})