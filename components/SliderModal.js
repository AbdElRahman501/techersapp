import React, { useState } from 'react';
import { Modal, StyleSheet, Animated, View, TouchableOpacity, PanResponder } from 'react-native';
import { Border, Color, globalStyles, heightPercentage } from '../GlobalStyles'

export default function SliderModal({ children, visible, submitHandler, containerHeight }) {

    const [pan, setPan] = useState(new Animated.ValueXY());
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(e, gestureState);
            pan.setValue({ x: 0, y: Math.max(gestureState.dy, 0) });
        },
        onPanResponderRelease: (e, gestureState) => {
            if (gestureState.dy > containerHeight / 2) {
                setPan(new Animated.ValueXY())
                submitHandler()
            } else {
                Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
            }
        },
    });


    const animatedStyles = {
        transform: pan.getTranslateTransform(),
    };

    return (
        <Modal visible={visible} animationType="slide" transparent >
            <View style={[styles.container]}>
                <TouchableOpacity onPress={submitHandler}>
                    <View style={{ height: heightPercentage(100) - containerHeight }} />
                </TouchableOpacity>
                <Animated.View style={[styles.modal, animatedStyles, { minHeight: containerHeight }]} >
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: "center", height: 30 }} {...panResponder.panHandlers}>
                        {Array.from({ length: 3 }, (_, i) => i).map(x => (
                            <View key={x} style={[globalStyles.eventBall, { margin: 2, backgroundColor: Color.darkgray }]} />
                        ))}
                    </View>
                    {children}
                </Animated.View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modal: {
        backgroundColor: Color.white,
        borderTopLeftRadius: Border.br_13xl,
        borderTopRightRadius: Border.br_13xl,
        paddingHorizontal: 20,
        paddingBottom: 30
    },

})