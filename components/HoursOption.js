import React, { useState, useEffect } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Color, globalStyles } from '../GlobalStyles'
import { useSelector } from 'react-redux';
import { areAppointmentsOverlapping, areGroupsOverLapped, transformTime } from '../actions/GlobalFunctions';
import BookingModal from './BookingModal';

const HoursOption = React.memo(({ item, selectedHour, teacher, myGroups, handelPress }) => {
    const { language } = useSelector(state => state.languageState)
    let isSelected = selectedHour === item.timeIn24Format
    const { overLapped: unavailable, overlappedTime } = areGroupsOverLapped(myGroups, teacher.groups.find(x => x.id === item.groupId))
    const [isModalVisible, setModalVisible] = useState(false);

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <>
            <BookingModal
                myBookedHour={overlappedTime}
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
