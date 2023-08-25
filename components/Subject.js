import { StyleSheet, Image, Text, View, Platform, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core';

const Subject = React.memo(({ item }) => {
    const { language } = useSelector(state => state.languageState)
    const navigation = useNavigation();
    const pressHandler = () => {
        navigation.navigate("SubjectScreen", { item })
    }

    return (
        <TouchableWithoutFeedback onPress={pressHandler} >
            <View style={styles.card} >
                <View style={styles.subject}>
                    <Image
                        style={{ height: "80%", width: "80%" }}
                        resizeMode="contain"
                        source={item.imageSource}
                    />
                </View>
                <Text style={styles.title}>{item.title[language]}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default Subject;
const styles = StyleSheet.create({
    subject: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 5,
        marginBottom: 10,
        backgroundColor: Color.white,
        ...Platform.select({
            ios: {
                shadowColor: Color.lightGray,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 7,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    card: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    title: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        color: Color.darkcyan
    }

})