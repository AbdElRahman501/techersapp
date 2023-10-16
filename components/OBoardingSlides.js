import React, { useRef, useState, useCallback, useMemo } from 'react';
import { View, StyleSheet, Text, VirtualizedList } from 'react-native';
import { Color, FontFamily, FontSize, Height, Margin, Padding, widthPercentage } from '../GlobalStyles';
import { info } from '../data';
import OnboardSlide from './OnboardSlide';
import PrimaryButton from './PrimaryButton';
import { Ionicons } from '@expo/vector-icons';
import Indicator from './Indicator';
import { useNavigation } from "@react-navigation/native";
import t from '../actions/changeLanguage';

export default function OBoardingSlides({ setLastSlide }) {
    const flatListRef = useRef(null);
    const [scrolledIndex, setScrolledIndex] = useState(0);
    const navigation = useNavigation();
    const start = t("start")

    const scrollToNext = () => {
        if (scrolledIndex < info.length - 1) {
            flatListRef.current.scrollToIndex({
                index: scrolledIndex + 1,
                animated: "smooth"
            });
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'SignUpOptions' }],
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
    const renderItem = useCallback(
        ({ item }) => {
            return <OnboardSlide item={item} />;
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
        const currentIndex = Math.floor(offsetX / (widthPercentage(100) - 5));
        setLastSlide(currentIndex === info.length - 1);
        setScrolledIndex(currentIndex);
    };

    return (
        <View style={styles.container}>

            <View style={{ flex: 1, width: widthPercentage(100) }}>
                <VirtualizedList
                    ref={flatListRef}
                    data={info}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    horizontal
                    onScrollToIndexFailed={() => { }}
                    pagingEnabled
                    onScroll={onScroll}
                    showsHorizontalScrollIndicator={false}
                    getItemCount={() => info.length}
                    getItem={(data, index) => data[index]}
                    maxToRenderPerBatch={2}
                    removeClippedSubviews={true}
                    initialNumToRender={2}
                />
            </View>
            <View style={styles.flexContainer} >
                {scrolledIndex !== info.length - 1 && <Indicator arr={info} activeIndex={scrolledIndex} />}
                <View style={{ flexDirection: 'row' }}>
                    {scrolledIndex > 0 &&
                        <PrimaryButton style={[styles.button, styles.secButton]} onPress={scrollToPrev} >
                            <Ionicons name="arrow-forward" size={24} style={{ transform: [{ rotate: '180deg' }] }}
                                color={Color.darkcyan} />
                        </PrimaryButton>
                    }
                    <PrimaryButton style={[styles.button, scrolledIndex === info.length - 1 && styles.flex, { marginLeft: Margin.m_m1 }]} onPress={scrollToNext} >
                        {scrolledIndex === info.length - 1
                            ? <Text style={styles.title} >{start}</Text>
                            : <Ionicons name="arrow-forward" size={24} color={Color.white} />
                        }
                    </PrimaryButton>

                </View>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: Padding.page_p,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    flexContainer: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Padding.p_xl
    },
    button: {
        width: Height.hi_md,
        height: Height.hi_md,
        borderRadius: Height.hi_md / 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    secButton: {
        backgroundColor: Color.white,
        borderColor: Color.darkcyan,
        borderWidth: 1
    },
    flex: {
        flex: 1
    },
    title: {
        fontSize: FontSize.size_xl,
        fontFamily: FontFamily.montserratArabic,
        color: Color.white
    }

})