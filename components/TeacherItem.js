import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Color, FontFamily, FontSize, Height, Padding, widthPercentage } from '../GlobalStyles'
import CustomImage from './CustomImage '
import CustomText from './CustemText'
import { Heart_Icon_Fill, Heart_Stroke, Next_Icon } from '../assets/icons/Icons';
import { useSelector } from 'react-redux'
import { checkArrayForUserId, getSubjectTitle, getTitle } from '../actions/GlobalFunctions'


export default function TeacherItem({ subject, item, isSelected, togglePicker, onlyOne }) {
    const { language } = useSelector(state => state.languageState)
    const [liked, setLiked] = useState({ state: false, number: item.likes.length })
    const id = 18

    useEffect(() => {
        if (checkArrayForUserId(item.likes, id) && !liked.state) {
            setLiked(pv => ({ ...pv, state: true }))
        }
    }, [])
    return (
        <View style={[isSelected ? styles.selectedItem : styles.item, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
            <View style={{ width: 30, alignItems: 'center' }}>
                {isSelected &&
                    <TouchableOpacity onPress={() => setLiked({ state: !liked.state, number: liked.state ? liked.number - 1 : liked.number + 1 })}>
                        {liked.state ? <Heart_Icon_Fill /> : <Heart_Stroke />}
                    </TouchableOpacity>
                }
            </View>
            <View style={[styles.content, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
                <View style={styles.info}>
                    <CustomText numberOfLines={1} lineBreakMode="tail" style={[styles.title]}>{getTitle(item.gender, item.name)}</CustomText>
                    <CustomText style={[styles.regular]}>{getSubjectTitle(item.gender, subject[language] || item.mainSubject[language])}</CustomText>
                </View>
                <CustomImage
                    style={[styles.image]}
                    resizeMode="contain"
                    source={item.imageSource} />
                <View style={[styles.dropButton]}>
                    {isSelected && onlyOne != 1 &&
                        <TouchableOpacity onPress={togglePicker}>
                            <Next_Icon color={Color.darkcyan} style={{ transform: [{ rotate: '90deg' }] }} />
                        </TouchableOpacity>

                    }
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,

    },
    regular: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_sm,
        color: Color.darkgray
    },
    item: {
        paddingVertical: Padding.teacher_tap,
        width: widthPercentage(100),
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedItem: {
        backgroundColor: Color.cyanBackGround,
        paddingVertical: Padding.teacher_tap,
        paddingHorizontal: 10,
        height: Height.teacher_tap,
        width: widthPercentage(100),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: Color.darkgray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
    },

    dropButton: {
        height: "100%",
        width: 20,
        alignItems: 'center',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: widthPercentage(100) - 60,
    },
    info: {
        width: widthPercentage(100) - (50 + 20 + 80),
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginHorizontal: 10
    }
})