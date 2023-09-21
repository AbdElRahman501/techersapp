import React, { useRef, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Color, globalStyles, widthPercentage } from '../GlobalStyles'
import Svg, { Line } from 'react-native-svg';
import EventItem from '../components/EventItem'
import { useSelector } from 'react-redux';
import { getStartedEvents, transformTime } from '../actions/GlobalFunctions';
import { useState } from 'react';

export default function TimeLine({ today, eventsDuration, events, selectedDay }) {
    const { language } = useSelector(state => state.languageState)
    const scrollViewRef = useRef(null);
    const { dayStart, dayEnd } = { dayStart: 6, dayEnd: 20 }
    const hours = Array.from({ length: dayEnd - dayStart }, (_, i) => i + dayStart);
    let hourState = new Date().getHours()
    hourState = hourState < dayEnd && hourState > dayStart
    const [currentHour, setCurrentHour] = useState(new Date().getHours() > dayEnd ? dayEnd : new Date().getHours() < dayStart ? 0 : new Date().getHours() - dayStart)
    const [currentMinute, setCurrentMinute] = useState(hourState ? new Date().getMinutes() : 0)

    let isToday = today?.id === selectedDay?.id
    let theFilterEvents = getStartedEvents(events, eventsDuration, selectedDay)
    const theHour = theFilterEvents.length > 0 ? Math.min(...theFilterEvents.map(x => x.eventTime.split(":")[0])) - dayStart : 0

    useEffect(() => {
        scrollViewRef.current.scrollTo({
            y: isToday ? (currentHour) * 100 : theHour * 100,
            animated: "smooth"
        });
    }, [events])

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

    return (
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false} >
            <View style={[globalStyles.container, { paddingVertical: 15 }]}>
                <Svg height={hours.length * 100} width={widthPercentage(100)} >
                    {hours.map((hour, i) => (
                        <View key={i}>
                            <Line
                                x1={language === 'ar' ? 20 : 80}
                                y1={i * 100}
                                x2={language === 'ar' ? widthPercentage(100) - 80 : widthPercentage(100) - 20}
                                y2={i * 100}
                                stroke="black"
                                opacity={0.1}
                                strokeWidth="2"
                            />
                            {i < dayEnd - dayStart - 1 && (
                                <Line
                                    x1={50}
                                    y1={(i + 0.5) * 100}
                                    x2={widthPercentage(100) - 50}
                                    y2={(i + 0.5) * 100}
                                    stroke="black"
                                    opacity={0.1}
                                    strokeWidth="1"
                                />
                            )}
                            <Text style={[globalStyles.regular, language === 'ar' ? styles.right : styles.left, { color: "black", opacity: 0.3, position: 'absolute', top: (i * 100) - 12 }]} >
                                {transformTime(hour, language)}
                            </Text>
                        </View>
                    ))}
                    {isToday &&
                        <Line
                            x1={(currentMinute > 10 && currentMinute < 50) ? 20 : language === 'ar' ? 20 : 80}
                            y1={(currentHour * 100) + ((currentMinute / 60) * 100)}
                            x2={(currentMinute > 10 && currentMinute < 50) ? widthPercentage(100) - 20 : language === 'ar' ? widthPercentage(100) - 80 : widthPercentage(100) - 20}
                            y2={(currentHour * 100) + ((currentMinute / 60) * 100)}
                            stroke={Color.darkcyan}
                            strokeWidth="2"
                        />
                    }
                    {theFilterEvents.map((event, index) => <EventItem isToday={isToday} dayStart={dayStart} dayEnd={dayEnd} currentHour={currentHour} currentMinute={currentMinute} key={index} event={event} />)}
                </Svg>
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