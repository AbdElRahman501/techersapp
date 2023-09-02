import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ChangeLangButton from './ChangeLangButton'
import { Color, FontFamily, FontSize, Padding, } from "../GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import t from '../actions/changeLanguage';

export default function Header({ lastSlide }) {
    const navigation = useNavigation();
    const skip = t("skip")
    return (
        <View style={[styles.container]}>
            <ChangeLangButton />
            <TouchableOpacity
                style={[styles.skipButton]}
                onPress={() => navigation.navigate("SignUpOptions")}
            >
                <Text style={styles.skipButtonText}>{!lastSlide && skip}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: Padding.page_p,
        paddingTop: Platform.select({
            ios: Padding.p_sm,
            android: Padding.p_xxl,
          }),

    },

    skipButtonText: {
        textAlign: "right",
        fontSize: FontSize.size_lg,
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic
    }
})