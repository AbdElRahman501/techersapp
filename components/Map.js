import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getAddressFromCoordinates } from '../store/actions/deviceActions';
import { FontSize, globalStyles } from '../GlobalStyles';

const MapComponent = ({ selectedLocation, setLocationLoading, setSelectedLocation, setSelectedAddress }) => {
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
    setLocationLoading(true);
    setSelectedAddress(await getAddressFromCoordinates(coordinate));
    setLocationLoading(false);
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