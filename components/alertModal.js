import React from "react";
import { Image, Modal, Text, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Color, FontSize, globalStyles } from "../GlobalStyles";
import t from "../actions/changeLanguage";

const AlertModal = ({ title, content, visible, imageSource, secondaryButton, primaryButton, primaryButtonStyle, secondaryButtonSubmit, primaryButtonSubmit, children }) => {
    const ok = t("ok")
    return (
        <Modal visible={visible} animationType="fade" transparent>
            <View style={globalStyles.modalContainer}>
                <View style={[globalStyles.modalContent, { paddingTop: 75 }]}>
                    {imageSource && <View style={{ backgroundColor: Color.white, position: 'absolute', top: -75, width: 150, height: 150, alignSelf: 'center', justifyContent: 'center', borderRadius: 75 }}>
                        <Image
                            source={imageSource}
                            style={{ width: 100, height: 100, alignSelf: 'center' }}
                            resizeMode="contain"
                        />
                    </View>}
                    <Text style={[globalStyles.title, { fontSize: FontSize.size_xl, marginBottom: 5 }]}>{title}</Text>
                    {content && <Text style={[globalStyles.regular, { lineHeight: 30, maxWidth: 300, textAlign: 'center', color: Color.darkgray }]}
                    >{content}</Text>}
                    {children}
                    <View style={{ width: "80%", gap: 15, flexDirection: "row", marginTop: 20 }}>
                        {secondaryButton &&
                            <PrimaryButton
                                style={{ flex: 2, backgroundColor: Color.white, borderWidth: 1, borderColor: Color.darkcyan }}
                                onPress={secondaryButtonSubmit}>
                                <Text style={[globalStyles.title, { color: Color.darkcyan }]}>{secondaryButton}</Text>
                            </PrimaryButton>
                        }
                        <PrimaryButton style={[{ flex: 2 }, primaryButtonStyle]} onPress={primaryButtonSubmit}>
                            <Text style={[globalStyles.title, { color: Color.white }]}>{primaryButton || ok}</Text>
                        </PrimaryButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AlertModal;


