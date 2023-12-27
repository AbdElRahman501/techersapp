import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontSize, globalStyles, widthPercentage } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { getEvents, getStartedEvents } from '../actions/GlobalFunctions'

const ScheduleDayOption = ({ item, eventsDuration, selectedMonth, SelectedId, today, handelPress }) => {
    const { myGroups } = useSelector(state => state.myGroupsState);
    const events = getEvents(myGroups, item.fullName)
    let theFilterEvents = getStartedEvents(events, eventsDuration, item)

    let isToday = today?.id === item?.id
    let isThisMonth = Number(item?.id.split("-")[1]) === Number(selectedMonth?.id) + 1

    const { language } = useSelector(state => state.languageState)
    const trigger = SelectedId?.id === item?.id

    return (
        <TouchableOpacity onPress={() => handelPress(item)} disabled={!isThisMonth || trigger} style={{ opacity: isThisMonth ? 1 : 0.2 }} >
            <View style={[globalStyles.dayCard, { width: ((widthPercentage(100) - 20) / 7) - 10, borderWidth: 0, backgroundColor: trigger ? Color.darkcyan : Color.white }]}>
                <Text numberOfLines={1} lineBreakMode="tail"
                    style={[globalStyles.contentText, { fontSize: FontSize.size_smi, color: trigger ? Color.white : isToday ? Color.darkcyan : Color.darkgray }]} >
                    {item.day[language]}
                </Text>
                <Text style={[globalStyles.title, { color: trigger ? Color.white : isToday ? Color.darkcyan : Color.black }]}>
                    {item.date}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    {theFilterEvents.map((event, index) => <View key={index} style={[globalStyles.eventBall, { marginLeft: 1, backgroundColor: event.color ? event.color : trigger ? Color.white : Color.darkcyan }]} />)}
                </View>
            </View>
        </TouchableOpacity >
    );
}

export default ScheduleDayOption;
