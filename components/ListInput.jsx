import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Border, Color, FontFamily, fontEm } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
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
                <Ionicons style={styles.rightIcon} name={rightIcon} size={fontEm(1.5)}
                    color={isFocused ? Color.darkcyan : Color.darkgray} />
                :
                <View style={styles.rightIcon}>
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            width: fontEm(1.8),
                            height: fontEm(1.8),
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
                    <Picker.Item style={styles.item } label={placeholder} value={null} />
                    {options.map((item, index) => {
                        return <Picker.Item key={index} style={styles.item} label={item} value={item} />
                    })}

                </Picker>
                {Platform.OS === 'android' ? (
                    <View style={styles.inputCove} pointerEvents='none' >
                        <Text style={[styles.item, { color: value ? Color.black : Color.darkgray }]}>
                            {value || placeholder}
                        </Text>
                    </View>
                ) : (<View></View>)}
            </View>

            {value ?
                < Ionicons style={styles.leftIcon} name={"checkmark"} size={fontEm(1.5)} color={Color.darkcyan} />
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
        textAlignVertical: "center",

    },
    inputCove: {
        height: fontEm(3.4),
        width: "100%",
        marginLeft: fontEm(3.5),
        justifyContent: "center",
        alignSelf: "flex-end",
        position: 'absolute',
        backgroundColor: Color.white
    },
    item: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: fontEm(1.2),
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
