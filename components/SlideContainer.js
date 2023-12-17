import { StyleSheet, View, FlatList } from 'react-native'
import React, { useCallback, useRef, useMemo } from 'react'
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function SlideContainer(props) {
    const { scrollAnimation, data, children, FlatListStyles } = props
    const { language } = useSelector(state => state.languageState)
    const flatListRef = useRef(null);

    const renderItem = useCallback(
        ({ item, index }) => {
            return React.cloneElement(children, { item, index, ...props })
        },
        [props]
    );

    const keyExtractor = useMemo(
        () => (item, index) => {
            return index
        },
        []
    );
    const scrollToNext = (offset) => {
        if (flatListRef?.current) {
            flatListRef.current.scrollToOffset({
                offset,
                animated: "smooth"
            });
        }
    };

    useEffect(() => {
        if (scrollAnimation) {
            setTimeout(() => {
                scrollToNext(30)
                setTimeout(() => {
                    scrollToNext(0)
                    setTimeout(() => {
                        scrollToNext(30)
                        setTimeout(() => {
                            scrollToNext(0)
                        }, 300)
                    }, 200)
                }, 200)
            }, 5000)

        }
    }, [])
    return (
        <View style={styles.container}>
            <View style={{ width: "100%", overflow: "hidden" }}>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={FlatListStyles}
                    horizontal
                    pagingEnabled
                    inverted={language === 'ar'}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={null} // Turn off snapping
                    snapToAlignment="start" // Adjust alignment according to your needs
                // maxToRenderPerBatch={7}
                // removeClippedSubviews={true}
                // initialNumToRender={7}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})