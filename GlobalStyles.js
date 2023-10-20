import { Dimensions, StyleSheet } from 'react-native';


const { width, height } = Dimensions.get('window');
console.log("🚀 ~ file: GlobalStyles.js:9 ~ width, height:", width, height)



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
  ofWhite: "#F9FAFB",
  black: "#000",
  lightGray: 'rgba(0, 0, 0, 0.10)',
  gray_100: "#101623",
  gray_200: "rgba(16, 22, 35, 0.6)",
  darkcyan: "#199a8e",
  lightCyan: "#d1ece9",
  cyanBackGround: "#E8F3F1",
  darkgray: "#a1a8b0",
  input_fill: "#F9FAFB",
  input_stroke: "#CACDD1",
  yellow: "#FBBC05",
  red: "#FF5C5C",
  orange: "#FFA500",
  blue: "blue",
  green: "green",
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
  logo_lg: 110,
  nav_tap: 64,
  teacher_tap: 64,
  hi_container: 80,
  hi_backContainer: (Margin.m_sm * 2) + 24,

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
  const colors = ['#FF0000', '#FF7F00', '#808000', '#008000', '#0000FF', '#4B0082', '#8B00FF']
  const colorIndex = index % colors.length || 0;
  return colors[colorIndex];
}
export const globalStyles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Padding.p_m,
    paddingHorizontal: Padding.page_p,
    marginBottom: Height.nav_tap + 20
  },
  logo: {
    height: Height.logo_lg,
    width: "100%",
    marginBottom: fontEm(1),
    alignSelf: "center"
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
  bodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: Height.hi_backContainer,
    paddingHorizontal: Padding.page_p
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
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
    width: widthPercentage(100) - 120,
    backgroundColor: Color.white,
    borderRadius: Border.br_13xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Color.lightGray, // Adjust the color of the divider as needed
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    marginVertical: Margin.m_base,
    marginHorizontal: Margin.m_base,
    width: "100%",
    alignItems: 'center',
    maxWidth: 400
  },
  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  secondaryButton: {
    backgroundColor: Color.white,
    borderColor: Color.darkcyan,
    borderWidth: 2
  },
  googleButton: {
    maxWidth: 400,
    backgroundColor: Color.input_fill,
    borderColor: Color.lightGray,
    borderWidth: 2
  },
  student: {
    padding: 5,
    marginVertical: Margin.m_sm,
    borderColor: Color.lightGray,
    width: "100%",
    borderWidth: 1,
    borderRadius: (Height.hi_md / 2) + 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    minWidth: "80%",
    maxWidth: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  gender: {
    height: 90,
    width: 90,
    margin: 5,
    borderRadius: 45,
    borderWidth: 2,
    borderColor: Color.lightGray,
    justifyContent: "center",
    alignItems: "center"
  },
  inputField: {
    width: "100%",
    maxWidth: 500,
    height: Height.hi_md,
    borderWidth: 1,
    borderColor: Color.input_stroke,
    backgroundColor: Color.input_fill,
    borderRadius: Border.br_6xl,
    marginTop: 18,
    alignItems: "center"
  },
  leftIcon: {
    textAlign: "center",
    width: Height.hi_md,
    justifyContent: "center",
    alignItems: "center"
  },
  rightIcon: {
    textAlign: "center",
    textAlignVertical: "center",
    width: Height.hi_md,
    height: Height.hi_md,
    justifyContent: "center",
    alignItems: "center"
  }
});

//490.90908026892316 980.4545242037659
// 392.72727272727275 774.9090909090909
//374.8372915849355 739.6095077476829