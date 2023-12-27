import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Linking } from 'react-native';
import { Color, fontEm, globalStyles, heightPercentage, widthPercentage } from '../GlobalStyles';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import { getSubject, getSubjectTitle, getTitle } from '../actions/GlobalFunctions';
import { useNavigation } from '@react-navigation/core';
import CustomImage from './CustomImage ';
import { adClicked } from '../store/actions/adsActions';

const AdItem = ({ item, language, subjects, initialHeight, holdHandler }) => {

    const subject = getSubject(subjects, item?.mainSubject)
    const navigation = useNavigation()
    const text = { ar: "أحجز الآن", en: "Book Now" }
    const handlePress = () => {
        adClicked(item.id)
        if (item.role === "teacher") {
            const id = item.teacherId
            navigation.navigate("TeacherScreen", { item: { ...item, id } })
        } else if (item.role === "poster") {
            if (item?.link) {
                Linking.openURL(item?.link)
            } else if (item?.destination) {
                navigation.navigate(item?.destination, item?.params)
            }
        }
    }

    return (
        <LongPressGestureHandler onHandlerStateChange={holdHandler} >
            {item.role === "teacher" ?
                <View style={[styles.itemContainer, { paddingHorizontal: 24 }]} >
                    <View style={{ flex: 1, padding: 5 }}>
                        <Text style={globalStyles.title}>{getTitle(item.gender, item.name)}</Text>
                        <Text style={[globalStyles.regular, { color: Color.gray_200, textAlign: 'center' }]}>{getSubjectTitle(item.gender, subject[language])}</Text>
                        <TouchableOpacity onPress={handlePress} style={styles.primaryButton}>
                            <Text style={[globalStyles.regular, { color: Color.white }]}>
                                {text[language]}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <CustomImage
                        style={{ width: initialHeight - 20, borderRadius: (initialHeight - 20) / 2, maxWidth: 160, aspectRatio: 1, marginHorizontal: fontEm(1) }}
                        resizeMode="cover"
                        source={item.imageSource}
                    />
                </View>
                :
                <Pressable style={({ pressed }) => ([styles.itemContainer, { opacity: pressed ? 0.9 : 1 }])} onPress={handlePress}>
                    <CustomImage
                        style={{ height: "100%", width: "100%" }}
                        resizeMode="cover"
                        source={item.imageSource}
                    />
                </Pressable>
            }
        </LongPressGestureHandler>
    );
}
export default AdItem;

const styles = StyleSheet.create({
    itemContainer: {
        width: widthPercentage(100),
        aspectRatio: 20 / 9,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    primaryButton: {
        marginTop: 10,
        height: 30,
        width: 100,
        backgroundColor: Color.darkcyan,
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }

})