import React from 'react'
import { View, Text, StyleSheet, Image, Animated, ImageBackground } from 'react-native';
import { Color, FontFamily, FontSize, Height, Padding, heightPercentage, widthPercentage } from '../GlobalStyles';
import { useSelector } from 'react-redux';
import transition from '../actions/transition';

const OnboardSlide = React.memo(({ item, index, scrolledIndex }) => {
    const { language } = useSelector(state => state.languageState)
    return (
        <View style={styles.itemContainer} >
            <ImageBackground
                style={styles.itemContainer}
                resizeMode="contain"
                source={item.backgroundImageSource}
            >
                <Animated.Image
                    style={{ width: "100%", height: "65%", alignSelf: "center", transform: [{ translateY: transition(50, 0, 300, index === scrolledIndex) }], opacity: transition(0, 1, 300, index === scrolledIndex) }}
                    resizeMode="contain"
                    source={item.imageSource}
                />

                <Animated.Text style={[styles.title, { transform: [{ translateY: transition(50, 0, 500, index === scrolledIndex) }], opacity: transition(0, 1, 500, index === scrolledIndex) }]}>{item.title[language]}</Animated.Text>
                <Animated.Text style={[styles.content, { transform: [{ translateY: transition(50, 0, 600, index === scrolledIndex) }], opacity: transition(0, 1, 600, index === scrolledIndex) }]}>{item.content[language]}</Animated.Text>
            </ImageBackground>
        </View >
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});
export default OnboardSlide;

const styles = StyleSheet.create({

    itemContainer: {
        width: widthPercentage(100),
        height: heightPercentage(100) - Height.hi_md - (Padding.p_xl * 2),
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: 20,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black,
        paddingBottom: 10,
        textAlign: 'center',
        width: "90%"
    },
    content: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        color: Color.gray_200,
        textAlign: 'center',
        width: "80%"


    },

})