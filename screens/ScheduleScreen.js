import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { Border, Color, Height, Padding, globalStyles } from '../GlobalStyles'
import TimeLine from '../components/TimeLine'
import MonthSelection from '../components/MonthSelection'
import WeekView from '../components/WeekView'
import { getEvents, getTheMonths, getWeeksOfMonth } from '../actions/GlobalFunctions'
import { useSelector } from 'react-redux'
import * as Haptics from 'expo-haptics';
import t from '../actions/changeLanguage'

export default function ScheduleScreen() {
    const { myTeachers } = useSelector(state => state.myTeachersState);
    const { myGroups } = useSelector(state => state.myGroupsState);

    const { today, months, currentMonth } = getTheMonths()
    const [weeks, setWeeks] = useState(getWeeksOfMonth(currentMonth.id))
    const [selectedDay, setSelectedDay] = useState(today)
    const [selectedMonth, setSelectedMonth] = useState(currentMonth)

    const [events, setEvents] = useState([]);
    const [eventsDuration, setEventsDuration] = useState([])

    const dayHandelPress = (day) => {
        setSelectedDay(day)
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }


    useEffect(() => {
        let theEvents = getEvents(myGroups, selectedDay.fullName)
        let theEventsDuration = myTeachers?.length > 0 ? myTeachers.map(item => ({ teacherID: item.id, studyingYear: item.studyingYear, midYearHoliday: item.midYearHoliday })) : []
        setEventsDuration(theEventsDuration)
        if (theEvents.length > 0) {
            setEvents(theEvents)
        } else {
            setEvents([])
        }
    }, [selectedDay])


    useEffect(() => {
        setWeeks(getWeeksOfMonth(selectedMonth.id))
        setSelectedDay(today)
    }, [selectedMonth])

    const reset = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setSelectedDay(today);
        setSelectedMonth(currentMonth);
    }

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: Color.white, paddingTop: Padding.p_m, marginBottom: Height.nav_tap }]} >
            <MonthSelection selectedMonth={selectedMonth} months={months} currentMonth={currentMonth} setMonth={setSelectedMonth} />
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
                        disabled={today.id === selectedDay.id}
                        onPress={reset} >
                        <Text style={[globalStyles.title, { color: Color.cyanBackGround }]} >O</Text>
                    </TouchableOpacity>
                    <Text style={[globalStyles.title, { margin: 27, padding: 5 }]} >{t("schedule")}</Text>
                    <TimeLine today={today} selectedDay={selectedDay} eventsDuration={eventsDuration} events={events} />
                </View>
            </View>
        </SafeAreaView>
    )
}


