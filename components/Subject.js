import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Platform, Pressable } from 'react-native'
import { Color, FontFamily, FontSize, globalStyles } from '../GlobalStyles'
import { useNavigation } from '@react-navigation/core';
import CustomImage from './CustomImage ';
import Animated, { Easing, FadeInDown } from 'react-native-reanimated';
import { removeDuplicates } from '../actions/GlobalFunctions';

const Subject = React.memo(({ item, index, myGroups, language }) => {
    const navigation = useNavigation()
    const [isiInMySubject, setIsiInMySubject] = useState(false)

    useEffect(() => {
        if (!myGroups) return
        const mySubjectsTitles = removeDuplicates(myGroups.map(x => x.subject))
        setIsiInMySubject(mySubjectsTitles.includes(item.en))
    }, [myGroups, item])

    const handelScale = () => {
        if (item.addButton) {
            navigation.navigate("SearchScreen")
        } else if (isiInMySubject) {
            navigation.navigate("SubjectScreen", { item: item })
        } else {
            navigation.navigate("SearchScreen", { subject: item })
        }
    }
    return (
        <Animated.View entering={FadeInDown.duration(400 + (index * 200)).easing(Easing.ease)} >
            <Pressable style={({ pressed }) => ([styles.card, { transform: [{ scale: pressed ? 0.8 : 1 }] }])} onPress={handelScale}  >
                <View style={[styles.subject]}>
                    <CustomImage
                        style={{ height: "80%", width: "80%" }}
                        color={isiInMySubject ? Color.darkcyan : Color.darkgray}
                        resizeMode="contain"
                        source={item?.imageSource || item?.imageSource}
                    />
                </View>
                <Text style={[globalStyles.contentText, { color: isiInMySubject ? Color.darkcyan : Color.darkgray }]}>{item?.[language] || item?.[language]}</Text>
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
    }

})