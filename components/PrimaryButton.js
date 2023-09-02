import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Border, Color, Height } from '../GlobalStyles';

const PrimaryButton = (props) => {
    return <TouchableOpacity {...props} style={[styles.primary, { opacity: props.disabled ? 0.8 : 1 }, props.style]} />;
};

export default PrimaryButton;

const styles = StyleSheet.create({

    primary: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: Border.br_13xl,
        height: Height.hi_md,
        width: "100%",
        justifyContent: "center",
        backgroundColor: Color.darkcyan
    }
})