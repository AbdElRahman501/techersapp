import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Border, Color, FontFamily, fontEm } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function DatePicker({ value, placeholder, changHandler, children, rightIcon }) {
    const { language } = useSelector(state => state.languageState);
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date(2005, 0, 1));

    const handleDateChange = (event, selectedDate) => {
        if (selectedDate.toString() !== date.toString()) {
            setDate(selectedDate);
        }
        setDatePicker(false);
        if (selectedDate.toString() !== date.toString()) {
            changHandler(Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(selectedDate).toString());
        }
    };


    return (
        <TouchableOpacity
            style={[styles.inputField, {
                borderColor: datePicker ? Color.darkcyan : Color.input_stroke,
                flexDirection: language === "en" ? "row" : "row-reverse"
            }]}
            onPress={() => setDatePicker(true)} >

            {!children ?
                <Ionicons style={styles.rightIcon} name={rightIcon} size={fontEm(1.5)}
                    color={datePicker ? Color.darkcyan : Color.darkgray} />
                :
                <View style={styles.rightIcon}>
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            width: fontEm(1.8),
                            height: fontEm(1.8),
                            viewBox: "0 0 24 24",
                            color: datePicker ? Color.darkcyan : Color.darkgray
                        });
                    })}
                </View>
            }
            <Text style={[styles.input, { color: value ? Color.black : Color.darkgray }]}>
                {value || placeholder}
            </Text>
            {value &&
                < Ionicons style={styles.leftIcon} name={"checkmark"} size={fontEm(1.5)} color={Color.darkcyan} />
            }
            {datePicker &&
                <DateTimePicker
                    value={date}
                    minimumDate={new Date(1995, 0, 1)}
                    maximumDate={new Date(2020, 11, 31)}
                    mode="date"
                    onChange={handleDateChange} />
            }
        </TouchableOpacity>
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
        // paddingHorizontal: fontEm(3.5),
        fontFamily: FontFamily.montserratArabic,
        fontSize: fontEm(1.2),
        textAlignVertical: "center",

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
