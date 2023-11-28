import React from 'react'
import { StyleSheet, Text, View, Platform, Pressable } from 'react-native'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core';
import CustomImage from './CustomImage ';

const Subject = React.memo(({ item }) => {
    const { language } = useSelector(state => state.languageState)
    const navigation = useNavigation()

    const handelScale = () => {
        if (item.addButton) {
            navigation.navigate("SearchScreen")
        } else {
            navigation.navigate("SubjectScreen", { item })
        }
    }
    return (
        <Pressable style={({ pressed }) => ({ transform: [{ scale: pressed ? 0.8 : 1 }] })} onPress={handelScale} >
            <View style={[styles.card]}>
                <View style={[styles.subject, {
                }]}>
                    <CustomImage
                        style={{ height: "80%", width: "80%" }}
                        color={Color.darkcyan}
                        resizeMode="contain"
                        source={item.imageSource}
                    />
                </View>
                <Text style={styles.title}>{item[language]}</Text>
            </View>
        </Pressable>
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