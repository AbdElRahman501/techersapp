import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Border, Color, FontFamily, FontSize } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import { checkArrayForUserId, formatDistance, getSubject, getSubjectTitle, } from '../actions/GlobalFunctions'
import { useSelector } from 'react-redux';
import { Heart_Icon_Fill, Heart_Stroke } from '../assets/icons/Icons';
import CustomText from './CustemText';
import CustomImage from './CustomImage ';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';


const TeacherCard = React.memo(({ item, index }) => {
    const navigation = useNavigation()
    const { language } = useSelector(state => state.languageState)
    const { subjects } = useSelector(state => state.subjectsState)
    const subject = getSubject(subjects, item.mainSubject.subject)
    const id = 18
    const handlePress = () => {
        navigation.navigate("TeacherScreen", { item })
    }

    return (
        <Animated.View style={styles.card} entering={FadeInDown.duration(400 + (index * 200)).easing(Easing.ease)}  >
            <TouchableOpacity style={styles.imagContainer} onPress={handlePress} >
                <CustomImage
                    style={{ height: "100%", width: "100%", borderRadius: Border.br_6xl }}
                    resizeMode="cover"
                    source={item.imageSource}
                />
            </TouchableOpacity>
            <CustomText style={[styles.title, { width: "100%", height: FontSize.size_lg, marginBottom: 2 }]} >{item.name}</CustomText>
            <CustomText style={[styles.regular, { marginBottom: 5 }]} >{getSubjectTitle(item.gender, subject[language])}</CustomText>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={styles.likes}>
                    {checkArrayForUserId(item.likes, id) ?
                        <Heart_Icon_Fill
                            width={10} height={10}
                            viewBox="0 0 22 19" />
                        : <Heart_Stroke
                            width={10} height={10}
                            viewBox="0 0 22 19" />}
                    <Text style={[styles.regular, { color: Color.darkcyan }]}>{item.likes.length}</Text>
                </View>
                <Text style={styles.regular}>{formatDistance(item.distance, language)}</Text>
            </View>
        </Animated.View>
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});
export default TeacherCard;
const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 200,
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
        borderColor: Color.lightGray,
        padding: 10,
        borderWidth: 1,
        borderRadius: Border.br_6xl + 10,
    },
    imagContainer: {
        marginBottom: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
    },
    regular: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_sm,
        color: Color.darkgray
    },
    likes: {
        backgroundColor: Color.cyanBackGround,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 5,
        borderBottomLeftRadius: Border.br_6xl,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 35
    },

}) 