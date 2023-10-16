import React from "react";
import { Modal, Text, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Color, globalStyles } from "../GlobalStyles";
import t from "../actions/changeLanguage";

const CustomModal = ({ message, visible, buttonTitle, handleSubmit, onClose }) => {
    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={globalStyles.modalContainer}>
                <View style={globalStyles.modalContent}>
                    <Text style={[globalStyles.title, { marginBottom: 30 }]}>{message}</Text>
                    <View style={{ width: "80%", gap: 10, flexDirection: "row" }}>
                        {buttonTitle &&
                            <PrimaryButton
                                style={{ flex: 2, backgroundColor: Color.white, borderWidth: 1, borderColor: Color.darkcyan }}
                                onPress={() => { onClose(), handleSubmit() }}>
                                <Text style={[globalStyles.title, { color: Color.darkcyan }]}>{buttonTitle}</Text>
                            </PrimaryButton>
                        }
                        <PrimaryButton style={{ flex: 2 }} onPress={onClose}>
                            <Text style={[globalStyles.title, { color: Color.white }]}>{t("ok")}</Text>
                        </PrimaryButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default CustomModal;


