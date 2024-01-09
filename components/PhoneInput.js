import React, { useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Border, Color, FontSize, Height, globalStyles, } from '../GlobalStyles'
import PhoneNumberInput from 'react-native-phone-number-input';
import t from "../actions/changeLanguage";
import { Ionicons } from '@expo/vector-icons';


export default function PhoneInput({ value, onChangHandler, setFormattedPhone }) {
    const phoneInput = useRef(null);
    const [focus, setFocus] = useState(false);
    const [valid, setIsValid] = useState(false)

    const allowedArabicCountries = ['SA', 'EG', 'AE', 'JO', 'LB', 'KW', 'MA', 'QA', 'TN'];
    return (
        <View style={{ flexDirection: "row", backgroundColor: Color.input_fill, width: "100%", borderWidth: 1, borderColor: focus ? Color.darkcyan : Color.input_stroke, overflow: "hidden", borderRadius: Border.br_13xl }}>
            <PhoneNumberInput
                ref={phoneInput}
                textInputProps={{
                    onFocus: () => {
                        setFocus(true);
                    },
                    onBlur: () => {
                        setFocus(false);
                    }
                }}
                filterProps
                countryPickerProps={{
                    countryCodes: allowedArabicCountries,
                }}
                textInputStyle={{ textAlign: "left" }}
                textContainerStyle={{ backgroundColor: Color.input_fill }}
                containerStyle={{ flex: 1, backgroundColor: Color.input_fill }}
                flagButtonStyle={{ maxWidth: 86 }}
                defaultValue={value}
                placeholder={t("phone-number")}
                defaultCode="EG"
                layout="first"
                onChangeText={(text) => {
                    let number = text.charAt(0) === '0' ? text : '0' + text
                    let isValid = phoneInput.current.isValidNumber(number)
                    number = isValid ? number : text
                    setIsValid(isValid)
                    onChangHandler(number.trim().split(" ").join(""), phoneInput.current.isValidNumber(number))
                }}
                onChangeFormattedText={(text) => {
                    setFormattedPhone(text);
                }}
                autoFocus
            />
            {valid &&
                <View style={globalStyles.leftIcon}>
                    < Ionicons name={"checkmark"} size={FontSize.size_xl} color={Color.darkcyan} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({})