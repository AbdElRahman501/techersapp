import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { Color, globalStyles } from '../GlobalStyles'
import { useSelector } from 'react-redux'

const DayItem = React.memo(({ item, selectedDay, handelPress, selectedGroup }) => {
    const { language } = useSelector(state => state.languageState)
    let isSelected = selectedDay === item.fullName
    let isInMyGroup = selectedGroup?.days.map(x => x.day)?.includes(item.fullName)
    let sameHour = selectedGroup?.days.every((day) => day.time === selectedGroup.days[0].time)


    return (
        <TouchableWithoutFeedback onPress={() => handelPress(item.fullName)} >
            <View style={[globalStyles.dayCard, { backgroundColor: isSelected ? Color.darkcyan : isInMyGroup ? sameHour ? Color.darkcyan : Color.cyanBackGround : Color.white }]}>
                <Text numberOfLines={1} lineBreakMode="tail"
                    style={[globalStyles.contentText, { color: isSelected ? Color.white : isInMyGroup && sameHour ? Color.white : Color.black }]} >
                    {item.day[language]}
                </Text>
            </View>
        </TouchableWithoutFeedback >
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default DayItem;
