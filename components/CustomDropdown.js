import React, { useState, useRef } from 'react';
import { View, Animated, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Color, Height, widthPercentage } from '../GlobalStyles';

const CustomDropdown = ({ data, selectedItem, onSelect, children, height, style }) => {
    const [isPickerOpen, setPickerOpen] = useState(false);
    const animatedHeight = useRef(new Animated.Value(0)).current;

    const togglePicker = () => {
        if (isPickerOpen) {
            Animated.timing(animatedHeight, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }).start(() => setPickerOpen(false));
        } else {
            setPickerOpen(true);
            const maxHeight = Math.min(data.length * Height.teacher_tap, height); // Limit the height to 100
            Animated.timing(animatedHeight, {
                toValue: maxHeight,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
    };

    const handleItemPress = item => {
        onSelect(item);
        togglePicker();
    };
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)}>
            {React.cloneElement(children, { item })}
        </TouchableOpacity>
    );

    return (
        <View style={[styles.container]}>
            {React.cloneElement(children, { item: selectedItem, togglePicker, isSelected: true })}
            <View style={{ width: widthPercentage(100) }}>
                <Animated.View style={[styles.picker, { height: animatedHeight }]}>
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        style={style}
                    // nestedScrollEnabled 
                    />
                </Animated.View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 900,

    },

    picker: {
        overflow: 'hidden',
    }

});

export default CustomDropdown;
