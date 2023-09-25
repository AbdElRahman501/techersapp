import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Border, Color, FontSize, Height, fontEm, widthPercentage } from '../GlobalStyles'
import { Address_Mark_Svg } from '../assets/icons/Icons'
import * as Haptics from 'expo-haptics';
import { formatDistance } from '../actions/GlobalFunctions';
import { useSelector } from 'react-redux';

export default function DistanceFilter({ distances, selectedDistance, setSelectedDistance }) {
    circleWidth = (widthPercentage(100) - 40) / distances.length
    const { language } = useSelector(state => state.languageState)

    useEffect(() => {
        Haptics.notificationAsync(
            Haptics.NotificationFeedbackType.Success
        )
    }, [selectedDistance])

    return (
        <View style={[styles.container, styles.centerContainer]} >
            {distances.slice().reverse().map((distance, index) => {
                let x = distances.length - index
                let focus = selectedDistance >= x
                return (
                    <TouchableOpacity key={x} onPress={() => setSelectedDistance(x)} style={[styles.circle, styles.centerContainer, focus && styles.focus, { width: circleWidth * x, height: circleWidth * x, top: -((circleWidth * x) - 80) / 2, borderRadius: (circleWidth / 2) * x }]} >
                        {selectedDistance <= x && <Text style={{ fontSize: FontSize.size_sm, transform: [{ scale: focus ? 1.3 : 1 }], position: 'absolute', right: selectedDistance === x ? 12 : 5 }} >{formatDistance(distance, language)}</Text>}
                    </TouchableOpacity>
                )
            })}
            <Address_Mark_Svg color={Color.darkcyan} fill={Color.darkcyan} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        height: Height.hi_container,
        backgroundColor: Color.ofWhite,
        borderRadius: Border.br_6xl,
        overflow: "hidden",

    },
    centerContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    circle: {
        backgroundColor: Color.white,
        shadowColor: Color.gray_200,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: Platform.OS === 'android' ? 10 : 0,
        position: "absolute",

    },
    focus: {
        backgroundColor: Color.cyanBackGround,
    }

})