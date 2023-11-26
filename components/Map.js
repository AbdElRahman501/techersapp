import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getAddressFromCoordinates } from '../store/actions/deviceActions';
import { FontSize, globalStyles } from '../GlobalStyles';

const MapComponent = ({ selectedLocation, setSelectedLocation, setSelectedAddress }) => {
  const mapRef = useRef(null);

  const [mapRegion, setMapRegion] = useState({
    latitude: 30.4606,
    longitude: 31.1848,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
    getAddress(coordinate);
  };

  const getAddress = async (coordinate) => {
    setSelectedAddress(await getAddressFromCoordinates(coordinate));
  }

  const handleRegionChange = (newRegion) => {
    setMapRegion((prevRegion) => ({
      ...prevRegion,
      latitudeDelta: newRegion.latitudeDelta,
      longitudeDelta: newRegion.longitudeDelta,
    }));
  };

  useEffect(() => {
    mapRef.current.animateToRegion({
      ...selectedLocation || mapRegion,
      latitudeDelta: Math.min(0.0922, mapRegion.latitudeDelta),
      longitudeDelta: Math.min(0.0421, mapRegion.longitudeDelta),
    });

  }, [selectedLocation, mapRef])
  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={mapRegion}
        onRegionChange={handleRegionChange}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} title="Selected Location" />
        )}
        <Marker
          coordinate={{
            latitude: 30.9894199,
            longitude: 34.8569603,
          }}
          onCalloutPress={(e) => console.log(e)}
        >
          <Text style={[globalStyles.title, { fontSize: FontSize.size_xl, textShadowColor: 'white', textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 }]}>Palestine {'\n'} فلسطين</Text>
        </Marker>

      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;


const clicked = {
  "address": {
    "ISO3166-2-lvl4": "EG-KB",
    "city": "بنها",
    "country": "مصر",
    "country_code": "eg",
    "neighbourhood": "مساكن الموالح",
    "postcode": "13512",
    "road": "شارع مسجد عمر بن الخطاب",
    "state": "القليوبية"
  },
  "addresstype": "road",
  "boundingbox": [
    "30.4652968",
    "30.4660052",
    "31.1847547",
    "31.1891055"
  ],
  "class": "highway",
  "display_name": "شارع مسجد عمر بن الخطاب, مساكن الموالح, بنها, القليوبية, 13512, مصر",
  "importance": 0.10000999999999993,
  "lat": "30.4659611",
  "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
  "lon": "31.186106242239475",
  "name": "شارع مسجد عمر بن الخطاب",
  "osm_id": 730162620,
  "osm_type": "way",
  "place_id": 75093537,
  "place_rank": 26,
  "type": "residential"
} || {
  "address": {
    "ISO3166-2-lvl4": "EG-KB",
    "city": "بنها",
    "country": "مصر",
    "country_code": "eg",
    "house_number": "14",
    "postcode": "13512",
    "road": "شارع عبد الرحمن الفيشاوى",
    "state": "القليوبية"
  },
  "addresstype": "place",
  "boundingbox": [
    "30.4634905",
    "30.4635905",
    "31.1860900",
    "31.1861900"
  ],
  // "city":"Qism Banha",
  "class": "place",
  // "country":"Egypt",
  "display_name": "14, شارع عبد الرحمن الفيشاوى, بنها, القليوبية, 13512, مصر",
  // "governorate":"Al-Qalyubia Governorate",
  "importance": 0.00000999999999995449,
  "lat": "30.4635405",
  "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
  "lon": "31.18614",
  "name": "",
  "osm_id": 6858318635,
  "osm_type": "node",
  "place_id": 74150183,
  "place_rank": 30,
  "type": "house"
}

const gps = {
  "city": "Qism Banha",
  "display_name": "Egypt - Al-Qalyubia Governorate - Qism Banha - Al Masnaa Al Harbi",
  "governorate": "Al-Qalyubia Governorate",
  "lat": 30.4741299,
  "lon": 31.1904548
}


const searched = {
  "addresstype": "city",
  "boundingbox": [
    "30.3024974",
    "30.6224974",
    "31.0240630",
    "31.3440630"
  ],
  "class": "place",
  "display_name": "بنها, القليوبية, 13512, مصر",
  "importance": 0.4365661887350441,
  "lat": "30.4624974",
  "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
  "lon": "31.184063",
  "name": "بنها",
  "osm_id": 31353319,
  "osm_type": "node",
  "place_id": 74517196,
  "place_rank": 16,
  "type": "city"
}