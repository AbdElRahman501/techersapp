import { Modal, StyleSheet, Animated, TouchableWithoutFeedback, View, TouchableOpacity, PanResponder } from 'react-native';
import { Border, Color, FontFamily, FontSize, Height, globalStyles, heightPercentage } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomText from './CustemText';
import SortingContainer from './SortingContainer';
const containerHeight = 300

export default function ListInput({ value, options, placeholder, changHandler, children, rightIcon }) {
    const { language } = useSelector(state => state.languageState);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState("")
    const submitHandler = () => {
        setIsFocused(false)
        changHandler(options[selectedOption])
    }

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
        <TouchableWithoutFeedback onPress={() => setIsFocused(!isFocused)} >
            <View

                style={[styles.inputField, {
                    borderColor: isFocused ? Color.darkcyan : Color.input_stroke,
                    flexDirection: language === "en" ? "row" : "row-reverse"
                }]}
            >
                <Modal visible={isFocused} animationType="slide" transparent >
                    <View style={[styles.container]}>
                        <TouchableOpacity onPress={submitHandler}>
                            <View style={{ height: heightPercentage(100) - containerHeight }} />
                        </TouchableOpacity>
                        <Animated.View style={[styles.modal, animatedStyles]} >
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: "center", height: 30 }} {...panResponder.panHandlers}>
                                {Array.from({ length: 3 }, (_, i) => i).map(x => (
                                    <View key={x} style={[globalStyles.eventBall, { margin: 2, backgroundColor: Color.darkgray }]} />
                                ))}
                            </View>
                            <SortingContainer height={containerHeight} sortingOptions={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} placeholder={placeholder} />
                        </Animated.View>
                    </View>
                </Modal>
                {
                    !children ?
                        <Ionicons style={styles.rightIcon} name={rightIcon} size={FontSize.size_xl}
                            color={isFocused ? Color.darkcyan : Color.darkgray} />
                        :
                        <View style={styles.rightIcon}>
                            {React.Children.map(children, (child) => {
                                return React.cloneElement(child, {
                                    width: FontSize.size_xl,
                                    height: FontSize.size_xl,
                                    viewBox: "0 0 24 24",
                                    color: isFocused ? Color.darkcyan : Color.darkgray
                                });
                            })}
                        </View>
                }


                <CustomText style={[styles.item, { flex: 1, color: value ? Color.black : Color.darkgray }]}>
                    {value || placeholder}
                </CustomText>

                {
                    value ?
                        < Ionicons style={styles.leftIcon} name={"checkmark"} size={FontSize.size_xl} color={Color.darkcyan} />
                        : <View style={styles.leftIcon}>

                        </View>
                }
            </View >
        </TouchableWithoutFeedback >
    );
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
        minHeight: containerHeight,
    },
    inputField: {
        width: "100%",
        maxWidth: 500,
        height: Height.hi_md,
        borderWidth: 1,
        borderColor: Color.input_stroke,
        backgroundColor: Color.input_fill,
        borderRadius: Border.br_6xl,
        marginTop: 18,
        alignItems: "center"
    },
    inputCove: {
        flex: 1,
        backgroundColor: Color.yellow,

    },
    item: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_md,
    },
    leftIcon: {
        textAlign: "center",
        width: Height.hi_md,
        justifyContent: "center",
        alignItems: "center"
    },
    rightIcon: {
        textAlign: "center",
        textAlignVertical: "center",
        width: Height.hi_md,
        height: Height.hi_md,
        justifyContent: "center",
        alignItems: "center"
    }

});
