import React, { useRef, useEffect } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { Color, globalStyles, widthPercentage } from '../GlobalStyles'
import Svg, { Line } from 'react-native-svg';
import EventItem from '../components/EventItem'
import { useSelector } from 'react-redux';
import { transformTime } from '../actions/GlobalFunctions';
import { useState } from 'react';

export default function TimeLine({ events }) {
    const { language } = useSelector(state => state.languageState)
    const scrollViewRef = useRef(null);

    const hours = Array.from({ length: 24 }, (_, i) => i); // Create an array of 24 hours
    const [currentHour, setCurrentHour] = useState(new Date().getHours())
    const [currentMinute, setCurrentMinute] = useState(new Date().getMinutes())

    useEffect(() => {
        scrollViewRef.current.scrollTo({
            y: currentHour * 100,
            animated: false
        });
    }, [])

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
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <ScrollView
            ref={scrollViewRef}
            showsVerticalScrollIndicator={false} >
            <View style={[globalStyles.container, { paddingVertical: 15 }]}>
                <Svg height="2400" width={widthPercentage(100)} >
                    {hours.map((hour) => (
                        <View key={hour}>
                            <Line
                                x1={language === 'ar' ? 20 : 80}
                                y1={hour * 100}
                                x2={language === 'ar' ? widthPercentage(100) - 80 : widthPercentage(100) - 20}
                                y2={hour * 100}
                                stroke="black"
                                opacity={0.1}
                                strokeWidth="2"
                            />
                            {hour < 23 && (
                                <Line
                                    x1={50}
                                    y1={(hour + 0.5) * 100}
                                    x2={widthPercentage(100) - 50}
                                    y2={(hour + 0.5) * 100}
                                    stroke="black"
                                    opacity={0.1}
                                    strokeWidth="1"
                                />
                            )}
                            <Text style={[globalStyles.regular, language === 'ar' ? styles.right : styles.left, { color: "black", opacity: 0.3, position: 'absolute', top: (hour * 100) - 12 }]} >
                                {transformTime(hour, language)}
                            </Text>
                        </View>
                    ))}
                    <Line
                        x1={(currentMinute > 10 && currentMinute < 50) ? 20 : language === 'ar' ? 20 : 80}
                        y1={(currentHour * 100) + ((currentMinute / 60) * 100)}
                        x2={(currentMinute > 10 && currentMinute < 50) ? widthPercentage(100) - 20 : language === 'ar' ? widthPercentage(100) - 80 : widthPercentage(100) - 20}
                        y2={(currentHour * 100) + ((currentMinute / 60) * 100)}
                        stroke={Color.darkcyan}
                        strokeWidth="2"
                    />
                    {events.map((event, index) => (
                        <EventItem key={index} event={event} />
                    ))}
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