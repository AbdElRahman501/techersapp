import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { Color, FontFamily, fontEm } from '../GlobalStyles'
import CustomText from './CustemText'


export default function PressedText({ title, pressHandler, style, disabled }) {
    return (
        <TouchableOpacity onPress={pressHandler} disabled={disabled}>
            <CustomText style={[styles.pressedText, { color: disabled ? Color.darkgray : Color.darkcyan, }, style]}>{title}</CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pressedText: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: fontEm(1),
        marginHorizontal: 5
    },
})