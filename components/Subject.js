import React from 'react'
import { StyleSheet, Text, View, Platform, Pressable } from 'react-native'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import CustomImage from './CustomImage ';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';
import { getSubject } from '../actions/GlobalFunctions';

const Subject = React.memo(({ item, index, subjects, language }) => {
    const navigation = useNavigation()
    const subject = getSubject(subjects, item)
    const handelScale = () => {
        if (item.addButton) {
            navigation.navigate("SearchScreen")
        } else {
            navigation.navigate("SubjectScreen", { item: subject })
        }
    }
    return (
        <Animated.View entering={FadeInDown.duration(400 + (index * 200)).easing(Easing.ease)} >
            <Pressable style={({ pressed }) => ([styles.card, { transform: [{ scale: pressed ? 0.8 : 1 }] }])} onPress={handelScale}  >
                <View style={[styles.subject, {
                }]}>
                    <CustomImage
                        style={{ height: "80%", width: "80%" }}
                        color={Color.darkcyan}
                        resizeMode="contain"
                        source={subject?.imageSource || item?.imageSource}
                    />
                </View>
                <Text style={styles.title}>{subject?.[language] || item?.[language]}</Text>
            </Pressable>
        </Animated.View>
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default Subject;
const styles = StyleSheet.create({
    subject: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 5,
        marginBottom: 10,
        backgroundColor: Color.white,
        ...Platform.select({
            ios: {
                shadowColor: Color.lightGray,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 7,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    card: {
        alignItems: 'center',
        margin: 10
    },
    title: {
        fontSize: FontSize.size_md,
        fontFamily: FontFamily.montserratArabic,
        color: Color.darkcyan
    }

})