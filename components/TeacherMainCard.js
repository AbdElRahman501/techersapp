import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontFamily, FontSize, Padding, widthPercentage } from '../GlobalStyles'
import CustomImage from './CustomImage '
import CustomText from './CustemText'
import { Heart_Icon_Fill, Heart_Stroke } from '../assets/icons/Icons';
import { useSelector } from 'react-redux'
import { formatDistance, checkArrayForUserId, getTitle } from '../actions/GlobalFunctions'

export default function TeacherMainCard({ item, selectedSubject, changeSubjectHandler, userInfo }) {
    const { language } = useSelector(state => state.languageState)
    const [liked, setLiked] = useState({ state: false, number: item.likes.length })
    const id = 18

    useEffect(() => {
        if (checkArrayForUserId(item.likes, id) && !liked.state) {
            setLiked(pv => ({ ...pv, state: true }))
        }
    }, [])

    return (
        <View style={[styles.item, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
            <View style={[styles.content, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
                <View style={styles.info}>
                    <CustomText style={[styles.title]} numberOfLines={2} lineBreakMode="tail" >{getTitle(item.gender, item.name)}</CustomText>
                    <View style={{ justifyContent: "flex-start", flexDirection: language === 'ar' ? 'row-reverse' : 'row', alignItems: "center" }}>
                        {item.subjects.map((subject, i) => {
                            let subjectSchedule = subject.schoolYears.find(x => x.id === userInfo?.schoolYear.id)
                            return <TouchableOpacity key={i} style={{
                                marginRight: language === 'en' ? 10 : 0,
                                marginLeft: language === 'ar' ? 10 : 0
                            }} disabled={!subjectSchedule} onPress={() => changeSubjectHandler(subject)} >
                                <CustomText style={[styles.regular, {
                                    opacity: !subjectSchedule && selectedSubject ? 0.5 : 1,
                                    color: (selectedSubject && subject[language] === selectedSubject[language]) ? Color.darkcyan : Color.darkgray
                                }]}>
                                    {subject[language]}
                                </CustomText>
                            </TouchableOpacity>
                        })}
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
                        <CustomText style={styles.regular}>{formatDistance(item.distance, language)}</CustomText>
                    </View>
                </View>
            </View>
            <CustomImage
                style={[styles.image, language === 'en' ? { marginRight: 10 } : { marginLeft: 10 }]}
                resizeMode="center"
                source={item.imageSource} />
        </View >
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
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: widthPercentage(100),
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    content: {
        flex: 1,
        height: 120,
        backgroundColor: Color.cyanBackGround,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 20,
        padding: Padding.p_base,

    },
    info: {
        height: 120,
        width: "100%",
        justifyContent: "space-evenly",
    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 20,

    }, likes: {
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 35
    },
})