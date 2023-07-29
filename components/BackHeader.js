import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { FontFamily, FontSize, Padding } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';

export default function BackHeader({ title }) {

    const navigation = useNavigation();

    const handleGoBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack}>
                <Image style={[styles.backIcon]}
                    imageStyle={{
                        resizeMode: "contain",
                    }}
                    source={require("../assets/icons/back-icon.png")}
                />
            </TouchableOpacity>
            <Text style={[styles.headerTitle]}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 200,
        paddingHorizontal: 16,
        paddingTop: 74,
        paddingBottom: Padding.p_23xl,
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    backIcon: {
        width: 36,
        height: 36
    },
    headerTitle: {
        paddingRight:36,
        flex: 1,
        textAlign: "center",
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.montserratArabic
    }

})