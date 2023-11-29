import React, { useEffect, useState } from 'react';
import { View, Text, Modal } from 'react-native';
import { Color, globalStyles, heightPercentage } from '../GlobalStyles';
import PrimaryButton from './PrimaryButton';
import { LOST_CONNECTION_ICON } from '../assets/icons/Icons';
import NetInfo from '@react-native-community/netinfo';
import t from '../actions/changeLanguage';
import BackHeader from './BackHeader';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const NetworkPage = ({ title, visible }) => {
    const navigation = useNavigation();
    const navigationState = useNavigationState(state => state);

    const [modalVisible, setModalVisible] = useState(false);
    const [currentRoute, setCurrentRoute] = useState([]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => { setModalVisible(!state.isConnected); });
        return () => { unsubscribe(); };
    }, []);

    const pressHandler = () => {
        navigation.goBack();
    }
    const refreshHandler = () => {
        if (currentRoute && !modalVisible) {
            navigation.replace(currentRoute.name, currentRoute.params);
        }
    }

    useEffect(() => {
        let lastRoute = navigationState.routes
        lastRoute = lastRoute[lastRoute.length - 1];
        setCurrentRoute(lastRoute);
    }, [navigationState]);
    return (
        <Modal visible={modalVisible && visible} animationType="fade" onRequestClose={pressHandler} >
            <BackHeader onPressHandler={pressHandler} title={title} />
            <View style={[{ height: heightPercentage(100) - 20, justifyContent: "center", alignItems: "center" }]}>
                <LOST_CONNECTION_ICON />
                <Text style={[globalStyles.title, { marginTop: 30 }]}>{t("no connection title")}</Text>
                <Text style={[globalStyles.contentText, { marginVertical: 14, width: "65%", textAlign: "center", lineHeight: 24 }]}>
                    {t("no connection description")}
                </Text>
                <PrimaryButton style={{ width: "65%", marginVertical: 14 }} onPress={refreshHandler} >
                    <Text style={[globalStyles.regular, { color: Color.white }]}>{t("try again")}</Text>
                </PrimaryButton>
            </View>
        </Modal>

    );
};

export default NetworkPage;