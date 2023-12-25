import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Color, heightPercentage, widthPercentage } from '../GlobalStyles';
import { Next_Icon } from '../assets/icons/Icons';
import { GestureHandlerRootView, State } from 'react-native-gesture-handler';
import AdItem from './AdItem';
import Indicator from './Indicator';
import { useSelector } from 'react-redux';

export default function AdsSlider({ data }) {
    const scrollViewRef = useRef(null);
    const [scrolledIndex, setScrolledIndex] = useState(0);
    const [holding, setHolding] = useState(false);
    const width = (widthPercentage(100) - 48);
    const { language } = useSelector(state => state.languageState)
    const { subjects } = useSelector(state => state.subjectsState)
    const scrollToNext = () => {
        if (scrolledIndex < data.length - 1) {
            scrollViewRef.current.scrollTo({ x: width * (scrolledIndex + 1), animated: true });
        }
        else {
            scrollViewRef.current.scrollTo({ x: 0, animated: "smooth" });
        }
    }
    const holdHandler = ({ nativeEvent }) => {
        if (nativeEvent.state === State.BEGAN) {
            setHolding(true);
        } else if (nativeEvent.state === State.END) {
            setHolding(false);
        }
    }

    const scrollToPrev = () => {
        if (scrolledIndex > 0) {
            scrollViewRef.current.scrollTo({ x: width * (scrolledIndex - 1), animated: true });
        }
        else {
            scrollViewRef.current.scrollTo({ x: width * (data.length), animated: false });

        }

    };

    const onScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(offsetX / (width - 2));
        setScrolledIndex(currentIndex);
    };

    useEffect(() => {
        let interval;
        if (!holding) {
            interval = setInterval(() => {
                scrollToNext()
            }, 5000);
        } else {
            setTimeout(() => {
                setHolding(false);
            }, 2500);
        }
        return () => clearInterval(interval);
    }, [scrolledIndex, holding]);


    return (
        <GestureHandlerRootView style={{ flex: 1, marginVertical: 10, backgroundColor: Color.cyanBackGround }}>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={scrollToPrev}>
                    <Next_Icon color={Color.darkcyan} style={{ transform: [{ rotate: '180deg' }] }} />
                </TouchableOpacity>
                <ScrollView
                    snapToInterval={width}
                    pagingEnabled={true}
                    disableIntervalMomentum={true}
                    scrollEventThrottle={16}
                    onScroll={onScroll}
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}>
                    {data.map((item) => {
                        return <AdItem item={item} language={language}
                            subjects={subjects} holdHandler={holdHandler} key={item.id} />
                    })}
                </ScrollView>
                <TouchableOpacity style={styles.button} onPress={scrollToNext}>
                    <Next_Icon color={Color.darkcyan} />
                </TouchableOpacity>
            </View>
            <View style={{ transform: [{ scale: 0.6 }], height: 10, width: widthPercentage(100), justifyContent: "flex-end", alignItems: "center" }}>
                <Indicator arr={data} activeIndex={scrolledIndex} />
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
    button: {
        width: 24,
        height: heightPercentage(20),
        justifyContent: 'center',
        alignItems: 'center',

    }

})