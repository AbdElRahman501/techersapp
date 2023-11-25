import { Platform, StyleSheet, TouchableWithoutFeedback, Animated, Pressable } from 'react-native'
import React from 'react'
import { Filter_Icon_Fill, Filter_Icon_Stroke } from '../assets/icons/Icons'
import { Border, Color, Height } from '../GlobalStyles'
import transition from '../actions/transition';
import { useState } from 'react';
import FilterModal from './FilterModal';
import { useNavigation } from '@react-navigation/core';
import RNAnimated from 'react-native-reanimated';
export default function FilterButton({ button, filter, setFilter }) {
    const [clicked, setClicked] = useState(false);
    const navigation = useNavigation();

    return (
        <RNAnimated.View
            sharedTransitionTag={"filter button"}
        >
            <Pressable onPress={() => {
                if (button) {
                    navigation.navigate("SearchScreen")
                } else {
                    setClicked(!clicked)
                    setFilter({ filter: true })
                }
            }}>
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
            </Pressable>
            <FilterModal isVisible={clicked} onClose={() => setClicked(false)} onApply={setFilter} />
        </RNAnimated.View>
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