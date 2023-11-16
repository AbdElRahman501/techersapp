import React from 'react';
import { View, Text } from 'react-native';
import { Color, globalStyles, heightPercentage } from '../GlobalStyles';
import PrimaryButton from './PrimaryButton';
import { useNavigation } from '@react-navigation/core';
import { LOST_CONNECTION_ICON } from '../assets/icons/Icons';
import t from '../actions/changeLanguage';

const NetworkPage = ({ visible, item, isConnected }) => {
    const navigation = useNavigation();

    const pressHandler = () => {
        if (isConnected) {
            navigation.replace("TeacherScreen", { item })
        }
    }
    return (
        <View style={[{ display: visible ? "flex" : "none", height: heightPercentage(100) - 20, justifyContent: "center", alignItems: "center" }]}>
            <LOST_CONNECTION_ICON />
            <Text style={[globalStyles.title, { marginTop: 30 }]}>{t("no connection title")}</Text>
            <Text style={[globalStyles.contentText, { marginVertical: 14, width: "65%", textAlign: "center", lineHeight: 24 }]}>
                {t("no connection description")}
            </Text>
            <PrimaryButton style={{ width: "65%", marginVertical: 14 }} onPress={pressHandler} >
                <Text style={[globalStyles.regular, { color: Color.white }]}>{t("try again")}</Text>
            </PrimaryButton>
        </View>
    );
};

export default NetworkPage;