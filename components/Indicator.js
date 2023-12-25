import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Border, Color, globalStyles } from '../GlobalStyles'

export default function Indicator({ arr, activeIndex }) {
    return (
        <View style={styles.parentFlexBox} >
            {arr.map((x, i) => <View key={i} style={[globalStyles.eventBall, { margin: 5, backgroundColor: Color.darkcyan, opacity: activeIndex === i ? 1 : 0.3, height: activeIndex === i ? 20 : 5 }]} />)}
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

        borderRadius: Border.br_13xl,
    },

})