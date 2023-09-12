import React, { useEffect, useState } from "react";
import { Modal, Text, StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import { teachers } from "../data";
import { getTitle } from "../actions/GlobalFunctions";
import { useNavigation } from '@react-navigation/core';

const BookingModal = ({ myBookedHour, isBooked, onClose }) => {
    const [teacher, setTeacher] = useState()
    const navigation = useNavigation()

    useEffect(() => {
        if (myBookedHour?.id) {
            setTeacher(teachers.find(x => x.id === myBookedHour.id))
        }
    }, [myBookedHour?.id])
    const handleChangeDate = () => {
        if (teacher) {
            onClose()
            navigation.push("TeacherScreen", { item: teacher })
        }
    };
    return (
        <Modal visible={isBooked} animationType="fade" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>This time is already booked. by you for  {getTitle(teacher?.gender, teacher?.name)} class </Text>
                    <View style={{ width: "80%", flexDirection: "row" }}>
                        <PrimaryButton
                            style={[styles.button, { backgroundColor: Color.white, borderWidth: 1, borderColor: Color.darkcyan }]}
                            onPress={handleChangeDate}>
                            <Text style={[styles.buttonText, { color: Color.darkcyan }]}>Change</Text>
                        </PrimaryButton>
                        <PrimaryButton style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>OK</Text>
                        </PrimaryButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        maxWidth: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    modalText: {
        textAlign: "center",
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_base,
        marginBottom: 20,
    },
    button: {
        height: "auto",
        padding: 10,
        marginHorizontal: 10,
        width: "35%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
});
export default BookingModal;


