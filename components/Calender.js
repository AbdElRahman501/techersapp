import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Border, Color, fontEm, getStateColor, globalStyles, widthPercentage } from '../GlobalStyles';
import MonthSelection from '../components/MonthSelection';
import { getTheMonths, getWeeksOfMonth } from '../actions/GlobalFunctions';

export default function Calender({ selectedDay, setSelectedDay, selectedMonth, setSelectedMonth, events }) {
    const { today, months, currentMonth } = getTheMonths()

    const [weeks, setWeeks] = useState(getWeeksOfMonth(currentMonth.id))
    useEffect(() => {
        setWeeks(getWeeksOfMonth(selectedMonth.id))
    }, [selectedMonth])

    const dayHandelPress = (day) => {
        setSelectedDay(day)
    }

    return (
        <View style={[globalStyles.shadowBox, { backgroundColor: Color.white, marginHorizontal: 20, borderRadius: Border.br_6xl }]} >
            <MonthSelection selectedMonth={selectedMonth} months={months} currentMonth={currentMonth} setMonth={setSelectedMonth} />
            <View style={{ gap: 10, marginVertical: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
                    {weeks[0].map((day, index) => <View key={index} style={{ width: ((widthPercentage(100) - 40) / 7) - 5 }}>
                        <Text style={[globalStyles.regular, { color: Color.darkgray, textAlign: "center" }]} >
                            {day.fullName.charAt(0).toUpperCase()}
                        </Text>
                    </View>)}
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 5 }}>
                    {weeks.map((week, index) =>
                        <View key={index} style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
                            {week.map((day, index) => {
                                let isThisMonth = Number(day?.id.split("-")[1]) === Number(selectedMonth?.id) + 1
                                const target = events.find(event => (event.id === day.id) && (event.type === "attendance"))
                                const color = target && getStateColor(target.state)
                                const isToday = today?.id === day?.id
                                const focus = selectedDay ? selectedDay.id === day?.id : true
                                return <TouchableOpacity onPress={() => target && dayHandelPress(day)} disabled={!isThisMonth} key={index} style={{ width: ((widthPercentage(100) - 40) / 7) - 5, alignItems: "center" }}>
                                    <Text style={[globalStyles.regular, {
                                        borderRadius: 8, color: Color.black, textAlign: "center", textAlignVertical: "center", width: 25, height: 25, textAlign: "center",
                                        color: target ? Color.white : Color.black,
                                        borderWidth: isToday ? 1 : 0,
                                        borderColor: isToday ? Color.darkcyan : "transparent",
                                        backgroundColor: target ? color : Color.white,
                                        opacity: isThisMonth ? focus ? 1 : 0.3 : 0.3
                                    }]} >
                                        {day.date}
                                    </Text>
                                </TouchableOpacity>
                            }
                            )}
                        </View>
                    )}
                </View>
            </View>
        </View>
    )
}
