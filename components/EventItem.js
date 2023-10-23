import React from 'react'
import { Text, View } from 'react-native'
import { Border, Color, globalStyles, widthPercentage } from '../GlobalStyles';
import { teachers } from '../data';
import { useSelector } from 'react-redux';
import CustomText from './CustemText';
import { calculateEndTime, transformTime } from '../actions/GlobalFunctions';
import CustomImage from './CustomImage ';

export default function EventItem({ dayStart, isPassed, dayEnd, isToday, event: { eventTime, subject, duration, color, teacherId } }) {
    const { language } = useSelector(state => state.languageState)
    const teacher = teachers.find(x => x.id === teacherId)
    const [hour, minute] = eventTime.split(":")
    const currentHour = new Date().getHours()
    const currentMinute = new Date().getMinutes()
    const theEventTime = Number(hour) + (Number(minute) / 60)
    const theDuration = duration / 60
    let theTimeFill = Math.max(((currentHour * 100) + ((currentMinute / 60) * 100)) - ((theEventTime * 100) + 1), 0)
    theTimeFill = Math.min(theTimeFill, theDuration * 99)


    return (
        <View style={[globalStyles.eventCard, language === 'ar' ? { right: 100 } : { left: 100 }, {
            borderTopLeftRadius: language === 'ar' ? Border.br_13xl : 0,
            borderTopRightRadius: language === 'en' ? Border.br_13xl : 0,
            top: ((theEventTime - dayStart) * 100) + 15,
            height: theDuration * 99,
            overflow: "hidden",
            backgroundColor: isPassed ? Color.lightCyan : Color.white
        }]} >
            {isToday && <View style={{ position: "absolute", top: 0, left: 0, backgroundColor: Color.lightCyan, height: theTimeFill, width: widthPercentage(100) - 100 }} />}
            <View style={[{ flexDirection: language === 'ar' ? 'row-reverse' : 'row', justifyContent: 'space-between', paddingHorizontal: 20 }]}>
                <Text style={[globalStyles.title, { color: color || Color.darkcyan }]}> {subject ? subject[language] : ""} </Text>
                <View style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row', gap: 10 }} >
                    <Text style={[globalStyles.contentText]}>{transformTime(eventTime, language)}</Text>
                    <Text style={[globalStyles.contentText]}>{transformTime(calculateEndTime(eventTime, duration), language)}</Text>
                </View>
            </View>
            <View style={[globalStyles.container, { flexDirection: language === 'ar' ? 'row-reverse' : 'row', paddingHorizontal: 20 }]}>
                <CustomImage
                    style={{ width: 24, height: 24, borderRadius: 12, margin: 5 }}
                    resizeMode="contain"
                    source={teacher.imageSource}
                />
                <CustomText style={[globalStyles.smallText, { padding: 10 }]}>
                    يحين موعد درس اللغة العربية عند الاستاذ {teacher.name} في الساعه {eventTime} في العنوان 3 شارع ابراج المصنع الحربي
                </CustomText>
            </View>
        </View>
    )
}
