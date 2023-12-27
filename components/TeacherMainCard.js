import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontFamily, FontSize, Padding, globalStyles, widthPercentage } from '../GlobalStyles'
import CustomImage from './CustomImage '
import CustomText from './CustemText'
import { Heart_Icon_Fill, Heart_Stroke } from '../assets/icons/Icons';
import { useSelector } from 'react-redux'
import { formatDistance, checkArrayForUserId, getTitle, removeDuplicatesById, getSubject, transformTime, getDay, convertMinutesToHours } from '../actions/GlobalFunctions'
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';
import t from '../actions/changeLanguage'

export default function TeacherMainCard({ likes, item, userID, group, selectedSubject, changeSubjectHandler, pressHandler, index }) {
    const { language } = useSelector(state => state.languageState)
    const [liked, setLiked] = useState({ state: false, number: likes?.length || 0 })
    const { subjects } = useSelector(state => state.subjectsState)
    const [duration] = [t('duration')]
    let teacherSubjects = removeDuplicatesById(item?.groups?.map(x => {
        return getSubject(subjects, x?.subject)
    }))
    teacherSubjects = teacherSubjects.length > 0 ? teacherSubjects : item?.subjects?.map(subject => {
        return subject?.en ? subject : getSubject(subjects, subject)
    })
    useEffect(() => {
        if (checkArrayForUserId(likes, userID) && !liked.state) {
            setLiked(pv => ({ ...pv, state: true }))
        }
    }, [])

    return (
        <Animated.View entering={index >= 0 ? FadeInDown.duration(400 + (index * 200)).easing(Easing.ease) : false} style={[styles.item, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
            <View style={[styles.content, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
                {group?.days?.length ?
                    <View style={styles.info}>
                        <CustomText style={[globalStyles.title]} numberOfLines={1} lineBreakMode="tail" >{getTitle(item?.gender, item?.name)}</CustomText>
                        <View style={{ alignSelf: "center" }}>
                            {group.days.map((x, i) =>
                                <View key={i} style={{ justifyContent: "space-between", flexDirection: language === 'en' ? 'row' : 'row-reverse', alignItems: "center", gap: 15 }}>
                                    <Text style={[globalStyles.regular, { width: 80, color: Color.darkgray }]}>{getDay(x.day, language)}</Text>
                                    <Text style={[globalStyles.regular, { color: Color.darkgray }]}>:</Text>
                                    <Text style={[globalStyles.regular, { width: 80, color: Color.darkgray }]}>{transformTime(x.timeIn24Format, language)}</Text>
                                </View>
                            )}
                            <View style={{ justifyContent: "space-between", flexDirection: language === 'en' ? 'row' : 'row-reverse', alignItems: "center", gap: 15 }}>
                                <Text style={[globalStyles.regular, { width: 80, color: Color.darkgray }]}>{duration}</Text>
                                <Text style={[globalStyles.regular, { color: Color.darkgray }]}>:</Text>
                                <Text style={[globalStyles.regular, { width: 80, color: Color.darkgray }]}>{convertMinutesToHours(group.days[0].duration, language)} </Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={styles.info}>
                        <CustomText style={[styles.title]} numberOfLines={2} lineBreakMode="tail" >{getTitle(item?.gender, item?.name)}</CustomText>
                        <View style={{ gap: 10, justifyContent: "flex-start", flexDirection: language === 'ar' ? 'row-reverse' : 'row', alignItems: "center" }}>
                            {teacherSubjects?.map((subject, i) => <TouchableOpacity key={i} onPress={() => changeSubjectHandler && changeSubjectHandler(subject.en)} disabled={!selectedSubject} >
                                <CustomText style={[styles.regular, {
                                    color: (selectedSubject && subject.en === selectedSubject) ? Color.darkcyan : Color.darkgray
                                }]}>
                                    {subject[language]}
                                </CustomText>
                            </TouchableOpacity>
                            )}
                        </View>
                        <View style={{ justifyContent: "space-between", flexDirection: language === 'en' ? 'row-reverse' : 'row', alignItems: "center" }}>
                            <TouchableOpacity style={[styles.likes, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]} onPress={() => setLiked({ state: !liked.state, number: liked.state ? liked.number - 1 : liked.number + 1 })}>
                                {liked.state ?
                                    <Heart_Icon_Fill
                                        width={15} height={15}
                                        viewBox="0 0 22 19" />
                                    :
                                    <Heart_Stroke width={15} height={15}
                                        viewBox="0 0 22 19" />
                                }
                                <CustomText style={[styles.regular, { color: liked.state ? Color.darkcyan : Color.darkgray }]}>
                                    {liked.number}
                                </CustomText>
                            </TouchableOpacity>
                            <CustomText style={styles.regular}>{formatDistance(item?.distance, language)}</CustomText>
                        </View>
                    </View>
                }
            </View>
            <TouchableOpacity onPress={() => pressHandler && pressHandler(item)} disabled={!pressHandler} >
                <CustomImage
                    style={styles.image}
                    resizeMode="cover"
                    source={item?.imageSource}
                />
            </TouchableOpacity>
        </Animated.View >
    )
}
const styles = StyleSheet.create({

    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
    },
    regular: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_base,
        color: Color.darkgray
    },
    item: {
        paddingHorizontal: 20,
        width: widthPercentage(100),
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
    },

    content: {
        flex: 1,
        height: 120,
        backgroundColor: Color.cyanBackGround,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 25,
        padding: Padding.p_base,

    },
    info: {
        height: 120,
        width: "100%",
        justifyContent: "space-evenly",
    },
    image: {
        backgroundColor: Color.cyanBackGround,
        height: 120,
        width: 120,
        borderRadius: 25,

    }, likes: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 35
    },
})