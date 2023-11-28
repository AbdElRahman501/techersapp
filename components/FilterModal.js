import React, { useState, } from 'react';
import { View, Modal, StyleSheet, PanResponder, Animated, ScrollView } from 'react-native';
import { Border, Color, Height, globalStyles, heightPercentage } from '../GlobalStyles';
import SortingContainer from './SortingContainer';
import DistanceFilter from './DistanceFilter';
import DividerWithText from './DividerWithText ';
import SlideContainer from './SlideContainer';
import SubjectOptions from './SubjectOption';
import { useSelector } from 'react-redux';

const FilterModal = ({ isVisible, onClose, onApply }) => {

    const sortingOptions = ["Default", "A-Z", "Z-A", "Price: Low to High", "Price: High to Low"]
    const [selectedOption, setSelectedOption] = useState(0)
    const { subjects } = useSelector(state => state.subjectsState);


    const distances = [1000, 2000, 3000, 4000, 5000]
    const [selectedDistance, setSelectedDistance] = useState(1)


    const [selectedSubjects, setSelectedSubject] = useState([]);


    const [pan, setPan] = useState(new Animated.ValueXY());
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
            Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(e, gestureState);
            pan.setValue({ x: 0, y: Math.max(gestureState.dy, 0) });
        },
        onPanResponderRelease: (e, gestureState) => {
            if (gestureState.dy > heightPercentage(30)) {
                setPan(new Animated.ValueXY())
                onClose();
            } else {
                Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
            }
        },
    });
    const animatedStyles = {
        transform: pan.getTranslateTransform(),
    };


    return (
        <Modal visible={isVisible}
            // onRequestClose={onClose}
            animationType="slide" transparent>
            <Animated.View style={[styles.container]}>
                <Animated.View style={[styles.modal, animatedStyles]} >
                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: "center", height: 30 }} {...panResponder.panHandlers}>
                        {Array.from({ length: 3 }, (_, i) => i).map(x => (
                            <View key={x} style={[globalStyles.eventBall, { margin: 2, backgroundColor: Color.darkgray }]} />
                        ))}
                    </View>
                    <ScrollView contentContainerStyle={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                        <DividerWithText style={{ marginBottom: 20 }} />
                        <SortingContainer placeholder={"Sort By"} height={Height.hi_container} sortingOptions={sortingOptions} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
                        <DividerWithText style={{ marginVertical: 20 }} />
                        <DistanceFilter distances={distances} selectedDistance={selectedDistance} setSelectedDistance={setSelectedDistance} />
                        <DividerWithText style={{ marginVertical: 20 }} />
                        <SlideContainer data={subjects} selectedSubjects={selectedSubjects} setSelectedSubject={setSelectedSubject} >
                            <SubjectOptions />
                        </SlideContainer>
                        <DividerWithText style={{ marginVertical: 20 }} />

                    </ScrollView>
                </Animated.View>
            </Animated.View>
        </Modal >
    );
};

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
        minHeight: heightPercentage(95),
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default FilterModal;
