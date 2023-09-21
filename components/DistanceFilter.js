import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Border, Color, Height, fontEm, widthPercentage } from '../GlobalStyles'
import { Address_Mark_Svg } from '../assets/icons/Icons'

export default function DistanceFilter({ distances, selectedDistance, setSelectedDistance }) {
    circleWidth = (widthPercentage(100) - 40) / distances.length
    return (
        <View style={[styles.container, styles.centerContainer]} >
            {distances.slice().reverse().map((distance, index) => {
                let x = distances.length - index
                let focus = selectedDistance >= x
                return (
                    <TouchableOpacity key={x} onPress={() => setSelectedDistance(x)} style={[styles.circle, styles.centerContainer, focus && styles.focus, { width: circleWidth * x, height: circleWidth * x, top: -((circleWidth * x) - 80) / 2, borderRadius: (circleWidth / 2) * x }]} >
                        <Text style={{ fontSize: fontEm(0.6), transform: [{ scale: focus ? 1.3 : 1 }], position: 'absolute', right: 5 }} >{distance}</Text>
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
        elevation: 10,
        position: "absolute",

    },
    focus: {
        backgroundColor: Color.cyanBackGround,
    }

})