import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Border, Color, FontFamily, FontSize, Height } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
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
                <Ionicons style={styles.rightIcon} name={rightIcon} size={FontSize.size_xl}
                    color={datePicker ? Color.darkcyan : Color.darkgray} />
                :
                <View style={styles.rightIcon}>
                    {React.Children.map(children, (child) => {
                        return React.cloneElement(child, {
                            width: FontSize.size_xl,
                            height: FontSize.size_xl,
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
                < Ionicons style={styles.leftIcon} name={"checkmark"} size={FontSize.size_xl} color={Color.darkcyan} />
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
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_md,
        textAlignVertical: "center",

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
