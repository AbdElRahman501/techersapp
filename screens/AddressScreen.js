import { Text, View, TouchableWithoutFeedback, Keyboard, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Axios from 'axios';
import { Color, globalStyles } from '../GlobalStyles'
import BackHeader from '../components/BackHeader'
import { GPS_Mark_Svg } from '../assets/icons/Icons';
import MapComponent from '../components/Map';
import SearchBar from "../components/SearchBar";
import { LOCATION_URL } from '../store/actions/api';
import SearchResultList from '../components/SearchResultList';
import LoadingModal from '../components/LoadingModal';
import { getAddressFromCoordinates, getLocation } from '../store/actions/deviceActions';
import PrimaryButton from '../components/PrimaryButton';
import { useNavigation } from '@react-navigation/core';
import t from '../actions/changeLanguage';


export default function AddressScreen({ route }) {
    const { signUpData } = route.params;
    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLocationLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [results, setResults] = useState([]);
    const [resultsVisible, setResultsVisible] = useState(false);
    const [address, setAddress] = useState(null);
    const navigation = useNavigation();
    const [Submit, pickAddress] = [t("submit"), t("pick your address")]

    const handleChange = async (query) => {
        setValue(query)
        setAddress(null);
        setSelectedLocation(null);
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
        setValue(location.display_name);
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
        handleItemPress(await getLocation())
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
                <LoadingModal visible={locationLoading} />
                <View style={globalStyles.bodyContainer} >
                    <View style={{ width: "100%", flex: 1, position: "absolute", zIndex: 99999, top: 24 }}>
                        <SearchBar value={value} changHandler={handleChange} />
                        {resultsVisible && <SearchResultList results={results} onItemPress={handleItemPress} loading={loading} />}
                    </View>
                    <TouchableOpacity onPress={gpsHandler}
                        style={[globalStyles.shadowBox, { position: "absolute", zIndex: 99999, bottom: 24, right: 24, padding: 15, backgroundColor: Color.white, borderRadius: 25 }]} >
                        <GPS_Mark_Svg width={24} height={24} color={address?.gps ? Color.darkcyan : Color.gray} />
                    </TouchableOpacity>
                    <PrimaryButton onPress={submitHandler}
                        style={{ width: "80%", flexDirection: "column", opacity: (address && value) ? 1 : 0.7, position: "absolute", zIndex: 99999, bottom: 24, left: 24, }}
                        disabled={!address || !value} >
                        <Text style={[globalStyles.title, { color: Color.white }]}>{(address && value) ? Submit : pickAddress}</Text>
                    </PrimaryButton>
                    <TouchableWithoutFeedback onPress={() => setResultsVisible(false)}>
                        <MapComponent selectedLocation={selectedLocation} setSelectedAddress={(data) => { setValue(data.display_name), setAddress(data) }} setSelectedLocation={setSelectedLocation} />
                    </TouchableWithoutFeedback>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback >
    )
}