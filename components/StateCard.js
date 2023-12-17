import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { getScoreColor, getStateColor, globalStyles } from '../GlobalStyles'
import { Color, Height } from '../GlobalStyles'
import { useSelector } from 'react-redux';
import CustomText from './CustemText';
import ScoreBar from './ScoreBar';
import { AntDesign, FontAwesome5, Entypo } from '@expo/vector-icons';
import t from '../actions/changeLanguage';
import Animated, { FadeInDown } from 'react-native-reanimated';
export default function StateCard({ item, index }) {
    const { language } = useSelector(state => state.languageState)

    const Svg_icon = (props) => {
        switch (props?.type) {
            case "exams":
                return <AntDesign name="carryout"  {...props} />;
            case "payment":
                return <FontAwesome5 name="dollar-sign" {...props} />;
            case "homework":
                return <Entypo name="open-book" {...props} />;
            case "attendance":
                return <Entypo name="stopwatch"  {...props} />
            default:
                return <Text>{props.type || "none"}</Text>;
        }
    }
    const color = item.score >= 0 ? getScoreColor(item.score) : getStateColor(item.state)
    return (
        <Animated.View entering={FadeInDown.duration(400 + (index * 200))} style={[globalStyles.shadowBox, styles.card, { flexDirection: language === "ar" ? "row-reverse" : "row" }]} >
            <View style={[styles.icon, { backgroundColor: color }]}>
                <Svg_icon type={item.type} size={Height.hi_c - 30} color={Color.white} />
            </View>
            <View style={{ flex: 1 }}>
                <CustomText style={[globalStyles.regular]} >{t(item.type)}</CustomText>
                <CustomText style={[globalStyles.contentText]} >{item.description}</CustomText>
            </View>
            <View >
                <ScoreBar width={Height.hi_c - 10} strokeWidth={5} score={item.score} state={item.state} />
            </View>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    card: {
        justifyContent: "space-between",
        alignItems: "center",
        height: Height.hi_c,
        // marginHorizontal: 20,
        borderRadius: 16,
        backgroundColor: Color.white,
        padding: 5,
        marginBottom: 5,
        gap: 10,
        borderWidth: 1,
        borderColor: Color.lightGray,
    },
    icon: {
        width: Height.hi_c - 10,
        height: Height.hi_c - 10,
        borderRadius: (Height.hi_c - 10) / 2,
        justifyContent: "center",
        alignItems: "center",
    }
})