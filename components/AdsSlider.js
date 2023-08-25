import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, VirtualizedList } from 'react-native';
import { Color, FontFamily, FontSize, heightPercentage, widthPercentage } from '../GlobalStyles';
import { Next_Icon } from '../assets/icons/Icons';
import { GestureHandlerRootView, State } from 'react-native-gesture-handler';
import AdItem from './AdItem';
import { teachers } from '../data';

export default function AdsSlider() {
    const flatListRef = useRef(null);
    const [scrolledIndex, setScrolledIndex] = useState(0);
    const [holding, setHolding] = useState(false);

    const scrollToNext = () => {
        if (scrolledIndex < teachers.length - 1) {
            flatListRef.current.scrollToIndex({
                index: scrolledIndex + 1,
                animated: "smooth"
            });
        } else {
            flatListRef.current.scrollToIndex({
                index: 0,
                animated: false,
            });
        }

    };
    const holdHandler = ({ nativeEvent }) => {
        if (nativeEvent.state === State.BEGAN) {
            setHolding(true);
        } else if (nativeEvent.state === State.END) {
            setHolding(false);
        }
    }

    const scrollToPrev = () => {
        if (scrolledIndex > 0) {
            flatListRef.current.scrollToIndex({
                index: scrolledIndex - 1,
                animated: "smooth"
            });
        } else {
            flatListRef.current.scrollToIndex({
                index: teachers.length - 1,
                animated: false
            });
        }

    };
    const renderItem = useCallback(
        ({ item }) => {
            return <AdItem item={item} holdHandler={holdHandler} />;
        },
        []
    );
    const keyExtractor = useMemo(
        () => (item) => {
            return item.id;
        },
        []
    );

    const onScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(offsetX / (widthPercentage(100) - 49));
        setScrolledIndex(currentIndex);
    };


    useEffect(() => {
        let interval;
        if (!holding) {
            interval = setInterval(() => {
                scrollToNext()
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [scrolledIndex, holding]);
    return (
        <GestureHandlerRootView style={{ flex: 1, marginVertical: 24, backgroundColor: Color.cyanBackGround }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={scrollToPrev}>
                    <Next_Icon color={Color.darkcyan} style={{ transform: [{ rotate: '180deg' }] }} />
                </TouchableOpacity>
                <View style={{ flex: 1, width: widthPercentage(100) - 48 }}>
                    <VirtualizedList
                        ref={flatListRef}
                        data={teachers}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        horizontal
                        onScrollToIndexFailed={() => { }}
                        pagingEnabled
                        onScroll={onScroll}
                        showsHorizontalScrollIndicator={false}
                        getItemCount={() => teachers.length}
                        getItem={(data, index) => data[index]}
                        maxToRenderPerBatch={2}
                        removeClippedSubviews={true}
                        initialNumToRender={2}
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={scrollToNext}>
                    <Next_Icon color={Color.darkcyan} />
                </TouchableOpacity>
            </View>
        </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({
    container: {
        width: widthPercentage(100),
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    itemContainer: {
        width: widthPercentage(100) - 48,
        height: heightPercentage(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 24,
        height: heightPercentage(20),
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    },
    content: {
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic,
        color: Color.gray_200
    },
    primaryButton: {
        marginTop: 10,
        height: 30,
        width: 100,
        backgroundColor: Color.darkcyan,
        borderRadius: 12,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    }
    , primaryButtonText: {
        color: Color.white,
        fontSize: FontSize.size_base,
        fontFamily: FontFamily.montserratArabic
    }
})