import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Color, FontFamily, FontSize, fontEm, heightPercentage, widthPercentage } from '../GlobalStyles';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import t from '../actions/changeLanguage';

const AdItem = React.memo(({ item, holdHandler }) => {
    const { language } = useSelector(state => state.languageState)
    return (
        <LongPressGestureHandler onHandlerStateChange={holdHandler} >
            <View style={styles.itemContainer} >
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.title[language]}</Text>
                    <Text style={styles.content}>{item.content[language]}</Text>
                    <TouchableOpacity style={styles.primaryButton}>
                        <Text style={styles.primaryButtonText}>
                            {t("book-now")}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Image
                    style={{ height: heightPercentage(18), width: heightPercentage(18), borderRadius: 100, marginHorizontal: fontEm(1) }}
                    resizeMode="contain"
                    source={item.imageSource}
                />
            </View>
        </LongPressGestureHandler>
    );
});
export default AdItem;

const styles = StyleSheet.create({

    itemContainer: {
        width: widthPercentage(100) - 48,
        height: heightPercentage(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    },
    content: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        color: Color.gray_200
    },
    primaryButton: {
        marginTop: 10,
        height: 30,
        width: 100,
        backgroundColor: Color.darkcyan,
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
    , primaryButtonText: {
        color: Color.white,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic
    }
})