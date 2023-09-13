import { StyleSheet, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Search_icon_Svg } from '../assets/icons/Icons';
import { Border, Color, FontFamily, FontSize } from '../GlobalStyles';
import { useNavigation } from '@react-navigation/core';

export default function SearchBar({ autoFocus, button, changHandler, value }) {
  const [isFocused, setIsFocused] = useState(!button)
  const navigation = useNavigation()

  return (
    <View style={[styles.inputField, {
      shadowColor: isFocused ? Color.darkcyan : Color.darkgray,
      borderColor: isFocused ? Color.darkcyan : Color.input_stroke,
      flexDirection: "row"
    }]}>
      <TextInput style={[styles.input, {
        textAlign: "right",
        paddingLeft: 46
      }]}
        autoFocus={autoFocus}
        placeholder={"Search"}
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
    backgroundColor: Color.input_fill,
    borderRadius: Border.br_6xl,
    marginBottom: 24,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: Platform.OS === 'android' ? 10 : 0,
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