import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Border, Color, globalStyles, heightPercentage } from '../GlobalStyles';

const SearchResultList = ({ results, onItemPress, loading }) => {
    return (
        <View style={{ backgroundColor: Color.white, padding: 10, borderRadius: Border.br_6xl, minHeight: heightPercentage(20), maxHeight: heightPercentage(25) }}>
            {loading ? <ActivityIndicator size="large" color={Color.darkcyan} /> :
                <FlatList
                    data={results}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => onItemPress(item)}>
                            <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#cccccc' }}>
                                <Text style={globalStyles.contentText}>{`${item.display_name}`}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            }
        </View>
    );
};

export default SearchResultList;
