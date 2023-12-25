import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Border, Color, globalStyles, widthPercentage } from '../GlobalStyles';
import { useSelector } from 'react-redux';
import CustomText from './CustemText';
import { calculateEndTime, getSubject, getTitle, isArabic, openMaps, transformTime } from '../actions/GlobalFunctions';
import CustomImage from './CustomImage ';
import { Feather } from '@expo/vector-icons';

export default function EventItem({ dayStart, isPassed, dayEnd, isToday, event: { timeIn24Format, subject, duration, color, teacherId } }) {
    const { language } = useSelector(state => state.languageState)
    const { subjects } = useSelector(state => state.subjectsState)
    const { myTeachers: teachers } = useSelector(state => state.myTeachersState);
    const teacher = teachers.length > 0 && teachers.find(x => x.id === teacherId)
    const [hour, minute] = timeIn24Format.split(":")
    const currentHour = new Date().getHours()
    const currentMinute = new Date().getMinutes()
    const theEventTime = Number(hour) + (Number(minute) / 60)
    const theDuration = duration / 60
    const height = (theDuration * 100) - 6
    let theTimeFill = Math.max(((currentHour * 100) + ((currentMinute / 60) * 100)) - ((theEventTime * 100) + 1), 0)
    theTimeFill = Math.min(theTimeFill, height)
    subject = getSubject(subjects, subject)


    return (
        <View style={[globalStyles.eventCard, language === 'ar' ? { right: 80 } : { left: 80 }, {
            top: ((theEventTime - dayStart) * 100) + 3,
            height,
            overflow: "hidden",
            backgroundColor: Color.white
        }]} >
            <View style={[language === 'ar' ? { right: 0 } : { left: 0 }, { position: "absolute", top: 0, backgroundColor: color, height: height, width: 10 }]} />
            {/* {isToday && <View style={{ position: "absolute", top: 2, right: 2, backgroundColor: Color.white, height: height-40, width: 6, borderRadius: 20 }} />} */}
            <View style={[{ flexDirection: language === 'ar' ? 'row-reverse' : 'row', justifyContent: 'space-between', paddingHorizontal: 20 }]}>
                <Text style={[globalStyles.title, { color: Color.black }]}> {subject?.[language] || ""} </Text>
                <View style={{ flexDirection: language === 'ar' ? 'row-reverse' : 'row', gap: 5 }} >
                    <Text style={[globalStyles.contentText]}>{transformTime(timeIn24Format, language)}</Text>
                    <Text style={[globalStyles.contentText]}>-</Text>
                    <Text style={[globalStyles.contentText]}>{transformTime(calculateEndTime(timeIn24Format, duration), language)}</Text>
                </View>
            </View>
            <View style={{ marginHorizontal: 20, marginTop: 10, gap: 5 }} >
                <View style={[{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: language === 'ar' ? 'row-reverse' : 'row', gap: 5 }]}>
                    <CustomImage
                        style={{ width: 24, height: 24, borderRadius: 12 }}
                        resizeMode="contain"
                        source={teacher?.imageSource}
                    />
                    <CustomText style={[globalStyles.contentText]}>
                        {getTitle(teacher?.gender, teacher?.name)}
                    </CustomText>
                </View>
                <View style={[{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: language === 'ar' ? 'row-reverse' : 'row', gap: 5 }]}>
                    <Feather style={{ width: 24, textAlign: 'center' }} name="map-pin" size={15} color={Color.darkcyan} />
                    <TouchableOpacity onPress={() => openMaps(teacher?.address?.lat, teacher?.address?.lon, teacher?.address?.country)} >
                        <CustomText numberOfLines={1} lineBreakMode="tail" style={[globalStyles.smallText, { color: Color.darkcyan }]}>
                            {teacher?.address?.display_name}
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
