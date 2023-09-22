import { ScrollView, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { globalStyles, widthPercentage } from '../GlobalStyles'
import { useSelector } from 'react-redux';
import ScheduleDayOption from './ScheduleDayIOption';

export default function WeekView({ weeks, eventsDuration, selectedMonth, selectedDay, dayHandelPress, today }) {
    const { language } = useSelector(state => state.languageState)
    let initialScrolledIndex = weeks.findIndex(week => week.find(item => item.id === selectedDay.id));
    const scrollViewRef = useRef(null);
    useEffect(() => {
        if (initialScrolledIndex >= 0) {
            scrollViewRef.current.scrollTo({
                x: (widthPercentage(100) - 20) * initialScrolledIndex,
                animated: false,
            });
        } else {
            scrollViewRef.current.scrollTo({
                x: (widthPercentage(100) - 20) * weeks.length - 1,
                animated: false,
            });
        }
    }, [weeks])


    return (
        <ScrollView
            style={[language === 'ar' && { transform: [{ scaleX: -1 }] }]}
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={(widthPercentage(100) - 20)}
            pagingEnabled={true}
            disableIntervalMomentum={true}
        >
            {weeks.map((week, index) =>
                <View key={index} style={[globalStyles.container, language === 'ar' && { transform: [{ scaleX: -1 }] }, { flexDirection: language === 'en' ? 'row' : 'row-reverse' }]}>
                    {week.map((item, index) => <ScheduleDayOption eventsDuration={eventsDuration} item={item} selectedMonth={selectedMonth} key={index} SelectedId={selectedDay} handelPress={dayHandelPress} today={today} />)}
                </View>
            )}
        </ScrollView>
    )
}
