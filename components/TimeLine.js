import React, { useRef, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Color, globalStyles, widthPercentage } from '../GlobalStyles'
import Svg, { Line } from 'react-native-svg';
import EventItem from '../components/EventItem'
import { useSelector } from 'react-redux';
import { getStartedEvents, transformTime } from '../actions/GlobalFunctions';
import { useState } from 'react';
import t from '../actions/changeLanguage';

export default function TimeLine({ today, eventsDuration, events, selectedDay }) {
    const { language } = useSelector(state => state.languageState)
    const scrollViewRef = useRef(null);
    const { dayStart, dayEnd } = { dayStart: 6, dayEnd: 20 }
    const hours = Array.from({ length: dayEnd - dayStart }, (_, i) => i + dayStart);
    let hourState = new Date().getHours()
    hourState = (hourState) + ((new Date().getMinutes() / 60))
    hourState = hourState < dayEnd && hourState > dayStart
    const [currentHour, setCurrentHour] = useState(new Date().getHours() > dayEnd ? dayEnd : new Date().getHours() < dayStart ? 0 : new Date().getHours() - dayStart)
    const [currentMinute, setCurrentMinute] = useState(hourState ? new Date().getMinutes() : 0)

    let isToday = today?.id === selectedDay?.id
    let isPassed = new Date(today?.id) > new Date(selectedDay?.id)

    let theFilterEvents = getStartedEvents(events, eventsDuration, selectedDay)
    const theHour = theFilterEvents.length > 0 ? Math.min(...theFilterEvents.map(x => x.eventTime.split(":")[0])) - dayStart : 0

    useEffect(() => {
        scrollViewRef.current.scrollTo({
            y: isToday ? (currentHour) * 100 : theHour * 100,
            animated: "smooth"
        });
    }, [events , scrollViewRef?.current])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentMinute((prevMinute) => {
                if (prevMinute < 60) {
                    return prevMinute + (5 / 60)
                } else {
                    setCurrentHour((prevHour) => prevHour + 1);
                    return 0
                }
            });
        }, 5000);
        if (!hourState) {
            clearInterval(intervalId);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const [now, dayStartedTime] = [t("now"), t("day_started", { time: transformTime(dayStart, language) })]
    return (
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false} >
            <View style={[globalStyles.container, { paddingVertical: 15 }]}>
                <Svg height={hours.length * 100} width={widthPercentage(100)} >
                    {hours.map((hour, i) => (
                        <View key={i} >
                            <Line
                                x1={20}
                                y1={i * 100}
                                x2={widthPercentage(100) - 20}
                                y2={i * 100}
                                stroke="black"
                                opacity={0.1}
                                strokeWidth="2"
                            />
                            <Line
                                x1={50}
                                y1={(i + 0.5) * 100}
                                x2={widthPercentage(100) - 50}
                                y2={(i + 0.5) * 100}
                                stroke="black"
                                opacity={0.1}
                                strokeWidth="1"
                            />
                        </View>

                    ))}
                    {isToday &&
                        <>
                            <Line
                                x1={20}
                                y1={(currentHour * 100) + ((currentMinute / 60) * 100)}
                                x2={widthPercentage(100) - 20}
                                y2={(currentHour * 100) + ((currentMinute / 60) * 100)}
                                stroke={Color.darkcyan}
                                strokeWidth="2"
                            />
                            <View style={[language === 'ar' ? { left: 20 } : { right: 20 },
                            { backgroundColor: Color.darkcyan, position: 'absolute', borderRadius: 10, padding: 4, paddingHorizontal: 10, top: (currentHour * 100) + ((currentMinute / 60) * 100) - 12 }]}>
                                <Text style={[globalStyles.smallText, { color: Color.white, }]}  >
                                    {hourState ? now : dayStartedTime}
                                </Text>
                            </View>
                        </>
                    }

                </Svg>
                {hours.map((hour, i) => (
                    <Text key={i} style={[globalStyles.regular, language === 'ar' ? styles.right : styles.left, { backgroundColor: Color.cyanBackGround, padding: 5, color: Color.darkgray, position: 'absolute', top: (i * 100) - 2 }]} >
                        {transformTime(hour, language)}
                    </Text>
                ))}
                {theFilterEvents.map((event, index) => <EventItem isToday={isToday} isPassed={isPassed} dayStart={dayStart} dayEnd={dayEnd} key={index} event={event} />)}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    left: {
        left: 20,
    },
    right: {
        right: 20,
    },
})