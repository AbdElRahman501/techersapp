import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

/* fonts */
export const FontFamily = {
  montserratArabic: "Montserrat-Arabic",
  // montserratBold: "Montserrat-Bold",
};
/* font sizes */
export const FontSize = {
  size_sm: 14,
  size_smi: 13,
  size_md: 18,
  size_lg: width * 0.05,
  size_xl: width * 0.06,
  size_xxl: width * 0.06,
  size_3xl: 42,
  size_base: width * 0.04,
};
/* Colors */
export const Color = {
  white: "#fff",
  black: "#000",
  gray_100: "#101623",
  gray_200: "rgba(16, 22, 35, 0.6)",
  darkcyan: "#199a8e",
  darkgray: "#a1a8b0",
  input_fill: "#F9FAFB",
  input_stroke: "#CACDD1",
};
/* Paddings */
export const Padding = {
  p_8xl: 27,
  p_90xl: 109,
  p_mini_6: 15,
  p_23xl: 42,
  p_5xs: 8,
  p_B: 74
};
/* Paddings */
export const Margin = {
  m_base: 16,
  m_m1: 18,
  m_lg: 24,
  m_xl: 48,
};
/* border radiuses */
export const Border = {
  br_13xl: 32,
  br_37xl: 56,
  br_6xl: 25,
};
/* heights */
export const Height = {
  hi_s: 32,
  br_lg: 56,
  br_xl: 71,
};
/* heights */
export const heightPercentage = (parent) => {
  return (height * parent)/100
};
export const widthPercentage = (parent) => {
  return (width * parent)/100
};
export const fontEm = (em) => {
  return (widthPercentage(4)*em)
};

