import React, { useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Color, FontFamily, FontSize, Padding, heightPercentage } from "../GlobalStyles";
import BackHeader from "../components/BackHeader";
import SearchResults from "../components/SearchResults";
import SearchBar from "../components/SearchBar";
import FilterButton from "../components/FilterButton";
import { useSelector } from "react-redux";
const SearchScreen = ({ route }) => {
    const subject = route?.params?.subject;
    const { language } = useSelector(state => state.languageState);
    const [value, setValue] = useState(subject?.[language] || "");
    const [filter, setFilter] = useState({});

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.white }} >
            <BackHeader />
            <View style={{ flexDirection: "row", paddingHorizontal: Padding.page_p, gap: 20, width: "100%" }} >
                <SearchBar autoFocus={true} value={value} changHandler={(e) => setValue(e)} />
                <FilterButton filter={filter} setFilter={setFilter} />
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView style={{ flex: 1 , marginTop: 10}}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <SearchResults value={value} filter={filter} />
                </ScrollView>
            </TouchableWithoutFeedback>

        </SafeAreaView>


    );
};

export default SearchScreen;


