import React from 'react';
import { View, Modal, ActivityIndicator, StyleSheet } from 'react-native';
import { Color } from '../GlobalStyles';

const LoadingModal = ({ visible }) => {
    return (
        <Modal transparent visible={visible === true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ActivityIndicator size="large" color={Color.darkcyan} />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
    modalContent: {
        padding: 20,
        borderRadius: 4,
    },
});

export default LoadingModal;