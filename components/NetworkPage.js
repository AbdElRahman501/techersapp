import React from 'react';
import { View, Text } from 'react-native';
import { Color, globalStyles, heightPercentage } from '../GlobalStyles';
import PrimaryButton from './PrimaryButton';
import { useNavigation } from '@react-navigation/core';

const NetworkPage = ({ visible, item }) => {
    const navigation = useNavigation();

    return (
        <View style={[{ display: visible ? "flex" : "none", height: heightPercentage(100) - 20, justifyContent: "center", alignItems: "center" }]}>
            <Text style={globalStyles.title}>Whoops!</Text>
            <Text style={globalStyles.contentText}>Slow or no internet connection.</Text>
            <Text style={globalStyles.contentText}>Please try again later.</Text>
            <PrimaryButton style={{ width: "65%" , marginVertical: 18 }} onPress={() => navigation.replace("TeacherScreen", { item })} >
                <Text style={[globalStyles.regular, { color: Color.white }]}>Try Again</Text>
            </PrimaryButton>
        </View>
    );
};

export default NetworkPage;