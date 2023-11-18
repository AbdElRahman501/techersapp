import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import TapBottomNavigator from '../components/TapBottomNavigator'

export default function CommunityScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
            <View style={styles.container}>
                <Text style={styles.title}>Coming soon ... 🚀</Text>
            </View>
            <TapBottomNavigator currentScreen={'Community'} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    }
})