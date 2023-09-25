import { Modal, StyleSheet, Text, Button, TouchableWithoutFeedback, View } from 'react-native';
import { Border, Color, FontFamily, FontSize, Height } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
import CustomText from './CustemText';

export default function ListInput({ value, options, placeholder, changHandler, children, rightIcon }) {
    const { language } = useSelector(state => state.languageState);
    const [isFocused, setIsFocused] = useState(false);

    let theValue = options.find(x => x.id === value);
    return (
        <TouchableWithoutFeedback onPress={() => setIsFocused(!isFocused)} >
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
                <View style={{ flex: 1}} >
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
                            return <Picker.Item key={index} style={styles.item} label={item[language] || item} value={item.id} />
                        })}

                    </Picker>
                </View>

                {/* <CustomText style={[styles.item, { flex: 1, color: value ? Color.black : Color.darkgray }]}>
                    {(theValue ? theValue[language] : value) || placeholder}
                </CustomText> */}

                {value ?
                    < Ionicons style={styles.leftIcon} name={"checkmark"} size={FontSize.size_xl} color={Color.darkcyan} />
                    : <View style={styles.leftIcon}>

                    </View>
                }
            </View>
        </TouchableWithoutFeedback>
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
        alignItems: "center"
    },
    inputCove: {
        flex: 1,
        backgroundColor: Color.yellow,

    },
    item: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_md,
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
