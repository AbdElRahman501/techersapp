import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Color, FontFamily, FontSize, fontEm, heightPercentage, widthPercentage } from '../GlobalStyles';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import t from '../actions/changeLanguage';
import { getSubjectTitle, getTitle } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';

const AdItem = React.memo(({ item, holdHandler }) => {
    const { language } = useSelector(state => state.languageState)
    const navigation = useNavigation()
    const handlePress = () => {
        navigation.navigate("TeacherScreen", { item })
    }
    return (
        <LongPressGestureHandler onHandlerStateChange={holdHandler} >
            <View style={styles.itemContainer} >
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{getTitle(item.gender, item.name)}</Text>
                    <Text style={styles.content}>{getSubjectTitle(item.gender, item.mainSubject[language])}</Text>
                    <TouchableOpacity onPress={handlePress} style={styles.primaryButton}>
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
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
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
        fontSize: fontEm(1.3),
        fontFamily: FontFamily.montserratArabic,
        color: Color.black,
        textAlign: 'center'
    },
    content: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        color: Color.gray_200,
        textAlign: 'center'

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