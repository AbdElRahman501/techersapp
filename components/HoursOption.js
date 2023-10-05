import React, { useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Color, globalStyles } from '../GlobalStyles'
import { useSelector } from 'react-redux';
import { areAppointmentsOverlapping, transformTime } from '../actions/GlobalFunctions';
import BookingModal from './BookingModal';

const HoursOption = React.memo(({ item, selectedHour, myBookedHours, handelPress, disabled }) => {
    const { language } = useSelector(state => state.languageState)
    const [unavailable, setUnavailable] = useState(false);
    let isSelected = selectedHour === item.timeIn24Format
    useEffect(() => {
        if (myBookedHours) {
            let overlapping = myBookedHours.find(secItem => areAppointmentsOverlapping(item, secItem));
            setUnavailable(overlapping ? true : false)
        }
    }, [myBookedHours])
    const [isModalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <BookingModal
                myBookedHour={myBookedHours.find(secItem => areAppointmentsOverlapping(item, secItem))}
                isBooked={isModalVisible}
                onClose={handleCloseModal}
            />
            <TouchableWithoutFeedback
                onPress={() => {
                    if (unavailable) {
                        setModalVisible(true)
                    } else {
                        handelPress(item)
                    }
                }}   >
                <View style={[globalStyles.dayCard, {
                    width: 100,
                    height: 40,
                    backgroundColor: isSelected ? Color.darkcyan : item?.secondary ? Color.cyanBackGround : Color.white,
                    opacity: unavailable ? 0.5 : 1
                }]}>
                    <Text style={[globalStyles.regular, { color: isSelected ? Color.white : Color.black }]} >
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
