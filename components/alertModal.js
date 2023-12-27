import React from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Color, globalStyles, widthPercentage } from "../GlobalStyles";
import t from "../actions/changeLanguage";
import { Feather } from '@expo/vector-icons';

const AlertModal = ({ title, content, visible, type, cancelable, secondaryButton, primaryButton, primaryButtonStyle, secondaryButtonSubmit, primaryButtonSubmit, children }) => {
    const ok = t("ok")
    const width = Math.max(widthPercentage(25), 140);


    const TheImage = (props) => {
        switch (props?.type) {
            case "success":
                return (
                    <View style={{ backgroundColor: Color.white, position: 'absolute', top: -(width / 2), width: width, height: width, alignSelf: 'center', justifyContent: 'center', borderRadius: width / 2 }}>
                        <Feather style={{ textAlign: 'center' }} name="check-circle" size={width - 40} color={Color.darkcyan} />
                    </View>
                )
            case "danger":
                return (
                    <View style={{ backgroundColor: Color.white, position: 'absolute', top: -(width / 2), width: width, height: width, alignSelf: 'center', justifyContent: 'center', borderRadius: width / 2 }}>
                        <Feather style={{ textAlign: 'center' }} name="x-circle" size={width - 40} color={Color.red} />
                    </View>
                )
            default:
                return (
                    <View style={{ backgroundColor: Color.white, position: 'absolute', top: -(width / 2), width: width, height: width, alignSelf: 'center', justifyContent: 'center', borderRadius: width / 2 }}>
                        <Image
                            source={require('../assets/icons/alert.png')}
                            style={{ width: width - 50, height: width - 50, alignSelf: 'center' }}
                            resizeMode="contain"
                        />
                    </View>
                )
        }
    }

    return (
        <Modal visible={visible === true} animationType="fade" transparent>
            <Pressable onPress={cancelable} style={globalStyles.modalContainer}>
                <View style={[globalStyles.modalContent, { paddingTop: width / 2 }]}>
                    <TheImage type={type} />
                    <Text style={[globalStyles.title, { marginBottom: 5 }]}>{title}</Text>
                    {content && <Text style={[globalStyles.contentText, { lineHeight: 25, width: "100%", textAlign: 'center', color: Color.darkgray }]}
                    >{content}</Text>}
                    {children}
                    <View style={{ width: "100%", gap: 15, flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                        {secondaryButton &&
                            <PrimaryButton
                                style={{ flex: 2, backgroundColor: Color.white, borderWidth: 1, borderColor: Color.gray_200 }}
                                onPress={secondaryButtonSubmit}>
                                <Text style={[globalStyles.contentText, { color: Color.gray_200 }]}>{secondaryButton}</Text>
                            </PrimaryButton>
                        }
                        {(primaryButton || !cancelable) && <PrimaryButton style={[{ flex: 2, maxWidth: "50%" }, primaryButtonStyle]} onPress={primaryButtonSubmit}>
                            <Text style={[globalStyles.contentText, { color: Color.white }]}>{primaryButton || ok}</Text>
                        </PrimaryButton>}
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

export default AlertModal;


