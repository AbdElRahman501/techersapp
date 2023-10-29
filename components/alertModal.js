import React from "react";
import { Image, Modal, Text, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import { Color, FontSize, globalStyles, widthPercentage } from "../GlobalStyles";
import t from "../actions/changeLanguage";

const AlertModal = ({ title, content, visible, imageSource, secondaryButton, primaryButton, primaryButtonStyle, secondaryButtonSubmit, primaryButtonSubmit, children }) => {
    const ok = t("ok")
    const width = widthPercentage(25)
    return (
        <Modal visible={visible === true} animationType="fade" transparent>
            <View style={globalStyles.modalContainer}>
                <View style={[globalStyles.modalContent, { paddingTop: width / 2 }]}>
                    {imageSource && <View style={{ backgroundColor: Color.white, position: 'absolute', top: -(width / 2), width: width, height: width, alignSelf: 'center', justifyContent: 'center', borderRadius: width / 2 }}>
                        <Image
                            source={imageSource}
                            style={{ width: width - 50, height: width - 50, alignSelf: 'center' }}
                            resizeMode="contain"
                        />
                    </View>}
                    <Text style={[globalStyles.title, { marginBottom: 5 }]}>{title}</Text>
                    {content && <Text style={[globalStyles.contentText, { lineHeight: 30, width: "100%", textAlign: 'center', color: Color.darkgray }]}
                    >{content}</Text>}
                    {children}
                    <View style={{ width: "80%", gap: 15, flexDirection: "row", marginTop: 20 }}>
                        {secondaryButton &&
                            <PrimaryButton
                                style={{ flex: 2, backgroundColor: Color.white, borderWidth: 1, borderColor: Color.darkcyan }}
                                onPress={secondaryButtonSubmit}>
                                <Text style={[globalStyles.contentText, { color: Color.darkcyan }]}>{secondaryButton}</Text>
                            </PrimaryButton>
                        }
                        <PrimaryButton style={[{ flex: 2 }, primaryButtonStyle]} onPress={primaryButtonSubmit}>
                            <Text style={[globalStyles.contentText, { color: Color.white }]}>{primaryButton || ok}</Text>
                        </PrimaryButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AlertModal;


