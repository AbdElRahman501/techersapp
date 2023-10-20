import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    // an array of objects with name, latitude, and longitude properties
    let locations = [
        { name: "Traffic Square, Banha", latitude: 30.4625, longitude: 31.1847 },
        { name: "Banha University", latitude: 30.4556, longitude: 31.1781 },
        { name: "Rashed Line, Tabiah", latitude: 30.5072, longitude: 31.1564 },
        { name: "Moudiriet El-Tahrir St., Garden City", latitude: 30.4667, longitude: 31.1914 },
        { name: "saleh nour, Banha", latitude: 30.472829, longitude: 31.189432 },
    ];

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        let textArr = locations.map((item) => {
            let distance = getDistanceFromLatLonInKm(location.coords.latitude, location.coords.longitude, item.latitude, item.longitude)
            return `${item.name} : ${distance} m`
        })
        text = textArr.join('\n');
    }

    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = (R * c * 1000).toFixed(2); // Distance in km
        return distance;
    }

    return (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>{text}</Text>
        </View>
    );
}
