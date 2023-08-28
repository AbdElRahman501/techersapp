import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { Color, FontFamily, FontSize, Margin, widthPercentage } from '../GlobalStyles'
import CustomImage from './CustomImage '
import CustomText from './CustemText'
import { Heart_Icon_Fill, Next_Icon } from '../assets/icons/Icons';


export default function TeacherItem({ item, isSelected, togglePicker }) {
    return (
        <View style={isSelected ? styles.selectedItem : styles.item}>
            <View>
                {isSelected &&
                    <TouchableOpacity onPress={() => console.log("liked")}>

                        <Heart_Icon_Fill fill={Color.darkcyan}  />
                    </TouchableOpacity>
                }
            </View>
            <View style={styles.content}>
                <View style={styles.info}>
                    <CustomText style={styles.title}>{item.name}</CustomText>
                    <CustomText style={styles.regular}>{item.mainSubject}</CustomText>
                </View>
                <CustomImage
                    style={[styles.image, { marginRight: isSelected ? 0 : 30 }]}
                    resizeMode="contain"
                    source={item.imageSource} />
                {isSelected &&
                    <TouchableOpacity style={styles.dropButton} onPress={togglePicker}>
                        <Next_Icon color={Color.darkcyan} style={{ transform: [{ rotate: '90deg' }] }} />
                    </TouchableOpacity>

                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({

    title: {
        fontSize: FontSize.size_lg,
        fontFamily: FontFamily.montserratArabic,
    },
    regular: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_sm,
        color: Color.darkgray
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: widthPercentage(100),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedItem: {
        backgroundColor: Color.cyanBackGround,
        paddingVertical: 10,
        paddingHorizontal: 20,
        height: 64,
        width: widthPercentage(100),
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: Color.darkgray,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 5,
    },

    dropButton: {
        height: "100%",
        width: 20,
        marginLeft: 10
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    image: {
        height: 60,
        width: 60,
        borderRadius: 50,
        marginHorizontal: Margin.m_base,
    }
})