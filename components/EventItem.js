import React from 'react'
import { Text, View, Image } from 'react-native'
import { Border, Color, globalStyles, widthPercentage } from '../GlobalStyles';
import { teachers } from '../data';
import { useSelector } from 'react-redux';
import CustomText from './CustemText';

export default function EventItem({ currentHour, isToday, currentMinute, event: { eventTime, subject, duration, color, teacherId } }) {
    const { language } = useSelector(state => state.languageState)
    const teacher = teachers.find(x => x.id === teacherId)
    const [hour, minute] = eventTime.split(":")
    const theEventTime = Number(hour) + (Number(minute) / 60)
    const theDuration = duration / 60
    let theTimeFill = ((currentHour * 100) + ((currentMinute / 60) * 100)) - ((theEventTime * 100) + 1)
    theTimeFill = isToday ? theTimeFill > 0 ? theTimeFill < theDuration * 99 ? theTimeFill : theDuration * 99 : 0 : 0
    return (
        <View style={[globalStyles.eventCard, language === 'ar' ? { right: 80 } : { left: 80 }, {
            borderTopLeftRadius: language === 'ar' ? Border.br_13xl : 0,
            borderTopRightRadius: language === 'en' ? Border.br_13xl : 0,
            top: (theEventTime * 100) + 1,
            height: theDuration * 99,
            overflow: "hidden"
        }]} >
            <View style={{ position: "absolute", top: 0, left: 0, backgroundColor: Color.darkcyan, opacity: 0.4, height: theTimeFill, width: widthPercentage(100) - 100 }} >
            </View>
            <Text style={[globalStyles.title, { color: color || Color.darkcyan }]}> {subject[language]} </Text>
            <View style={[globalStyles.container, { flexDirection: language === 'ar' ? 'row-reverse' : 'row', paddingHorizontal: 10 }]}>
                <Image
                    style={{ width: 24, height: 24, borderRadius: 12, margin: 5 }}
                    source={teacher.imageSource}
                    resizeMode="contain"
                />
                <CustomText style={[globalStyles.smallText, { padding: 10 }]}>
                    يحين موعد درس اللغة العربية عند الاستاذ {teacher.name} في الساعه {eventTime} في العنوان 3 شارع ابراج المصنع الحربي
                </CustomText>
            </View>
        </View>
    )
}
