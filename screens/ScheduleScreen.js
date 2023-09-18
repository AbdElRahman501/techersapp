import React from 'react'
import { View, Text } from 'react-native'
import { Border, Color, globalStyles } from '../GlobalStyles'
import MonthSelection from '../components/MonthSelection'
import SlideContainer from '../components/SlideContainer'
import { days } from '../data'
import { useState } from 'react'
import ScheduleDayOption from '../components/ScheduleDayIOption'
import TimeLine from '../components/TimeLine'

export default function ScheduleScreen() {
    const [selectedDay, setSelectedDay] = useState("")
    const dayHandelPress = (fullName) => {
        setSelectedDay(fullName)
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

    return (
        <View style={[globalStyles.body, { backgroundColor: Color.white }]} >
            <MonthSelection />
            <View style={[globalStyles.container, { maxHeight: 120, width: '100%', backgroundColor: Color.cyanBackGround, borderTopLeftRadius: Border.br_3xl }]}>
                <View style={[globalStyles.container, { overflow: 'hidden', transform: [{ translateX: 10 }], width: '100%', borderBottomLeftRadius: Border.br_26xl, backgroundColor: Color.white }]}>
                    <View style={[globalStyles.container, { transform: [{ translateX: -10 }], padding: 20  }]}>
                        <SlideContainer data={days} SelectedId={selectedDay} handelPress={dayHandelPress}  >
                            <ScheduleDayOption />
                        </SlideContainer>
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


