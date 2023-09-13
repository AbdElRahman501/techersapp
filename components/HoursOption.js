import { StyleSheet, View, Animated, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import transition from '../actions/transition';
import { useSelector } from 'react-redux';
import { isTimeBetween, transformTime } from '../actions/GlobalFunctions';
import BookingModal from './BookingModal';

const HoursOption = React.memo(({ item, SelectedId, myBookedHours, handelPress, disabled }) => {
    const { language } = useSelector(state => state.languageState)
    const [trigger, setTrigger] = useState(false);
    const [unavailable, setUnavailable] = useState(false);

    useEffect(() => {
        if (item.timeIn24Format === SelectedId) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    }, [SelectedId])


    useEffect(() => {
        if (myBookedHours) {
            let unAvailable = myBookedHours.find(time => isTimeBetween(item.timeIn24Format, time.start, time.end));
            setUnavailable(unAvailable ? true : false)
        }
    }, [myBookedHours])
    const [isModalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    };


    return (
        <>
            <BookingModal
                myBookedHour={myBookedHours?.find(time => isTimeBetween(item.timeIn24Format, time.start, time.end))}
                isBooked={isModalVisible}
                onClose={handleCloseModal}
            />
            <TouchableWithoutFeedback style={{}}
                onPress={() => {
                    if (unavailable) {
                        setModalVisible(true)
                    } else {
                        handelPress(item.timeIn24Format)
                    }
                }}   >

                <View style={[styles.card]}>
                    <Animated.View style={[styles.subject, { backgroundColor: transition(Color.white, Color.darkcyan, 50, trigger), opacity: unavailable ? 0.5 : 1 }]}>
                        <Animated.Text style={[styles.title, { color: transition(Color.black, Color.white, 50, trigger) }]} >
                            {transformTime(item.timeIn24Format, language)}
                        </Animated.Text>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback >
        </>
    )
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