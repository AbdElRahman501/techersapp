import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Border, Color, Padding, globalStyles, widthPercentage } from '../GlobalStyles'
import MonthSelection from '../components/MonthSelection'
import SlideContainer from '../components/SlideContainer'
import ScheduleDayOption from '../components/ScheduleDayIOption'
import TimeLine from '../components/TimeLine'
import { getTheMonths, getWeeksOfMonth } from '../actions/GlobalFunctions'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import WeekView from '../components/WeekView'

export default function ScheduleScreen() {
    const { today, months, currentMonth } = getTheMonths()
    const [weeks, setWeeks] = useState(getWeeksOfMonth(currentMonth.id))
    const [selectedDay, setSelectedDay] = useState(today)
    const [selectedMonth, setSelectedMonth] = useState(currentMonth)
    const dayHandelPress = (day) => {
        setSelectedDay(day)
    }
    const events = [
        {
            eventTime: 6,
            duration: 1,
        },
        {
            eventTime: 9,
            duration: 1,
        },
        {
            eventTime: 15,
            duration: 1,
        },
    ]

    useEffect(() => {
        setWeeks(getWeeksOfMonth(selectedMonth.id))
        setSelectedDay(today)
    }, [selectedMonth])
    return (
        <View style={[globalStyles.body, { backgroundColor: Color.white }]} >
            <MonthSelection months={months} currentMonth={currentMonth} setMonth={setSelectedMonth} />
            <View style={[globalStyles.container, { maxHeight: 120, width: '100%', backgroundColor: Color.cyanBackGround, borderTopLeftRadius: Border.br_3xl }]}>
                <View style={[globalStyles.container, { overflow: 'hidden', transform: [{ translateX: 10 }], width: '100%', borderBottomLeftRadius: Border.br_26xl, backgroundColor: Color.white }]}>
                    <View style={[globalStyles.container, {
                        transform: [{ translateX: -10 }], padding: 10
                    }]}>
                        <WeekView weeks={weeks} selectedMonth={selectedMonth} selectedDay={selectedDay} dayHandelPress={dayHandelPress} today={today} />
                    </View>
                </View>
            </View>
            <View style={[globalStyles.container, { width: '100%', backgroundColor: Color.white }]}>
                <View style={[globalStyles.container, { width: '100%', borderTopRightRadius: Border.br_26xl, backgroundColor: Color.cyanBackGround }]}>
                    <Text style={[globalStyles.title, { padding: 15 }]} >Next Schedules</Text>
                    <TimeLine events={events} />
                </View>
            </View>
        </View>
    )
}


