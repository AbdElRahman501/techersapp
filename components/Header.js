import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ChangeLangButton from './ChangeLangButton'
import { Color, Border, FontFamily, widthPercentage, heightPercentage, fontEm } from "../GlobalStyles";
import { useSelector } from 'react-redux'
import { useNavigation } from "@react-navigation/native";

export default function Header({ lastSlide }) {
    const navigation = useNavigation();

    const { language } = useSelector(state => state.languageState)
    return (
        <View style={[styles.parentFlexBox]}>
            <ChangeLangButton />
            <TouchableOpacity
                style={[styles.skipButton]}
                onPress={() => navigation.navigate("SignUpOptions")}
            >
                <Text style={styles.skipButtonText}>{!lastSlide && (language === 'en' ? 'Skip' : 'تخطي')}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    parentFlexBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    skipButton: {
        marginTop: fontEm(1),
        marginBottom: fontEm(1),
        width: "40%",
        justifyContent: "flex-end"
    },
    skipButtonText: {
        textAlign: "right",
        fontSize: fontEm(1),
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic
    }
})