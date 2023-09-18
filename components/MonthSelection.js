import React, { useRef, useCallback, useMemo, useState } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native'
import { Color, globalStyles, widthPercentage } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { Next_Icon } from '../assets/icons/Icons'

export default function MonthSelection() {
    const { language } = useSelector(state => state.languageState)
    const [scrolledIndex, setScrolledIndex] = useState(0);
    const data = ["يناير", "فبراير", "مارس"]
    const flatListRef = useRef(null);

    const renderItem = useCallback(
        ({ item }) => {
            return <View style={{ width: widthPercentage(100) - 200, height: "100%" }}>
                <Text style={globalStyles.title}>{item}</Text>
            </View>
        }
    )

    const keyExtractor = useMemo(
        (item, index) => {
            return index
        }
    )
    const scrollToNext = () => {
        if (scrolledIndex < data.length - 1) {
            flatListRef.current.scrollToIndex({
                index: scrolledIndex + 1,
                animated: "smooth"
            });
        }

    };

    const scrollToPrev = () => {
        if (scrolledIndex > 0) {
            flatListRef.current.scrollToIndex({
                index: scrolledIndex - 1,
                animated: "smooth"
            });
        }

    };



    const onScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(offsetX / (widthPercentage(100) - 201));
        setScrolledIndex(currentIndex);
    };
    return (
        <View style={[styles.sliderContainer]}>
            <TouchableOpacity style={[styles.button, { paddingBottom: 10, marginLeft: 50 }]} onPress={scrollToPrev}>
                <Next_Icon width={24} height={24} color={Color.darkcyan} style={{ transform: [{ rotate: '180deg' }] }} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    onScroll={onScroll}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    horizontal
                    pagingEnabled
                    inverted={language === 'ar'}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={null}
                    snapToAlignment="start"

                />
            </View>
            <TouchableOpacity style={[styles.button, { paddingTop: 10, marginRight: 50 }]} onPress={scrollToNext}>
                <Next_Icon width={24} height={24} color={Color.darkcyan} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    sliderContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    button: {
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    }
})