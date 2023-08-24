import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Search_icon_Svg } from '../assets/icons/Icons';
import { Border, Color, FontFamily, FontSize, fontEm } from '../GlobalStyles';

export default function SearchBar() {
  const [value, setValue] = useState("")
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.inputField, { borderColor: isFocused ? Color.darkcyan : Color.input_stroke, flexDirection: "row" }]}>

      <TextInput style={[styles.input, {
        textAlign: "right",
        paddingLeft: 46
      }]}
        placeholder={"Search"}
        autoCapitalize="none"
        onChangeText={e => setValue(e)}
        value={value}
        keyboardType={"default"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <View style={styles.rightIcon}>
        <Search_icon_Svg
          width={30}
          height={30}
          viewBox="0 0 24 24"
          color={isFocused ? Color.darkcyan : Color.input_stroke}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    width: "95%",
    maxWidth: 500,
    height: 46,
    borderWidth: 1,
    borderColor: Color.input_stroke,
    backgroundColor: Color.input_fill,
    borderRadius: Border.br_6xl,
    marginBottom: 24
  },
  input: {
    flex: 1,
    height: 46,
    fontFamily: FontFamily.montserratArabic,
    fontSize: FontSize.size_base
  },
  rightIcon: {
    paddingTop: 8,
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center"
  }
})