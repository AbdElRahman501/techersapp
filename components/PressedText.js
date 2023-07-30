import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { Color, FontFamily, fontEm } from '../GlobalStyles'


export default function PressedText({ title, pressHandler, style }) {
    return (
        <TouchableOpacity onPress={pressHandler}>
            <Text style={[styles.pressedText, style]}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pressedText: {
        color: Color.darkcyan,
        fontFamily: FontFamily.montserratArabic,
        fontSize: fontEm(1),
        marginHorizontal: 5
    },
})