import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { Border, Color, Height, globalStyles } from '../GlobalStyles'
import transition from '../actions/transition'
import * as Haptics from 'expo-haptics';

export default function SortingContainer({ sortingOptions, selectedOption, setSelectedOption }) {
    const scrollViewRef = useRef();

    const handleScroll = (event) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        const middleY = contentOffsetY + (event.nativeEvent.layoutMeasurement.height / 2);
        const itemHeight = Height.hi_container / 3; // Height of each item
        const middleIndex = Math.floor(middleY / itemHeight);
        setSelectedOption(middleIndex - 1);
    };

    useEffect(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, [selectedOption])

    scrollToIndex = (index) => {
        scrollViewRef.current.scrollTo({ y: index * (Height.hi_container / 3), animated: true });
    }
    useEffect(() => {
        scrollToIndex(selectedOption)
    }, [])
    return (
        <ScrollView
            style={styles.scrollContainer}
            ref={scrollViewRef}
            onScroll={handleScroll}
            nestedScrollEnabled
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            snapToInterval={Height.hi_container / 3}
            disableIntervalMomentum={true}
        >
            <View style={{ marginBottom: Height.hi_container / 3 }}>
                <View style={[styles.option, { opacity: 0.5, transform: [{ scale: 0.8 }] }]} >
                    <Text style={globalStyles.title}>Sort</Text>
                </View>
                {sortingOptions.map((option, index) => {
                    let focused = index === selectedOption
                    return (
                        <TouchableOpacity key={index} onPress={() => scrollToIndex(index)}>
                            <Animated.View style={[styles.option, { opacity: transition(0.5, 1, 500, focused), transform: [{ scale: transition(0.8, 1.5, 500, focused) }] }]} >
                                <Text style={globalStyles.title}>{option}</Text>
                            </Animated.View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({

    scrollContainer: {
        width: "100%",
        maxHeight: Height.hi_container,
        overflow: 'hidden',
        backgroundColor: Color.ofWhite,
        borderRadius: Border.br_6xl
    },
    option: {
        height: Height.hi_container / 3,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    }
})