import { VirtualizedList, StyleSheet, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import ContainerTitle from './ContainerTitle'
import Subject from './Subject'
import TeacherCard from './TeacherCard';
import { useSelector } from 'react-redux';

export default function SlideContainer({ type, data, title, pressHandler, pressedTitle }) {
    const { language } = useSelector(state => state.languageState)



    const renderItem = useCallback(
        ({ item }) => {
            return type === 'Subject'
                ? <Subject item={item} />
                : <TeacherCard item={item} />
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
            <ContainerTitle title={title} pressedTitle={pressedTitle} pressHandler={pressHandler} />
            <View style={{ flex: 1, width: "100%", marginBottom: 20 , overflow: "hidden" }}>
                <VirtualizedList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    horizontal
                    pagingEnabled
                    inverted={language === 'ar'}
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={null} // Turn off snapping
                    snapToAlignment="start" // Adjust alignment according to your needs
                    getItemCount={() => data.length}
                    getItem={(data, index) => data[index]}
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
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})