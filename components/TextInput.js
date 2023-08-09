import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import { Border, Color, FontFamily, fontEm, widthPercentage } from '../GlobalStyles'
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
                <Ionicons style={styles.rightIcon} name={rightIcon} size={fontEm(1.5)}
                    color={error ? "red" : isFocused ? Color.darkcyan : Color.darkgray} />
                :
                <View style={styles.rightIcon}>
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            width: fontEm(1.8),
                            height: fontEm(1.8),
                            viewBox: "0 0 24 24",
                            color: error ? "red" : isFocused ? Color.darkcyan : Color.darkgray
                        });
                    })}
                </View>
            }


            <TextInput style={[styles.input, {
                textAlign: language === "en" ? "left" : (getTextInputAlign(value) || "right"),
                paddingLeft: (language === "ar" && inputType !== "password" && getTextInputAlign(value) === "left" && !success) ? fontEm(3.5) : 0
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
                    <Ionicons name={viewPass ? "eye-outline" : "eye-off-outline"} size={fontEm(1.5)}
                        color={isFocused ? Color.darkcyan : Color.darkgray} />
                </TouchableOpacity>
                : success &&
                < Ionicons style={styles.leftIcon} name={"checkmark"} size={fontEm(1.5)} color={Color.darkcyan} />
            }


        </View>

    );
};

const styles = StyleSheet.create({

    inputField: {
        width: "100%",
        maxWidth: 500,
        height: fontEm(3.5),
        borderWidth: 1,
        borderColor: Color.input_stroke,
        backgroundColor: Color.white,
        borderRadius: Border.br_6xl,
        marginTop: 18,
    },
    input: {
        // width: widthPercentage(100),
        flex: 1,
        height: fontEm(3.5),
        // paddingHorizontal: fontEm(3.5),
        fontFamily: FontFamily.montserratArabic,
        fontSize: fontEm(1.2)
    },
    leftIcon: {
        // flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        width: fontEm(3.5),
        height: fontEm(3.5),
        // position: "absolute",
        // bottom: 0,
        // left: 0,
        justifyContent: "center",
        alignItems: "center"
    },
    rightIcon: {
        textAlign: "center",
        textAlignVertical: "center",
        width: fontEm(3.5),
        height: fontEm(3.5),
        justifyContent: "center",
        alignItems: "center"
        // position: "absolute",
        // bottom: 0,
        // right: 0
    }

});

export default FancyInput;
