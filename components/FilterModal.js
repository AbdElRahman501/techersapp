import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const FilterModal = ({ isVisible, onClose, onApply }) => {
    const [distance, setDistance] = useState('');
    const [subject, setSubject] = useState('');
    const [schedule, setSchedule] = useState('');

    const handleApplyFilter = () => {
        // Call the onApply function and pass the selected filter options
        onApply({ distance, subject, schedule });
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="slide">
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filter</Text>

                    <Text style={styles.label}>Distance:</Text>
                    {/* Distance filter input */}
                    {/* (e.g., TextInput or Dropdown) */}
                    <TextInput
                        style={styles.input}
                        value={distance}
                        onChangeText={setDistance}
                        placeholder="Enter distance"
                    />

                    <Text style={styles.label}>Subject:</Text>
                    {/* Subject filter input */}
                    {/* (e.g., TextInput or Dropdown) */}
                    <TextInput
                        style={styles.input}
                        value={subject}
                        onChangeText={setSubject}
                        placeholder="Enter subject"
                    />

                    <Text style={styles.label}>Schedule:</Text>
                    {/* Schedule filter input */}
                    {/* (e.g., TextInput or Dropdown) */}
                    <TextInput
                        style={styles.input}
                        value={schedule}
                        onChangeText={setSchedule}
                        placeholder="Enter schedule"
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleApplyFilter}>
                            <Text style={styles.buttonText}>Apply</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '45%',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default FilterModal;