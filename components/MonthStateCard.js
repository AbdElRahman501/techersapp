import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Color, FontSize, getScoreColor, getStateColor, globalStyles } from '../GlobalStyles'
import CustomText from './CustemText';
import t from '../actions/changeLanguage';

export default function MonthStateCard({ item }) {
    const state = item.state && t(item.state)
    const color = item.score >= 0 ? getScoreColor(item.score) : getStateColor(item.state)
    return (
        <TouchableOpacity style={styles.card}>
            <CustomText style={[globalStyles.regular, { fontSize: FontSize.size_md }]}>{t(item.type)} <Text style={{ color: color }} >{" ( " + (item.totalNumber >= 0 ? item.totalNumber : state || (item.score + "%")) + " )"}</Text> </CustomText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: Color.lightGray,
        backgroundColor: Color.white,
        borderRadius: 15,
        paddingHorizontal: 12,
        paddingVertical: 8,
        justifyContent: "center",
        alignItems: "center"
    },
})