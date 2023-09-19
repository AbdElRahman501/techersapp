import React from 'react'
import { Text, View, Image } from 'react-native'
import { Border, Color, globalStyles } from '../GlobalStyles';
import { teachers } from '../data';
import { useSelector } from 'react-redux';
import CustomText from './CustemText';

export default function EventItem({ event: { eventTime, duration, color } }) {
    const { language } = useSelector(state => state.languageState)
    const teacher = teachers[0]
    const [hour, minute] = eventTime.split(":")
    const theEventTime = Number(hour) + (Number(minute) / 60)
    const theDuration = duration / 60

    return (
        <View style={[globalStyles.eventCard, language === 'ar' ? { right: 80 } : { left: 80 }, {
            borderTopLeftRadius: language === 'ar' ? Border.br_13xl : 0,
            borderTopRightRadius: language === 'en' ? Border.br_13xl : 0,
            top: (theEventTime * 100) + 1,
            height: theDuration * 99
        }]} >
            <Text style={[globalStyles.title, { color: color || Color.darkcyan }]}> درس اللغة العربية </Text>
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
