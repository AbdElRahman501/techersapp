import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import { checkArrayForUserId, formatDistance, getSubjectTitle, } from '../actions/GlobalFunctions'
import { useSelector } from 'react-redux';
import { Heart_Icon_Fill } from '../assets/icons/Icons';


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
                <Image
                    style={{ height: 100, width: 100, borderRadius: 50 }}
                    resizeMode="contain"
                    source={
                        typeof item.imageSource === 'number'
                            ? item.imageSource // Local image require path
                            : { uri: item.imageSource } // Internet image URL
                    }
                />
            </View>
            <Text style={styles.title} numberOfLines={1} lineBreakMode='tail'>{item.name}</Text>
            <Text style={styles.regular} numberOfLines={1} lineBreakMode='tail' >{getSubjectTitle(item.gender, item.mainSubject[language])}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={styles.likes}>
                    <Heart_Icon_Fill
                        width={10} height={10}
                        viewBox="0 0 22 19"
                        fill={checkArrayForUserId(item.likes, id) ? Color.darkcyan : "none"}
                        color={checkArrayForUserId(item.likes, id) ? "none" : Color.darkcyan} />
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
        borderColor: 'rgba(0, 0, 0, 0.10)',
        padding: 10,
        borderWidth: 1,
        borderRadius: 15
    },
    imagContainer: {
        height: 100,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 35
    },

}) 