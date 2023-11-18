import { StyleSheet, Platform, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color, Height } from '../GlobalStyles'
import { Calender_home_Svg, Calender_home_svg_fill, Community_Icon, Community_Icon_Fill, Home_icon_Svg, User_Icon_Svg } from '../assets/icons/Icons'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Animated from 'react-native-reanimated';

export default function TapBottomNavigator({ currentScreen }) {
    const navigation = useNavigation();

    return (
        <Animated.View sharedTransitionTag={"Tap Bottom Navigator"} style={styles.tapContainer}>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.navigate("Home")}  >
                {currentScreen === "Home"
                    ? <Home_icon_Svg fill={Color.darkcyan} color={Color.darkcyan} />
                    : <Home_icon_Svg />
                }
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.navigate('Community')}>
                {currentScreen === 'Community'
                    ? <Community_Icon_Fill />
                    : <Community_Icon />
                }
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.navigate('Schedule')}>
                {currentScreen === 'Schedule'
                    ? <Calender_home_svg_fill />
                    : <Calender_home_Svg />
                }
            </TouchableOpacity>
            <TouchableOpacity style={{ padding: 20 }} onPress={() => navigation.navigate('Profile')}>
                {currentScreen === 'Profile'
                    ? <User_Icon_Svg fill={Color.darkcyan} color={Color.darkcyan} />
                    : <User_Icon_Svg />
                }
            </TouchableOpacity>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    tapContainer: {
        // flex: 1,
        height: Height.nav_tap,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        zIndex: 999,
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        backgroundColor: '#fff',
        borderColor: Color.lightGray,
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: Color.lightGray,
                shadowOffset: {
                    width: 0,
                    height: -5,
                },
                shadowOpacity: 0.5,
                shadowRadius: 5,
            },
            android: {

                elevation: 24,
            },
        }),
    }

})