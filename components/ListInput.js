import { StyleSheet, Text, View } from 'react-native';
import { Border, Color, FontFamily, FontSize, Height } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';

export default function ListInput({ value, options, placeholder, changHandler, children, rightIcon }) {
    const { language } = useSelector(state => state.languageState);

    const [isFocused, setIsFocused] = useState(false);
    return (
        <View
            style={[styles.inputField, {
                borderColor: isFocused ? Color.darkcyan : Color.input_stroke,
                flexDirection: language === "en" ? "row" : "row-reverse"
            }]}
        >

            {!children ?
                <Ionicons style={styles.rightIcon} name={rightIcon} size={FontSize.size_xl}
                    color={isFocused ? Color.darkcyan : Color.darkgray} />
                :
                <View style={styles.rightIcon}>
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            width: FontSize.size_xl,
                            height: FontSize.size_xl,
                            viewBox: "0 0 24 24",
                            color: isFocused ? Color.darkcyan : Color.darkgray
                        });
                    })}
                </View>
            }
            <View style={[styles.input]}>

                <Picker
                    pickerStyleType={"dropdown"}
                    fontFamily={FontFamily.montserratArabic}
                    selectedValue={value}
                    onValueChange={changHandler}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                >
                    <Picker.Item style={styles.item} label={placeholder} value={null} />
                    {options.map((item, index) => {
                        return <Picker.Item key={index} style={styles.item} label={item[language] || item} value={item} />
                    })}

                </Picker>
                {Platform.OS === 'android' ? (
                    <View style={styles.inputCove} pointerEvents='none' >
                        <Text style={[styles.item, { color: value ? Color.black : Color.darkgray }]}>
                            {(value[language] ? value[language] : value) || placeholder}
                        </Text>
                    </View>
                ) : (<View></View>)}
            </View>

            {value ?
                < Ionicons style={styles.leftIcon} name={"checkmark"} size={FontSize.size_xl} color={Color.darkcyan} />
                : <View style={styles.leftIcon}>

                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({

    inputField: {
        width: "100%",
        maxWidth: 500,
        height: Height.hi_md,
        borderWidth: 1,
        borderColor: Color.input_stroke,
        backgroundColor: Color.input_fill,
        borderRadius: Border.br_6xl,
        marginTop: 18,
    },
    input: {
        flex: 1,
        height: Height.hi_md,
        textAlignVertical: "center",

    },
    inputCove: {
        height: Height.hi_md - 3,
        width: "100%",
        marginLeft: Height.hi_md,
        justifyContent: "center",
        alignSelf: "flex-end",
        position: 'absolute',
        backgroundColor: Color.input_fill,

    },
    item: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_md,
    },
    leftIcon: {
        textAlign: "center",
        textAlignVertical: "center",
        width: Height.hi_md,
        height: Height.hi_md,
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
