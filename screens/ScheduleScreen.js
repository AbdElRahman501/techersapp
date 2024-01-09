import React, { useState } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { Border, Color, Padding, globalStyles } from '../GlobalStyles'
import TimeLine from '../components/TimeLine'
import MonthSelection from '../components/MonthSelection'
import WeekView from '../components/WeekView'
import { getEvents, getOldestDate, getTheMonths, getWeeksOfMonth } from '../actions/GlobalFunctions'
import { useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics';
import t from '../actions/changeLanguage'
import TapBottomNavigator from '../components/TapBottomNavigator'

export default function ScheduleScreen() {
    const { myTeachers } = useSelector(state => state.myTeachersState);
    const { myGroups } = useSelector(state => state.myGroupsState);
    const startDate = getOldestDate(myGroups)
    const { today, months, currentMonth } = getTheMonths(startDate)
    const [weeks, setWeeks] = useState(getWeeksOfMonth(currentMonth.id))
    const [selectedDay, setSelectedDay] = useState(today)
    const [selectedMonth, setSelectedMonth] = useState(currentMonth)

    let theEvents = getEvents(myGroups, today.fullName)
    let theEventsDuration = myTeachers?.length > 0 ? myTeachers.map(item => ({ teacherID: item.id, studyingYear: item.studyingYear, midYearHoliday: item.midYearHoliday })) : []

    const [events, setEvents] = useState(theEvents || []);
    const [eventsDuration, setEventsDuration] = useState(theEventsDuration || [])

    const dayHandelPress = (day) => {
        setSelectedDay(day)
        setEvents(getEvents(myGroups, day.fullName))
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }
    const monthSelectHandler = (month) => {
        setSelectedMonth(month)
        setWeeks(getWeeksOfMonth(month.id))
        setSelectedDay(today)
    }

    const reset = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSelectedDay(today);
        setEvents(getEvents(myGroups, today.fullName))
        setSelectedMonth(currentMonth);
        setWeeks(getWeeksOfMonth(currentMonth.id))
    }

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: Color.white, paddingTop: Padding.p_m }]} >
            <MonthSelection selectedMonth={selectedMonth} months={months} currentMonth={currentMonth} setMonth={monthSelectHandler} />
            <View style={[globalStyles.container, { maxHeight: 120, width: '100%', backgroundColor: Color.cyanBackGround, borderTopLeftRadius: Border.br_3xl }]}>
                <View style={[globalStyles.container, { overflow: 'hidden', transform: [{ translateX: 10 }], width: '100%', borderBottomLeftRadius: Border.br_26xl, backgroundColor: Color.white }]}>
                    <View style={[globalStyles.container, { transform: [{ translateX: -10 }], padding: 10 }]}>
                        <WeekView eventsDuration={eventsDuration} weeks={weeks} selectedMonth={selectedMonth} selectedDay={selectedDay} dayHandelPress={dayHandelPress} today={today} />
                    </View>
                </View>
            </View>
            <View style={[globalStyles.container, { width: '100%', backgroundColor: Color.white }]}>
                <View style={[globalStyles.container, { width: '100%', borderTopRightRadius: Border.br_26xl, backgroundColor: Color.cyanBackGround }]}>
                    <TouchableOpacity style={[globalStyles.container, { position: 'absolute', right: 27, top: 27, width: 50, height: 50, borderRadius: 25, backgroundColor: Color.white }]}
                        onPress={reset} >
                        <Text style={[globalStyles.title, { color: Color.cyanBackGround }]} >O</Text>
                    </TouchableOpacity>
                    <Text style={[globalStyles.title, { margin: 27, padding: 5 }]} >{t("up coming events")}</Text>
                    <TimeLine today={today} selectedDay={selectedDay} eventsDuration={eventsDuration} events={events} />
                </View>
            </View>
            <TapBottomNavigator currentScreen={"Schedule"} />
        </SafeAreaView>
    )
}


