import { StyleSheet, Text, View, Platform, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import transition from '../actions/transition';

const DayItem = React.memo(({ item, SelectedId, handelPress }) => {
    const { language } = useSelector(state => state.languageState)
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (item.id === SelectedId) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    }, [SelectedId])


    return (
        <TouchableWithoutFeedback onPress={() => handelPress(item.id)} >
            <View style={[styles.card]}>
                <Animated.View style={[styles.subject, { backgroundColor: transition(Color.white, Color.darkcyan, 200, trigger) }]}>
                    <Animated.Text style={[styles.regular, { color: transition(Color.black, Color.white, 200, trigger) }]} >{item.day[language]}</Animated.Text>
                    <Animated.Text style={[styles.title, { color: transition(Color.black, Color.white, 200, trigger) }]} >{item.date}</Animated.Text>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback >
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default DayItem;
const styles = StyleSheet.create({
    subject: {
        width: 55,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 5,
        borderColor: Color.lightGray,
        borderWidth: 1

    },
    card: {
        alignItems: 'center',
        marginHorizontal: 5
    },
    title: {
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    },
    regular: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_sm,
        color: Color.darkgray
    },




})