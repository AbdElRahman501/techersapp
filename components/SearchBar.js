import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Search_icon_Svg } from '../assets/icons/Icons';
import { Border, Color, FontFamily, FontSize } from '../GlobalStyles';
import { useSelector } from 'react-redux';
import { getTextInputAlign } from '../actions/GlobalFunctions';
import t from '../actions/changeLanguage';

export default function SearchBar() {
  const { language } = useSelector(state => state.languageState);
  const [value, setValue] = useState("")
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.inputField, { borderColor: isFocused ? Color.darkcyan : Color.input_stroke, flexDirection: language === "ar" ? "row-reverse" : "row" }]}>
      <View style={styles.rightIcon}>
        <Search_icon_Svg
          width={30}
          height={30}
          viewBox="0 0 24 24"
          color={isFocused ? Color.darkcyan : Color.input_stroke}
        />
      </View>
      <TextInput style={[styles.input, {
        textAlign: language === "en" ? "left" : (getTextInputAlign(value) || "right"),
        paddingLeft: (language === "ar" && getTextInputAlign(value) === "left") ? 46 : 0
      }]}
        placeholder={t("search")}
        autoCapitalize="none"
        onChangeText={e => setValue(e)}
        value={value}
        keyboardType={"default"}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

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