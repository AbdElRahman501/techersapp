import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'
import { Border, Color, FontFamily, FontSize, Height, Margin } from '../GlobalStyles'


export default function FancyButton({ title, pressHandler, leftIcon, rightIcon, btnColor, customStyles }) {

    return (
        <TouchableOpacity style={[styles.parent, styles.parentFlexBox, { backgroundColor: title[1] }, customStyles]} onPress={pressHandler}  >
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
        height: Height.br_xl,
        width: "100%",
        justifyContent: "center",
        backgroundColor: Color.darkcyan
    },

    parentText: {
        fontSize: FontSize.size_lg,
        fontWeight: "bold",
        color: "white",
        fontFamily: FontFamily.montserratArabic

    }
})