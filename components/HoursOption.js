import { StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import transition from '../actions/transition';
import { useSelector } from 'react-redux';
import { transformTime } from '../actions/GlobalFunctions';

const HoursOption = React.memo(({ item, SelectedId, handelPress, disabled }) => {
    const { language } = useSelector(state => state.languageState)
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (item.timeIn24Format === SelectedId) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    }, [SelectedId])


    return (
        <TouchableWithoutFeedback style={{}}
            onPress={() => handelPress(item.timeIn24Format)} disabled={disabled}  >
            <View style={[styles.card]}>
                <Animated.View style={[styles.subject, { backgroundColor: transition(Color.white, Color.darkcyan, 200, trigger), opacity: disabled ? 0.5 : 1 }]}>
                    <Animated.Text style={[styles.title, { color: transition(Color.black, Color.white, 200, trigger) }]} >
                        {transformTime(item.timeIn24Format, language)}
                    </Animated.Text>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback >
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default HoursOption;
const styles = StyleSheet.create({
    subject: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 5,
        borderColor: Color.lightGray,
        borderWidth: 1,
        marginBottom: 5

    },
    card: {
        alignItems: 'center',
        marginHorizontal: 5
    },
    title: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    }
})