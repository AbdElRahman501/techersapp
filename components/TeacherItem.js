import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize, widthPercentage } from '../GlobalStyles'
import CustomImage from './CustomImage '
import CustomText from './CustemText'
import { Heart_Icon_Fill, Next_Icon } from '../assets/icons/Icons';
import { useSelector } from 'react-redux'
import { getSubjectTitle, getTextInputAlign, getTitle, isArabic } from '../actions/GlobalFunctions'


export default function TeacherItem({ item, isSelected, togglePicker }) {
    const { language } = useSelector(state => state.languageState)
    return (
        <View style={[isSelected ? styles.selectedItem : styles.item, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
            <View style={{ width: 30, alignItems: 'center' }}>
                {isSelected &&
                    <TouchableOpacity onPress={() => console.log("liked")}>
                        <Heart_Icon_Fill fill={Color.darkcyan}  />
                    </TouchableOpacity>
                }
            </View>
            <View style={[styles.content, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
                <View style={styles.info}>
                    <CustomText numberOfLines={1} lineBreakMode="tail" style={[styles.title]}>{getTitle(item.gender, item.name)}</CustomText>
                    <CustomText style={[styles.regular]}>{getSubjectTitle(item.gender, item.mainSubject[language])}</CustomText>
                </View>
                <CustomImage
                    style={[styles.image]}
                    resizeMode="contain"
                    source={item.imageSource} />
                <View style={[styles.dropButton]}>
                    {isSelected &&
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
        paddingVertical: 10,
        width: widthPercentage(100),
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedItem: {
        backgroundColor: Color.cyanBackGround,
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 64,
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
        width: widthPercentage(100) - (50 +20+80),
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 30,
        marginHorizontal: 10
    }
})