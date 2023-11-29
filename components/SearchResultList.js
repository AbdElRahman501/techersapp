import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Border, Color, globalStyles, heightPercentage } from '../GlobalStyles';
import t from '../actions/changeLanguage';

const SearchResultList = ({ results, onItemPress, loading }) => {
    const noResultsText = t("no results found")
    return (
        <View style={{ backgroundColor: Color.white, padding: 10, borderRadius: Border.br_6xl, minHeight: heightPercentage(20), maxHeight: heightPercentage(25) }}>
            {loading ? <Text style={{ flex: 1, textAlign: "center", verticalAlign: "middle", width: "100%" }}><ActivityIndicator size="large" color={Color.darkcyan} /></Text> :
                results.length > 0 ?
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
                    /> :
                    <Text style={[globalStyles.contentText, { textAlign: "center", marginTop: 10 }]}>{noResultsText}</Text>
            }
        </View>
    );
};

export default SearchResultList;
