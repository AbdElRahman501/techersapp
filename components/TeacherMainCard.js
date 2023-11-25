import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, FontFamily, FontSize, Padding, widthPercentage } from '../GlobalStyles'
import CustomImage from './CustomImage '
import CustomText from './CustemText'
import { Heart_Icon_Fill, Heart_Stroke } from '../assets/icons/Icons';
import { useSelector } from 'react-redux'
import { formatDistance, checkArrayForUserId, getTitle, removeDuplicatesById } from '../actions/GlobalFunctions'
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';

export default function TeacherMainCard({ likes, item, userID, selectedSubject, changeSubjectHandler, index }) {
    const { language } = useSelector(state => state.languageState)
    const [liked, setLiked] = useState({ state: false, number: likes?.length || 0 })
    const subjects = item?.subjects || removeDuplicatesById(item?.groups.map(x => x.subject))
    useEffect(() => {
        if (checkArrayForUserId(likes, userID) && !liked.state) {
            setLiked(pv => ({ ...pv, state: true }))
        }
    }, [])

    return (
        <Animated.View sharedTransitionTag={item?.id} entering={index >= 0 ? FadeInDown.duration(400 + (index * 200)).easing(Easing.ease) : false} style={[styles.item, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
            <View style={[styles.content, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
                <View style={styles.info}>
                    <CustomText style={[styles.title]} numberOfLines={2} lineBreakMode="tail" >{getTitle(item?.gender, item?.name)}</CustomText>
                    <View style={{ gap: 10, justifyContent: "flex-start", flexDirection: language === 'ar' ? 'row-reverse' : 'row', alignItems: "center" }}>
                        {subjects.map((subject, i) => <TouchableOpacity key={i} onPress={() => changeSubjectHandler && changeSubjectHandler(subject)} disabled={!selectedSubject} >
                            <CustomText style={[styles.regular, {
                                color: (selectedSubject && subject[language] === selectedSubject[language]) ? Color.darkcyan : Color.darkgray
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
            </View>
            <CustomImage
                style={[styles.image, language === 'en' ? { marginRight: 10 } : { marginLeft: 10 }]}
                resizeMode="cover"
                source={item?.imageSource} />
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