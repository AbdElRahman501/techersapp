import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import { Border, Color, FontFamily, FontSize, Height } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
import { getTextInputAlign, inputChecker } from '../actions/GlobalFunctions';
import { useSelector } from 'react-redux';


const FancyInput = ({ placeholder, value, changHandler, inputType, rightIcon, checkInputs, setCheckInputs, setState, keyboardType, children, ...props }) => {
    const { language } = useSelector(state => state.languageState);
    const [isFocused, setIsFocused] = useState(false);
    const [viewPass, setViewPass] = useState(false);

    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    useEffect(() => {
        setSuccess(inputChecker(value, inputType).success)
        if (error || success) {
            setState(inputChecker(value, inputType))
            setError(inputChecker(value, inputType).error)
            setSuccess(inputChecker(value, inputType).success)
        }
    }, [value])

    useEffect(() => {
        if (checkInputs) {
            setState(pv => pv.error ? pv : inputChecker(value, inputType))
            setError(inputChecker(value, inputType).error)
            setSuccess(inputChecker(value, inputType).success)
            setCheckInputs(false)
        }
    }, [checkInputs])

    return (
        <View style={[styles.inputField, { borderColor: error ? "red" : isFocused ? Color.darkcyan : Color.input_stroke, flexDirection: language === "en" ? "row" : "row-reverse" }]}>
            {!children ?
                <Ionicons style={styles.rightIcon} name={rightIcon} size={FontSize.size_xl}
                    color={error ? "red" : isFocused ? Color.darkcyan : Color.darkgray} />
                :
                <View style={styles.rightIcon}>
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            width: 24,
                            height: 24,
                            viewBox: "0 0 24 24",
                            color: error ? "red" : isFocused ? Color.darkcyan : Color.darkgray
                        });
                    })}
                </View>
            }


            <TextInput style={[styles.input, {
                textAlign: language === "en" ? "left" : (getTextInputAlign(value) || "right"),
                paddingLeft: (language === "ar" && inputType !== "password" && getTextInputAlign(value) === "left" && !success) ? Height.hi_md : 0
            }]}
                placeholder={placeholder}
                secureTextEntry={!viewPass && inputType === "password"}
                autoCapitalize="none"
                onChangeText={changHandler}
                value={value}
                keyboardType={keyboardType || "default"}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                    if (value) {
                        setState(inputChecker(value, inputType))
                        setError(inputChecker(value, inputType).error)
                        setSuccess(inputChecker(value, inputType).success)
                    }
                    setIsFocused(false)
                }}
                {...props}
            />
            {inputType === "password"
                ?
                <TouchableOpacity style={styles.leftIcon} onPress={() => setViewPass(pv => pv ? false : true)}>
                    <Ionicons name={viewPass ? "eye-outline" : "eye-off-outline"} size={FontSize.size_xl}
                        color={isFocused ? Color.darkcyan : Color.darkgray} />
                </TouchableOpacity>
                : success &&
                < Ionicons style={styles.leftIcon} name={"checkmark"} size={FontSize.size_xl} color={Color.darkcyan} />
            }


        </View>

    );
};

const styles = StyleSheet.create({

    inputField: {
        width: "100%",
        maxWidth: 400,
        height: Height.hi_md,
        borderWidth: 1,
        borderColor: Color.input_stroke,
        backgroundColor: Color.input_fill,
        borderRadius: Border.br_6xl,
        marginTop: 18,
        alignItems: "center"

    },
    input: {
        flex: 1,
        height: Height.hi_md,
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_md
    },
    leftIcon: {
        textAlign: "center",
        width: Height.hi_md,
        justifyContent: "center",
        alignItems: "center"
    },
    rightIcon: {
        textAlign: "center",
        textAlignVertical: "center",
        width: Height.hi_md,
        height: Height.hi_md,
        justifyContent: "center",
        alignItems: "center"
    }

});

export default FancyInput;
