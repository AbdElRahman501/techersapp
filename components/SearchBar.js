import { Platform, StyleSheet, TextInput, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import { Search_icon_Svg } from '../assets/icons/Icons';
import { Border, Color, FontFamily, FontSize, Height, globalStyles } from '../GlobalStyles';
import { useNavigation } from '@react-navigation/core';
import t from '../actions/changeLanguage';
import Animated from 'react-native-reanimated';
import { getTextInputAlign } from '../actions/GlobalFunctions';
import { useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
export default function SearchBar({ autoFocus, button, changHandler, value, ...props }) {
  const [isFocused, setIsFocused] = useState(!button)
  const navigation = useNavigation()
  const { language } = useSelector(state => state.languageState);

  const isDark = useColorScheme() === 'dark'

  return (
    <Animated.View
      sharedTransitionTag={"Search Bar"}
      style={[styles.inputField, {
        shadowColor: isFocused ? Color.darkcyan : isDark ? "none" : Color.darkgray,
        flexDirection: language === "en" ? "row" : "row-reverse"
      }]}>
      <View style={styles.rightIcon}>
        <Search_icon_Svg
          width={30}
          height={30}
          viewBox="0 0 24 24"
          color={isFocused ? Color.darkcyan : Color.input_stroke}
        />
      </View>
      <TextInput style={[styles.input, {
        textAlign: getTextInputAlign(value),
      }]}
        placeholder={t("search")}
        autoCapitalize="none"
        onChangeText={changHandler}
        value={value}
        keyboardType={"default"}
        onFocus={() => {
          if (button) {
            navigation.navigate("SearchScreen")
          } else {
            setIsFocused(true)
          }
        }
        }
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      <TouchableOpacity style={[value && globalStyles.shadowBox, styles.leftIcon, { backgroundColor: value ? Color.white : "transparent" }]} onPress={() => changHandler("")}>
        {value && <Feather name="x" size={24} color="black" />}
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  inputField: {
    width: "100%",
    flex: 1,
    height: Height.hi_input,
    backgroundColor: Color.input_fill,
    borderRadius: Border.br_6xl,
    marginBottom: 24,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: Platform.OS === 'android' ? 10 : 0,
  },
  input: {
    flex: 1,
    height: Height.hi_input,
    fontFamily: FontFamily.montserratArabic,
    fontSize: FontSize.size_base,
  },
  rightIcon: {
    paddingTop: 8,
    width: Height.hi_input,
    height: Height.hi_input,
    justifyContent: "center",
    alignItems: "center"
  },
  leftIcon: {
    flex: 1,
    textAlign: "center",
    width: Height.hi_md - 20,
    maxWidth: Height.hi_md - 20,
    maxHeight: Height.hi_md - 20,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    borderRadius: Border.br_6xl
  },
})