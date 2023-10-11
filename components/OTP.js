import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Border, Color, FontFamily, FontSize, Height, Margin, fontEm } from "../GlobalStyles";

const OTPInput = ({ length, onComplete }) => {
  const [otp, setOTP] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (value, index) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (index < length - 1 && value !== "") {
      inputRefs.current[index + 1].focus();
    }

    if (newOTP.every((code) => code !== "")) {
      onComplete(newOTP.join(""));
    }
  };

  const handleInputKeyPress = (event, index) => {
    if (event.nativeEvent.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.otpContainer}>
      {otp.map((value, index) => (
        <View
          key={index}
          style={[
            styles.otpInputField,
            {
              borderColor:
                isFocused === index ? Color.darkcyan : Color.input_stroke,
            },
          ]}
        >
          <TextInput
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={value}
            onChangeText={(text) => handleInputChange(text, index)}
            onKeyPress={(event) => handleInputKeyPress(event, index)}
            style={styles.otpInput}
            maxLength={1}
            autoFocus={index === 0}
            keyboardType="numeric"
            onFocus={() => setIsFocused(index)}
            onBlur={() => setIsFocused(false)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flex: 1,
    width: "100%",
    maxWidth: 450,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: Margin.m_m1,
  },
  otpInputField: {
    width: Height.br_lg,
    height: Height.br_lg,
    borderWidth: 1,
    backgroundColor: Color.input_fill,
    borderColor: Color.input_stroke,
    borderRadius: FontSize.size_lg,
    marginTop: 18,
  },
  otpInput: {
    flex: 1,
    height: Height.br_lg,
    fontFamily: FontFamily.montserratArabic,
    fontSize: FontSize.size_xl,
    textAlign: "center",
  },
});

export default OTPInput;
