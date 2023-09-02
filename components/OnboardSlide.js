import React from 'react'
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { Color, FontFamily, FontSize, heightPercentage, widthPercentage } from '../GlobalStyles';
import { useSelector } from 'react-redux';

const OnboardSlide = React.memo(({ item }) => {
    const { language } = useSelector(state => state.languageState)
    return (
        <View style={styles.itemContainer} >
            <ImageBackground
                style={styles.itemContainer}
                resizeMode="contain"
                source={item.backgroundImageSource}
            >
                <Image
                    style={{ width: widthPercentage(95), height: heightPercentage(60) }}
                    resizeMode="contain"
                    source={item.imageSource}
                />

                <Text style={styles.title}>{item.title[language]}</Text>
                <Text style={styles.content}>{item.content[language]}</Text>
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
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black,
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