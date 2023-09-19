import React, { useState, useEffect } from 'react'
import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import { Border, Color, globalStyles } from '../GlobalStyles'
import TimeLine from '../components/TimeLine'
import MonthSelection from '../components/MonthSelection'
import WeekView from '../components/WeekView'
import { getEvents, getTheMonths, getWeeksOfMonth } from '../actions/GlobalFunctions'
import { useSelector } from 'react-redux'

export default function ScheduleScreen() {
    const { loading, userInfo, error } = useSelector(state => state.userInfo)

    const { today, months, currentMonth } = getTheMonths()
    const [weeks, setWeeks] = useState(getWeeksOfMonth(currentMonth.id))
    const [selectedDay, setSelectedDay] = useState(today)
    const [selectedMonth, setSelectedMonth] = useState(currentMonth)
    const dayHandelPress = (day) => {
        setSelectedDay(day)
    }
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (userInfo) {
            let theEvents = getEvents(userInfo.myTeachers, selectedDay.fullName)
            if (theEvents.length > 0) {
                setEvents(theEvents)
            } else {
                setEvents([])
            }
        }
    }, [userInfo, selectedDay])

    

    useEffect(() => {
        setWeeks(getWeeksOfMonth(selectedMonth.id))
        setSelectedDay(today)
    }, [selectedMonth])
    return (
        <View style={[globalStyles.body, { backgroundColor: Color.white }]} >
            <MonthSelection selectedMonth={selectedMonth} months={months} currentMonth={currentMonth} setMonth={setSelectedMonth} />
            <View style={[globalStyles.container, { maxHeight: 120, width: '100%', backgroundColor: Color.cyanBackGround, borderTopLeftRadius: Border.br_3xl }]}>
                <View style={[globalStyles.container, { overflow: 'hidden', transform: [{ translateX: 10 }], width: '100%', borderBottomLeftRadius: Border.br_26xl, backgroundColor: Color.white }]}>
                    <View style={[globalStyles.container, { transform: [{ translateX: -10 }], padding: 10 }]}>
                        <WeekView weeks={weeks} selectedMonth={selectedMonth} selectedDay={selectedDay} dayHandelPress={dayHandelPress} today={today} />
                    </View>
                </View>
            </View>
            <View style={[globalStyles.container, { width: '100%', backgroundColor: Color.white }]}>
                <View style={[globalStyles.container, { width: '100%', borderTopRightRadius: Border.br_26xl, backgroundColor: Color.cyanBackGround }]}>
                    <TouchableOpacity style={[globalStyles.container, { position: 'absolute', right: 27, top: 27, width: 50, height: 50, borderRadius: 25, backgroundColor: Color.white }]} onPress={() => setSelectedMonth(currentMonth)} >
                        <Text style={[globalStyles.title]} >O</Text>
                    </TouchableOpacity>
                    <Text style={[globalStyles.title, { margin: 27, padding: 5 }]} >Next Schedules</Text>
                    <TimeLine events={events} />
                </View>
            </View>
        </View>
    )
}


