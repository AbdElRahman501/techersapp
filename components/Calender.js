import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Border, Color, globalStyles, widthPercentage } from '../GlobalStyles';
import MonthSelection from '../components/MonthSelection';
import { getTheMonths, getWeeksOfMonth } from '../actions/GlobalFunctions';

export default function Calender({ selectedDay, setSelectedDay, selectedMonth, setSelectedMonth }) {
    const { today, months, currentMonth } = getTheMonths()

    const [weeks, setWeeks] = useState(getWeeksOfMonth(currentMonth.id))

    useEffect(() => {
        setWeeks(getWeeksOfMonth(selectedMonth.id))
    }, [selectedMonth])

    const dayHandelPress = (day) => {
        setSelectedDay(day)
    }

    return (
        <View style={[globalStyles.shadowBox, { backgroundColor: Color.white, marginHorizontal: 20, marginTop: 10, borderRadius: Border.br_6xl }]} >
            <MonthSelection selectedMonth={selectedMonth} months={months} currentMonth={currentMonth} setMonth={setSelectedMonth} />
            <View style={{ gap: 10, marginVertical: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
                    {weeks[0].map((day, index) => <View key={index} style={{ width: ((widthPercentage(100) - 40) / 7) - 5 }}>
                        <Text style={[globalStyles.regular, { color: Color.darkgray, textAlign: "center" }]} >
                            {day.fullName.charAt(0).toUpperCase()}
                        </Text>
                    </View>)}
                </View>
                <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                    {weeks.map((week, index) =>
                        <View key={index} style={{ flexDirection: "row", justifyContent: "center", gap: 5 }}>
                            {week.map((day, index) => {
                                let isThisMonth = Number(day?.id.split("-")[1]) === Number(selectedMonth?.id) + 1
                                const target = day?.id === selectedDay?.id
                                const isToday = today?.id === day?.id
                                return <TouchableOpacity onPress={() => dayHandelPress(day)} disabled={!isThisMonth} key={index} style={{ width: ((widthPercentage(100) - 40) / 7) - 5, alignItems: "center" }}>
                                    <Text style={[globalStyles.regular, { borderRadius: 10, color: Color.black, textAlign: "center", textAlignVertical: "center", width: 24, height: 24, textAlign: "center", color: target ? Color.white : isThisMonth ? Color.black : Color.lightGray, borderWidth: isToday ? 1 : 0, borderColor: isToday ? Color.darkcyan : "transparent", backgroundColor: target ? Color.darkcyan : Color.white }]} >
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
