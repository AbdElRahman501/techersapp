import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize, Padding, widthPercentage } from '../GlobalStyles'
import CustomImage from './CustomImage '
import CustomText from './CustemText'
import { Chat_Icon } from '../assets/icons/Icons'
import { getTitle } from '../actions/GlobalFunctions'
import { useSelector } from 'react-redux'
import t from '../actions/changeLanguage'

const FriendItem = React.memo(({ item, teacher }) => {
    const { language } = useSelector(state => state.languageState)
    return (
        <View style={[styles.item, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
            <View>
                <TouchableOpacity style={styles.icon} onPress={() => console.log("liked")}>
                    <Chat_Icon />
                </TouchableOpacity>
            </View>
            <View style={[styles.content, { flexDirection: language === 'en' ? 'row-reverse' : 'row' }]}>
                <View style={styles.info}>
                    <CustomText style={styles.title}>{item.name}</CustomText>
                    <CustomText numberOfLines={1} lineBreakMode="tail" style={styles.regular}>{t("colleagues from", { name: getTitle(teacher?.gender, teacher?.name) })}</CustomText>
                    <CustomText numberOfLines={1} lineBreakMode="tail" style={styles.regular}>{t("ask about teacher", { name: getTitle(teacher?.gender, teacher?.name) })}</CustomText>
                </View>
                <CustomImage
                    style={[styles.image]}
                    resizeMode="cover"
                    source={item.imageSource} />


            </View>
        </View>
    )
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default FriendItem
const styles = StyleSheet.create({

    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
    },
    regular: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_md,
        color: Color.darkgray
    },
    item: {
        width: widthPercentage(100) - (Padding.page_p * 2),
        height: 70,
        borderRadius: 35,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Color.lightGray,
        borderWidth: 1,
        padding: 5
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    info: {
        width: widthPercentage(100) - (Padding.page_p * 2) - 130,
        padding: 5
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 30,
    },
    icon: {
        backgroundColor: Color.darkcyan,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 30,
    }
})