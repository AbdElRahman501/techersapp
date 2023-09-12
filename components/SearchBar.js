import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { Search_icon_Svg } from '../assets/icons/Icons';
import { Border, Color, FontFamily, FontSize, widthPercentage } from '../GlobalStyles';
import { useSelector } from 'react-redux';
import t from '../actions/changeLanguage';
import SearchModal from './SearchModal';

export default function SearchBar({ isFocused, setIsFocused }) {
  const { language } = useSelector(state => state.languageState);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsFocused(!isFocused)} style={[styles.inputField, { flexDirection: language === "ar" ? "row-reverse" : "row" }]}>
        <View style={styles.rightIcon}>
          <Search_icon_Svg
            width={30}
            height={30}
            viewBox="0 0 24 24"
            color={isFocused ? Color.darkcyan : Color.input_stroke}
          />
        </View>
        <Text style={[styles.input]}>
          {t("search")}
        </Text>
      </TouchableOpacity>
      <SearchModal isFocused={isFocused} setIsFocused={setIsFocused} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: widthPercentage(100),
    alignItems: "center",
    backgroundColor: Color.white,
  },
  inputField: {
    width: "85%",
    maxWidth: 500,
    height: 46,
    backgroundColor: Color.input_fill,
    borderRadius: Border.br_6xl,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    height: 46,
    fontFamily: FontFamily.montserratArabic,
    fontSize: FontSize.size_base,
    textAlignVertical: "center",
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratArabic,
    color: Color.darkgray

  },
  rightIcon: {
    paddingTop: 8,
    width: 46,
    height: 46,
    justifyContent: "center",
    alignItems: "center"
  }
})