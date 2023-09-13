import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'

export default function CommunityScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Coming soon ... 🚀</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    }
})