import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Border, Color, FontFamily, fontEm } from "../GlobalStyles";

const OTPInput = ({ length = 4, onComplete }) => {
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: fontEm(1),
  },
  otpInputField: {
    width: fontEm(4),
    height: fontEm(4),
    borderWidth: 2,
    backgroundColor: Color.white,
    borderRadius: Border.br_6xl,
    marginTop: 18,
  },
  otpInput: {
    flex: 1,
    height: fontEm(4),
    fontFamily: FontFamily.montserratArabic,
    fontSize: fontEm(2),
    textAlign: "center",
  },
});

export default OTPInput;
