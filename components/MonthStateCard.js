import React, { useEffect } from 'react'
import { Text, StyleSheet, View, Pressable, Platform } from 'react-native'
import { Color, globalStyles } from '../GlobalStyles'
import t from '../actions/changeLanguage';
import ScoreBar from './ScoreBar';
import Animated, { FadeInDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
export default function MonthStateCard({ item, handlePress, selectedState, index }) {
    const isSelected = selectedState?.type ? selectedState.type === item.type : undefined
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    const scaleAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));
    const opacityAnimatedStyles = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    useEffect(() => {
        scale.value = withTiming(isSelected === undefined ? 1 : isSelected ? 1.15 : 0.75, { duration: 500 });
        opacity.value = withTiming(isSelected === undefined ? 1 : isSelected ? 1 : 0.6, { duration: 500 });
    }, [isSelected])

    return (
        <Animated.View style={scaleAnimatedStyles} entering={index >= 0 && FadeInDown.duration(400 + (index * 200))}  >
            <Pressable disabled={!handlePress} onPress={() => handlePress(item)}>
                <Animated.View style={[styles.subject, opacityAnimatedStyles]}>
                    <View>
                        <ScoreBar width={45} strokeWidth={5} score={item.score} totalNumber={item.totalNumber} state={item.state} />
                    </View>
                </Animated.View>
                <Text style={[globalStyles.contentText, { color: isSelected ? Color.darkcyan : Color.darkgray, textAlign: "center" }]}>{t(item.type)}</Text>
            </Pressable >
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    subject: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        padding: 5,
        marginBottom: 5,
        backgroundColor: Color.white,
        ...Platform.select({
            ios: {
                shadowColor: Color.black,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 7,
            },
            android: {
                elevation: 6,
            },
        }),
    }


})