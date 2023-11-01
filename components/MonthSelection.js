import React, { useRef, useCallback, useMemo, useState, useEffect } from 'react'
import { StyleSheet, TouchableOpacity, Text, View, FlatList } from 'react-native'
import { Color, Margin, globalStyles, widthPercentage } from '../GlobalStyles'
import { useSelector } from 'react-redux'
import { Next_Icon } from '../assets/icons/Icons'

export default function MonthSelection({ selectedMonth, months, currentMonth, setMonth }) {
    const { language } = useSelector(state => state.languageState)
    const [scrolledIndex, setScrolledIndex] = useState(1);
    const flatListRef = useRef(null);

    const renderItem = useCallback(
        ({ item }) => {
            return <View style={{ width: widthPercentage(100) - 200, height: "100%" }}>
                <Text style={[globalStyles.title, {
                    color: currentMonth.id === item.id ? Color.darkcyan : Color.black
                }]}>{item[language]}</Text>
            </View>
        }
    )

    const keyExtractor = useMemo(
        (item, index) => {
            return index
        }
    )
    const scrollToNext = () => {
        if (scrolledIndex < months.length - 1) {
            setScrolledIndex(scrolledIndex + 1);
            setMonth(months[scrolledIndex + 1]);
            flatListRef.current.scrollToIndex({
                index: scrolledIndex + 1,
                animated: "smooth"
            });
        }

    };

    const scrollToPrev = () => {
        if (scrolledIndex > 0) {
            setScrolledIndex(scrolledIndex - 1);
            setMonth(months[scrolledIndex - 1]);
            flatListRef.current.scrollToIndex({
                index: scrolledIndex - 1,
                animated: "smooth"
            });
        }

    };


    useEffect(() => {
        let index = months.map(x => x.id).indexOf(selectedMonth.id)
        if (index >= 0 && index < months.length) {
            setScrolledIndex(index)
            flatListRef.current.scrollToIndex({
                index: index,
                animated: "smooth"
            });
        }
    }, [selectedMonth])


    useEffect(() => {
        flatListRef.current.scrollToIndex({
            index: scrolledIndex,
            animated: false,
        });
    }, []);

    const getItemLayout = (data, index) => ({
        length: (widthPercentage(100) - 200), // Replace with the actual height of each month item
        offset: (widthPercentage(100) - 200) * index,
        index,
    });

    return (
        <View style={[styles.sliderContainer, { marginTop: Margin.m_sm, flexDirection: language === 'ar' ? 'row-reverse' : 'row' }]}>
            <TouchableOpacity style={[styles.button, { marginHorizontal: 25 }]} disabled={scrolledIndex < months.length - 1} onPress={scrollToPrev}>
                <Next_Icon width={24} height={24} color={scrolledIndex < months.length - 1 ? Color.darkgray : Color.darkcyan} style={{ transform: [{ scaleX: language === 'ar' ? 1 : -1 }] }} />
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    data={months}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    horizontal
                    pagingEnabled
                    inverted={language === 'ar'}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={null}
                    getItemLayout={getItemLayout}
                    initialScrollIndex={scrolledIndex}
                    snapToAlignment="start"
                    scrollEnabled={false}

                />
            </View>
            <TouchableOpacity style={[styles.button, { marginHorizontal: 25 }]} disabled={scrolledIndex > 0} onPress={scrollToNext}>
                <Next_Icon width={24} height={24} color={scrolledIndex > 0 ? Color.darkgray : Color.darkcyan} style={{ transform: [{ scaleX: language === 'ar' ? -1 : 1 }] }} />
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