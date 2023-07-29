import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color, FontFamily, FontSize, Margin } from '../GlobalStyles';

const DividerWithText = ({ text }) => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>{text}</Text>
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Margin.m_base,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: Color.darkgray, // Adjust the color of the divider as needed
    },
    text: {
        marginHorizontal: Margin.m_base,
        fontSize: FontSize.size_md,
        fontFamily: FontFamily.montserratArabic,
        color: Color.darkgray, // Adjust the color of the text as needed
    },
});

export default DividerWithText;
