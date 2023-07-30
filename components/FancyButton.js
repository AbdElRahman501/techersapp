import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Border, Color, FontFamily, Margin, fontEm, } from '../GlobalStyles'


export default function FancyButton({ title, pressHandler, leftIcon, rightIcon, disabled, btnColor, customStyles }) {

    return (
        <TouchableOpacity disabled={disabled} style={[styles.parent, styles.parentFlexBox, { backgroundColor: title[1], opacity: disabled ? 0.5 : 1 }, customStyles]} onPress={pressHandler}  >
            {leftIcon &&
                <Ionicons style={{ marginRight: Margin.m_base }} name={leftIcon[0]} size={leftIcon[1]}
                    color={leftIcon[2]} />
            }

            <Text style={[styles.parentText, { color: title[2] }]}> {title[0]}</Text>

            {rightIcon &&
                <Ionicons style={{ marginRight: Margin.m_base }} name={rightIcon[0]} size={rightIcon[1]}
                    color={rightIcon[2]} />
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    parentFlexBox: {
        flexDirection: "row",
        alignItems: "center",
    },
    parent: {
        borderRadius: Border.br_13xl,
        height: fontEm(3.5),
        width: "100%",
        justifyContent: "center",
        backgroundColor: Color.darkcyan
    },
    parentText: {
        fontSize: fontEm(1.2),
        fontWeight: "bold",
        color: "white",
        fontFamily: FontFamily.montserratArabic

    }
})