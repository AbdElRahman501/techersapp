import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize } from '../GlobalStyles'
import { useSelector } from 'react-redux'

const TeacherCard = React.memo(({ item }) => {
    const { language } = useSelector(state => state.languageState)
    return (
        <TouchableOpacity style={styles.card} onPress={() => console.log(item.id)} >
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
            <Text style={styles.title}>{item.title[language]}</Text>
            <Text style={styles.regular}>{item.content[language]}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={styles.likes}>25</Text>
                <Text style={styles.regular}>800 متر</Text>
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
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
    },
    regular: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_sm,
        color: Color.darkgray
    },
    likes: {
        backgroundColor: Color.cyanBackGround,
        color: Color.darkcyan,
        paddingVertical: 2,
        paddingHorizontal: 6,
        borderRadius: 5
    }
}) 