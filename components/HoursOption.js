import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontFamily, FontSize, globalStyles } from '../GlobalStyles'
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
                <View style={[globalStyles.dayCard, {
                    width: 100,
                    height: 40,
                    backgroundColor: trigger ? Color.darkcyan : Color.white,
                    opacity: unavailable ? 0.5 : 1
                }]}>
                    <Text style={[globalStyles.regular, { color: trigger ? Color.white : Color.black }]} >
                        {transformTime(item.timeIn24Format, language)}
                    </Text>
                </View>
            </TouchableWithoutFeedback >
        </>
    )
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default HoursOption;
