import { Platform, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native'
import React from 'react'
import { Filter_Icon_Fill, Filter_Icon_Stroke } from '../assets/icons/Icons'
import { Border, Color, Height } from '../GlobalStyles'
import transition from '../actions/transition';
import { useState } from 'react';
import FilterModal from './FilterModal';

export default function FilterButton({ filter, setFilter }) {
    const [clicked, setClicked] = useState(false);
    return (
        <>
            <TouchableWithoutFeedback onPress={() => {
                setClicked(!clicked)
                setFilter({ filter: true })
            }} >
                <Animated.View style={[styles.filterIcon, {
                    transform: [{
                        scale: transition(1, 1.1, 200, clicked)
                    }],
                    shadowColor: transition(Color.gray_200, Color.darkcyan, 200, clicked),
                }
                ]} >
                    {clicked ? <Filter_Icon_Fill /> :
                        <Filter_Icon_Stroke />
                    }
                </Animated.View>
            </TouchableWithoutFeedback>
            <FilterModal isVisible={clicked} onClose={() => setClicked(false)} onApply={setFilter} />
        </>
    )
}

const styles = StyleSheet.create({
    filterIcon: {
        width: Height.hi_input,
        height: Height.hi_input,
        backgroundColor: Color.input_fill,
        borderRadius: Border.br_3xl,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: Platform.OS === 'android' ? 10 : 0,
    }
})