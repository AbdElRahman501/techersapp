import { StyleSheet, Image, TouchableOpacity, Text, View, Platform } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useSelector } from 'react-redux'

const Subject = React.memo(({ item }) => {
    const { language } = useSelector(state => state.languageState)
    return (
        <TouchableOpacity style={styles.card} onPress={() => console.log(item.id)} >
            <View style={styles.subject}>
                <Image
                    style={{ height: "80%", width: "80%" }}
                    resizeMode="contain"
                    source={item.imageSource}
                />
            </View>
            <Text style={styles.title}>{item.title[language]}</Text>
        </TouchableOpacity>
    );
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
                shadowColor: 'rgba(0, 0, 0, 0.10)',
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 10
    },
    title: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        color: Color.darkcyan
    }

})