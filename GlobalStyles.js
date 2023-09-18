import { Dimensions, Appearance, StyleSheet } from 'react-native';
import { } from 'react-native';

const colorScheme = Appearance.getColorScheme();
const isDark = colorScheme === 'dark';
// const isDark = false;
console.log("🚀 ~ file: GlobalStyles.js:6 ~ isDark:", isDark)

const { width, height } = Dimensions.get('window');
console.log("🚀 ~ file: GlobalStyles.js:9 ~ width, height:", width, height)


// Appearance.addChangeListener(({ colorScheme }) => {
//   console.log("🚀 ~ file: GlobalStyles.js:14 ~ Appearance.addChangeListener ~ colorScheme:", colorScheme)
// });


/* fonts */
export const FontFamily = {
  montserratArabic: "Montserrat-Arabic",
  // montserratBold: "Montserrat-Bold",
};
/* font sizes */
export const FontSize = {
  size_smi: 10,
  size_sm: 12,
  size_md: 14,
  size_base: 16,
  size_lg: 18,
  size_xl: 24,
  size_xxl: 32,
  size_3xl: 42,
};
/* Colors */
export const Color = {
  white: "#fff",
  black: "#000",
  lightGray: isDark ? "rgba(200, 200, 200, 0.9)" : 'rgba(0, 0, 0, 0.10)',
  gray_100: "#101623",
  gray_200: "rgba(16, 22, 35, 0.6)",
  darkcyan: "#199a8e",
  cyanBackGround: "#E8F3F1",
  darkgray: "#a1a8b0",
  input_fill: isDark ? "rgba(75, 75, 75, .8)" : "#F9FAFB",
  input_stroke: isDark ? "#101623" : "#CACDD1",
  yellow: "#FBBC05",
  red: "#FF5C5C",
  orange: "#FFA500",
  blue: "blue"
};

/* Paddings */
export const Padding = {
  p_sm: 8,
  p_m: 12,
  p_base: 18,
  p_lg: 24,
  p_xl: 32,
  p_xxl: 48,
  page_p: 20,
  teacher_tap: 10,

};
/* Paddings */
export const Margin = {
  m_base: 16,
  m_sm: 12,
  m_m1: 18,
  m_lg: 24,
  m_xl: 48,
  m_xxl: 64
};
/* border radiuses */
export const Border = {
  br_13xl: 32,
  br_26xl: 52,
  br_6xl: 25,
  br_3xl: 15,
};
/* heights */
export const Height = {
  hi_s: 32,
  hi_m: 48,
  hi_input: 46,
  hi_md: 56,
  br_lg: 64,
  br_xl: 71,
  nav_tap: 64,
  teacher_tap: 64,

};
export const heightPercentage = (parent) => {
  return (height * parent) / 100
};
export const widthPercentage = (parent) => {
  return (width * parent) / 100
};
export const fontEm = (em) => {
  return (widthPercentage(4) * em)
};
export const getColorByIndex = (index) => {
  const colors = [Color.darkcyan, Color.blue, Color.yellow, Color.red, Color.orange];
  const colorIndex = index % colors.length;
  return colors[colorIndex];
}
export const globalStyles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    paddingTop: Height.hi_m
  },
  scrollBody: {
    flex: 1,
    backgroundColor: Color.white
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shadowBox: {
    shadowColor: Color.darkgray,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5
  },
  title: {
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.montserratArabic,
    color: Color.black,
    textAlign: 'center'
  },
  regular: {
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.montserratArabic,
    color: Color.black
  },
  contentText: {
    fontSize: FontSize.size_md,
    fontFamily: FontFamily.montserratArabic,
    color: Color.gray_200
  },
  smallText: {
    fontSize: FontSize.size_sm,
    fontFamily: FontFamily.montserratArabic,
    color: Color.gray_200
  },
  dayCard: {
    width: 55,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    padding: 5,
    borderColor: Color.lightGray,
    borderWidth: 1,
    marginHorizontal: 5
  },
  eventBall: {
    width: 5,
    height: 5,
    borderRadius: 2.5
  },
  eventCard: {
    position: 'absolute',
    left: 80,
    width: widthPercentage(100) - 160,
    backgroundColor: Color.white,
    borderRadius: Border.br_13xl,
    padding: 10
  }
});

//490.90908026892316 980.4545242037659
// 392.72727272727275 774.9090909090909
//374.8372915849355 739.6095077476829