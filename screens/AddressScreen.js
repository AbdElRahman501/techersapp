import { Text, View, TouchableWithoutFeedback, Keyboard, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import Axios from 'axios';
import { Color, FontSize, globalStyles } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import { Address_Mark_Svg, GPS_Mark_Svg } from '../assets/icons/Icons';
import MapComponent from '../components/Map';
import SearchBar from "../components/SearchBar";
import { LOCATION_URL } from '../store/actions/api';
import SearchResultList from '../components/SearchResultList';
import { getAddressFromCoordinates, getLocation } from '../store/actions/deviceActions';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/core';
import t from '../actions/changeLanguage';
import CustomText from '../components/CustemText';
import DividerWithText from '../components/DividerWithText ';
import { useSelector } from 'react-redux';

export default function AddressScreen({ route }) {
    const { signUpData } = route.params;
    const { language } = useSelector(state => state.languageState);
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [results, setResults] = useState([]);
    const [resultsVisible, setResultsVisible] = useState(false);
    const [address, setAddress] = useState(null);
    const navigation = useNavigation();
    const [confirmAddress, pickAddress] = [t("confirm your address"), t("pick your address")]

    const handleChange = async (query) => {
        setValue(query)
        if (query.length > 2) {
            setResultsVisible(true);
            setLoading(true);
            setResults([]);
            try {
                const { data } = await Axios.get(LOCATION_URL + query);
                if (data?.length > 0) {
                    setResults(data);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        } else {
            setResultsVisible(false);

        }
    };

    const handleItemPress = async (location) => {
        if (!location) return
        setValue("");
        setResultsVisible(false);
        const coordinate = {
            latitude: Number(location.lat),
            longitude: Number(location.lon),
        }
        setSelectedLocation(coordinate);
        setLocationLoading(true);
        const currentAddress = location.gps ? location : await getAddressFromCoordinates(coordinate)
        setLocationLoading(false);
        setAddress(currentAddress);
    };

    const gpsHandler = async () => {
        setLocationLoading(true);
        const myAddress = await getLocation();
        if (myAddress) {
            handleItemPress(myAddress);
        }
        setLocationLoading(false);
    }

    const submitHandler = () => {
        if (address) {
            if (signUpData.role === "teacher") {
                navigation.navigate("TeacherDataScreen", { signUpData: { ...signUpData, address } })
            } else {
                navigation.navigate("UserDataScreen", { signUpData: { ...signUpData, address } })
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }}>
                <BackHeader title={t("my address")} />
                <View style={globalStyles.bodyContainer} >
                    <View style={{ width: "100%", flex: 1, position: "absolute", zIndex: 99999, top: 24 }}>
                        <SearchBar value={value} changHandler={handleChange} />
                        {resultsVisible && <SearchResultList results={results} onItemPress={handleItemPress} loading={loading} />}
                    </View>
                    <View style={{ position: "absolute", zIndex: 99999, bottom: 24, gap: 10, width: "100%" }}>
                        {(address?.display_name || locationLoading) && <View style={{ width: "100%", borderRadius: 25, backgroundColor: Color.white, padding: 15 }}>
                            <CustomText style={[globalStyles.regular]}>{confirmAddress}</CustomText>
                            <DividerWithText />
                            <View style={[{ flexDirection: language === "en" ? "row" : "row-reverse", gap: 10, alignItems: "center" }]}>
                                <Address_Mark_Svg width={24} height={24} color={Color.red} />
                                {locationLoading
                                    ? <Text style={{ flex: 1, textAlign: "center", width: "100%" }}> <ActivityIndicator size="small" color={Color.red} /></Text>
                                    : <CustomText style={[globalStyles.contentText, { alignItems: 'center', flex: 1 }]}>{address?.display_name || ""}</CustomText>
                                }
                            </View>
                        </View>}
                        <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
                            <PrimaryButton onPress={submitHandler}
                                style={{ flex: 1, flexDirection: "column", opacity: address ? 1 : 0.7 }}
                                disabled={!address} >
                                <Text style={[globalStyles.title, { color: Color.white }]}>{address ? confirmAddress : pickAddress}</Text>
                            </PrimaryButton>
                            <TouchableOpacity onPress={gpsHandler}
                                style={[globalStyles.shadowBox, { padding: 15, backgroundColor: Color.white, borderRadius: 25 }]} >
                                <GPS_Mark_Svg width={24} height={24} color={address?.gps ? Color.darkcyan : Color.gray} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback onPress={() => setResultsVisible(false)}>
                        <MapComponent setLocationLoading={setLocationLoading} selectedLocation={selectedLocation} setSelectedAddress={(data) => { setAddress(data) }} setSelectedLocation={setSelectedLocation} />
                    </TouchableWithoutFeedback>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback >
    )
}