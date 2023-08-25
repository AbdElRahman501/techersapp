import { StyleSheet, Platform, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color, Height } from '../GlobalStyles'
import { Calender_home_Svg, Calender_home_svg_fill, Community_Icon, Community_Icon_Fill, Home_icon_Svg, Mail_OutLine_Svg, User_Icon_Svg } from '../assets/icons/Icons'
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useEffect } from 'react';
import { useState } from 'react';

export default function TapBottomNavigator() {
    const navigation = useNavigation();
    const [currentScreen, setCurrentScreen] = useState([]);
    const navigationState = useNavigationState(state => state);

    useEffect(() => {
        if (navigationState?.routes) {
            const history = navigationState.routes.map(route => route.name);
            setCurrentScreen(history[history.length - 1]);
        }
    }, [navigationState?.routes]);

    const goTo = (distinction) => {
        if (currentScreen !== distinction) {
            navigation.navigate(distinction);
        }
    }


    return (currentScreen === 'Home' || currentScreen === 'Community' || currentScreen === 'Schedule' || currentScreen === 'Profile') && (
        <View style={styles.container} >
            <TouchableOpacity onPress={() => goTo("Home")}  >
                {currentScreen === "Home"
                    ? <Home_icon_Svg fill={Color.darkcyan} color={Color.darkcyan} />
                    : <Home_icon_Svg />
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Community')}>
                {currentScreen === 'Community'
                    ? <Community_Icon_Fill viewBox={"0 0 40 40"} color={Color.darkcyan} />
                    : <Community_Icon />
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Schedule')}>
                {currentScreen === 'Schedule'
                    ? <Calender_home_svg_fill viewBox={"0 0 40 40"} color={Color.darkcyan} />
                    : <Calender_home_Svg  />
                }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => goTo('Profile')}>
                {currentScreen === 'Profile'
                    ? <User_Icon_Svg fill={Color.darkcyan} color={Color.darkcyan} />
                    : <User_Icon_Svg />
                }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: Height.nav_tap,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 999,
        position: 'absolute',
        bottom: 0,
        borderColor: Color.lightGray,
        borderWidth: 1,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: -5,
                },
                shadowOpacity: 1,
                shadowRadius: 0,
            },
            android: {

                elevation: 24,
            },
        }),
    }


})