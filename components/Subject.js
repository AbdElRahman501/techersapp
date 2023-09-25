import { StyleSheet, Image, Text, View, Platform, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core';
import transition from '../actions/transition';

const Subject = React.memo(({ item }) => {
    const { language } = useSelector(state => state.languageState)
    const navigation = useNavigation()
    const [clicked, setClicked] = useState(false);

    const handelScale = () => {
        setClicked(true)
        setTimeout(() => {
            setClicked(false)
            navigation.navigate("SubjectScreen", { item })
        }, 250);
    }

    return (
        <TouchableWithoutFeedback onPress={handelScale} >
            <Animated.View style={[styles.card, { transform: [{ scale: transition(1, 0.8, 200, clicked) }] }]}>
                <View style={[styles.subject, {
                }]}>
                    <Image
                        style={{ height: "80%", width: "80%" }}
                        resizeMode="contain"
                        source={item.imageSource}
                    />
                </View>
                <Text style={styles.title}>{item[language]}</Text>
            </Animated.View>
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
        alignItems: 'center',
        margin: 10
    },
    title: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        color: Color.darkcyan
    }

})