import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { Border, Color, globalStyles } from '../GlobalStyles'
import transition from '../actions/transition'
import * as Haptics from 'expo-haptics';

export default function SortingContainer({ height, sortingOptions, selectedOption, setSelectedOption, placeholder }) {
    const scrollViewRef = useRef();
    const ContainerHeight = height || 400;
    const itemHeight = 35;
    const handleScroll = (event) => {
        const contentOffsetY = event.nativeEvent.contentOffset.y;
        const middleY = contentOffsetY + itemHeight;
        const middleIndex = Math.round(middleY / itemHeight)
        setSelectedOption(middleIndex - 1);
    };

    useEffect(() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    }, [selectedOption])

    scrollToIndex = (index) => {
        setSelectedOption(index);
        scrollViewRef.current.scrollTo({ y: index * (itemHeight), animated: true });
    }
    useEffect(() => {
        scrollToIndex(selectedOption)
    }, [])
    return (
        <ScrollView
            style={[styles.scrollContainer, { maxHeight: ContainerHeight }]}
            ref={scrollViewRef}
            onScroll={handleScroll}
            nestedScrollEnabled
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            snapToInterval={itemHeight}
            disableIntervalMomentum={true}
        >

            <View style={{ marginBottom: (ContainerHeight / 2) - (itemHeight * 0.5), marginTop: (ContainerHeight / 2) - (itemHeight * 1.5) }}>
                <View style={[styles.option, { height: itemHeight, opacity: 0.5, transform: [{ scale: 0.8 }] }]} >
                    <Text style={[globalStyles.title]}>{placeholder}</Text>
                </View>
                {sortingOptions.map((option, index) => {
                    let focused = index === selectedOption
                    return (
                        <TouchableOpacity key={index} onPress={() => scrollToIndex(index)}>
                            <Animated.View style={[styles.option, { height: itemHeight, opacity: transition(0.5, 1, 300, focused), transform: [{ scale: transition(0.8, 1.5, 300, focused) }] }]} >
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
        minWidth: "80%",
        overflow: 'hidden',
        backgroundColor: Color.ofWhite,
        borderRadius: Border.br_6xl
    },
    option: {
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    }
})