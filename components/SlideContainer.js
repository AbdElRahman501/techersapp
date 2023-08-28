import { StyleSheet, View, FlatList } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import { useSelector } from 'react-redux';

export default function SlideContainer({ data, children }) {
    const { language } = useSelector(state => state.languageState)

    const renderItem = useCallback(
        ({ item }) => {
            return React.cloneElement(children, { item })
        },
        []
    );

    const keyExtractor = useMemo(
        () => (item) => {
            return item.id;
        },
        []
    );
    return (
        <View style={styles.container}>
            <View style={{  width: "100%", overflow: "hidden" }}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    horizontal
                    pagingEnabled
                    inverted={language === 'ar'}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={null} // Turn off snapping
                    snapToAlignment="start" // Adjust alignment according to your needs
                    maxToRenderPerBatch={4}
                    removeClippedSubviews={true}
                    initialNumToRender={4}
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