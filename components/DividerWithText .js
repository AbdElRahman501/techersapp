import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color, Margin, globalStyles } from '../GlobalStyles';

const DividerWithText = ({ text, style, children }) => {
    return (
        <View style={[styles.container, style]}>
            <View style={globalStyles.line} />
            {text && <Text style={[globalStyles.title, { color: Color.darkgray }]}>{text}</Text>}
            {children}
            <View style={globalStyles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10
    },

});

export default DividerWithText;
