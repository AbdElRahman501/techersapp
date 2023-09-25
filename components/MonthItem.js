import { StyleSheet, Text, View, Platform, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import t from '../actions/changeLanguage';

const MonthItem = React.memo(({ item }) => {
    const { language } = useSelector(state => state.languageState)
    const [trigger, setTrigger] = useState(false);

    const checkFirstInDays = () => {
        const currentDate = new Date();
        const currentDayOfMonth = currentDate.getDate();
        return (currentDayOfMonth <= 7)
    };

    return (
        <TouchableWithoutFeedback onPress={() => setTrigger(!trigger)} >
            <View style={[styles.card]}>
                <View style={[styles.state, { backgroundColor: item.payed ? Color.darkcyan : checkFirstInDays() ? Color.yellow : Color.red }]}>
                    <Text style={styles.stateText} >
                        {item.payed ? t("paid") : checkFirstInDays() ? t("coming") : t("unpaid")}
                    </Text>
                </View>
                <View style={[styles.subject, {
                    height: 60, borderBottomRightRadius: 0,
                }]}>
                    <Text numberOfLines={1} lineBreakMode="tail" style={styles.title} >{item.month[language]}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default MonthItem;
const styles = StyleSheet.create({
    subject: {
        width: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 2,
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
        margin: 5,
        height: 80,
    },
    title: {
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black,
    },
    state: {
        borderRadius: 16,
        position: 'absolute',
        width: 55,
        height: 80,
        top: 0,
        left: 0,
        justifyContent: 'flex-end',
        zIndex: -1
    },
    stateText: {
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.montserratArabic,
        color: Color.white,
        textAlign: 'center',
        paddingVertical: 4
    },
    dot: {
        position: 'absolute',
        bottom: 5,
        width: 5,
        height: 5,
        borderRadius: 2.5,
    }

})