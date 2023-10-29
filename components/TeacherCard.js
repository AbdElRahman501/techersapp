import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Border, Color, FontFamily, FontSize } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import { checkArrayForUserId, formatDistance, getSubjectTitle, } from '../actions/GlobalFunctions'
import { useSelector } from 'react-redux';
import { Heart_Icon_Fill, Heart_Stroke } from '../assets/icons/Icons';
import CustomText from './CustemText';
import CustomImage from './CustomImage ';


const TeacherCard = React.memo(({ item }) => {
    const navigation = useNavigation()
    const { language } = useSelector(state => state.languageState)
    const id = 18
    const handlePress = () => {
        navigation.navigate("TeacherScreen", { item })
    }

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress} >
            <View style={styles.imagContainer}>
                <CustomImage
                    style={{ height: "100%", width: "100%", borderRadius: Border.br_6xl }}
                    resizeMode="cover"
                    source={item.imageSource}
                />
            </View>
            <CustomText style={[styles.title, { width: "100%", height: FontSize.size_lg }]} >{item.name}</CustomText>
            <CustomText style={[styles.regular, { marginBottom: 5 }]} >{getSubjectTitle(item.gender, item.mainSubject[language])}</CustomText>
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
        </TouchableOpacity>
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
        borderBottomLeftRadius: Border.br_6xl ,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 35
    },

}) 