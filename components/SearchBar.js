import { StyleSheet, Animated, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Search_icon_Svg } from '../assets/icons/Icons';
import { Border, Color, FontFamily, FontSize, Padding, heightPercentage, widthPercentage } from '../GlobalStyles';
import { useSelector } from 'react-redux';
import { getTextInputAlign } from '../actions/GlobalFunctions';
import t from '../actions/changeLanguage';
import transition from '../actions/transition';
import SearchResults from './SearchResults';
import BackHeader from './BackHeader';

export default function SearchBar({ isFocused, setIsFocused }) {
  const { language } = useSelector(state => state.languageState);
  const [value, setValue] = useState("")
  const [results, setResults] = useState(false);
  const [yPosition, setYPosition] = useState(0)


  let Top = transition(yPosition, 0, 350, isFocused)
  let Bot = transition(-yPosition, 0, 350, !isFocused)
  let Height = transition(64, heightPercentage(100)+20, 350, isFocused)

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        setResults(true)
      }, 150)
    } else {
      setResults(false)
    }
  }, [isFocused])

  return (
    <Animated.View style={[styles.container, {
      height: Height,
      top: isFocused ? Top : Bot,
      position: isFocused ? "absolute" : "relative",
    }]}
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        if (!yPosition) {
          setYPosition(y)
        }
      }}
    >
      {results &&
        <BackHeader title={"search"} onPress={true} onPressHandler={() => setIsFocused(false)} />
      }
      <View style={[styles.inputField, { flexDirection: language === "ar" ? "row-reverse" : "row" }]}>
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
        // onBlur={() => setIsFocused(false)}
        />

      </View>
      {results && <SearchResults value={value} />}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: widthPercentage(100),
    alignItems: "center",
    zIndex: 999999,
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