import { StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'


export default function PressedText({ title, pressHandler }) {
    return (
        <TouchableOpacity onPress={pressHandler}>
            <Text style={styles.pressedText}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    pressedText: {
        color: Color.darkcyan,
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_md,
        marginVertical: 18,
        marginRight: 8,
    },
})