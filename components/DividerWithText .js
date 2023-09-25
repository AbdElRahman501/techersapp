import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color, Margin, globalStyles } from '../GlobalStyles';

const DividerWithText = ({ text, style }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={globalStyles.line} />
            {text && <Text style={[globalStyles.title, { color: Color.darkgray }]}>{text}</Text>}
            <View style={globalStyles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: Margin.m_base
    },

});

export default DividerWithText;
