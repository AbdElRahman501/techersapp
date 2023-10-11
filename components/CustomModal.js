import React from "react";
import { Modal, Text, StyleSheet, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import t from "../actions/changeLanguage";

const CustomModal = ({ message, visible, buttonTitle, handleSubmit, onClose }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>{message}</Text>
                    <View style={{ width: "80%", flexDirection: "row" }}>
                        <PrimaryButton
                            style={[styles.button, { backgroundColor: Color.white, borderWidth: 1, borderColor: Color.darkcyan }]}
                            onPress={() => { onClose(), handleSubmit() }}>
                            <Text style={[styles.buttonText, { color: Color.darkcyan }]}>{buttonTitle}</Text>
                        </PrimaryButton>
                        <PrimaryButton style={styles.button} onPress={onClose}>
                            <Text style={styles.buttonText}>{t("ok")}</Text>
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
export default CustomModal;


