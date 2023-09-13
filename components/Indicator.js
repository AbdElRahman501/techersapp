import { Animated, StyleSheet, View } from 'react-native'
import React from 'react'
import { Border, Color } from '../GlobalStyles'
import transition from '../actions/transition'

export default function Indicator({ arr, activeIndex }) {
    return (
        <View style={styles.parentFlexBox} >
            {arr.map((x, i) => <Animated.View key={i} style={[styles.frameItem, { opacity: transition(0.3, 1, 500, activeIndex === i), height: transition(5, 20, 500, activeIndex === i) }]} />)}
        </View>
    )
}
const styles = StyleSheet.create({

    parentFlexBox: {
        flexDirection: "row",
        alignItems: "center",
        height: 20,
    },

    frameItem: {
        height: 5,
        opacity: 0.3,
        margin: 5,
        width: 5,
        backgroundColor: Color.darkcyan,
        borderRadius: Border.br_37xl,
    },

})