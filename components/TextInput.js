import React, { useState } from 'react';
import { StyleSheet, Dimensions, Image, TouchableOpacity, Text, View, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native'
import { Border, Color, FontFamily, FontSize, Height, Margin, Padding } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';


const FancyInput = ({ placeholder, secureText, value, changHandler,leftIcon, rightIcon, state }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [viewPass, setViewPass] = useState(false);

    // 
    return (
        <View style={styles.inputField}>
            <TextInput style={[styles.input, { borderColor: state.error ? "red" : isFocused ? Color.darkcyan : Color.input_stroke }]}
                placeholder={placeholder}
                secureTextEntry={!viewPass && secureText}
                autoCapitalize="none"
                onChangeText={changHandler}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {secureText &&
                <TouchableOpacity style={styles.leftIcon} onPress={() => setViewPass(pv => pv ? false : true)}>
                    <Ionicons name={viewPass ? "eye-outline" : "eye-off-outline"} size={32}
                        color={isFocused ? Color.darkcyan : Color.darkgray} />
                </TouchableOpacity>
            }
            {(state.success && leftIcon) &&
                < Ionicons style={styles.leftIcon} name={leftIcon} size={32} color={Color.darkcyan} />
            }
            {rightIcon &&
                <Ionicons style={styles.rightIcon} name={rightIcon} size={32}
                    color={state.error ? "red" : isFocused ? Color.darkcyan : Color.darkgray} />}

        </View>

    );
};

const styles = StyleSheet.create({

    inputField: {
        width: "100%",
        maxWidth: 500,
    },
    input: {
        width: "100%",
        height: Height.br_xl,
        borderWidth: 1,
        borderColor: Color.input_stroke,
        backgroundColor: Color.white,
        borderRadius: Border.br_6xl,
        marginTop: 18,
        textAlign: "right",
        paddingHorizontal: 66,
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_md
    },
    leftIcon: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 38,
        left: 16
    },
    rightIcon: {
        width: 50,
        height: 50,
        position: "absolute",
        top: 36,
        right: 8
    }

});

export default FancyInput;
