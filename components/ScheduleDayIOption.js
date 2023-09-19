import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, fontEm, globalStyles, widthPercentage } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { getEvents } from '../actions/GlobalFunctions'

const ScheduleDayOption = ({ item, selectedMonth, SelectedId, today, handelPress }) => {
    const { loading, userInfo, error } = useSelector(state => state.userInfo)
    const events = getEvents(userInfo?.myTeachers, item.fullName)

    let isToday = today?.id === item?.id
    let isThisMonth = Number(item?.id.split("-")[1]) === Number(selectedMonth?.id) + 1

    const { language } = useSelector(state => state.languageState)
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (SelectedId?.id === item?.id) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    }, [SelectedId])

    return (
        <TouchableOpacity onPress={() => handelPress(item)} disabled={!isThisMonth} style={{ opacity: isThisMonth ? 1 : 0.2 }} >
            <View style={[globalStyles.dayCard, { width: ((widthPercentage(100) - 20) / 7) - 10, borderWidth: 0, backgroundColor: trigger ? Color.darkcyan : Color.white }]}>
                <Text numberOfLines={1} lineBreakMode="tail"
                    style={[globalStyles.contentText, { fontSize: fontEm(0.7), color: trigger ? Color.white : isToday ? Color.darkcyan : Color.darkgray }]} >
                    {item.day[language]}
                </Text>
                <Text style={[globalStyles.title, { color: trigger ? Color.white : isToday ? Color.darkcyan : Color.black }]}>
                    {item.date}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    {events.map((event, index) =>
                        <View key={index} style={[globalStyles.eventBall, { marginLeft: 1, backgroundColor: event.color ? event.color : trigger ? Color.white : Color.darkcyan }]} />
                    )}
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default ScheduleDayOption;
