import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native'
import React from 'react'
import { FontFamily, fontEm, heightPercentage } from '../GlobalStyles'
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
        height: heightPercentage(20),
        marginHorizontal: fontEm(1),
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center",
    },
    backIcon: {
        width: fontEm(2),
        height: fontEm(2)
    },
    headerTitle: {
        paddingRight: fontEm(2),
        flex: 1,
        textAlign: "center",
        fontSize: fontEm(1.2),
        fontFamily: FontFamily.montserratArabic
    }

})