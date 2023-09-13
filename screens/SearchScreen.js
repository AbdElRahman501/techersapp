import React, { useState } from "react";
import { Keyboard, SafeAreaView, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { Color, FontFamily, FontSize } from "../GlobalStyles";
import BackHeader from "../components/BackHeader";
import SearchResults from "../components/SearchResults";
import SearchBar from "../components/SearchBar";
const SearchScreen = ({ }) => {
    const [value, setValue] = useState("");
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <SafeAreaView style={[styles.container]} >
                <BackHeader/>
                <SearchBar autoFocus={true} value={value} changHandler={(e) => setValue(e)} />

                <ScrollView style={{ flex: 1, backgroundColor: Color.white }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.modalContainer}>
                        <SearchResults value={value} />
                    </View>
                </ScrollView>
            </SafeAreaView>

        </TouchableWithoutFeedback>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        flex: 1,
        alignItems: "center",
        backgroundColor: Color.white,
    },
    modalContent: {
        maxWidth: "80%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 35,
        alignItems: "center",
        justifyContent: "center",
    },
    modalText: {
        textAlign: "center",
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_base,
        marginBottom: 20,
    },
    button: {
        height: "auto",
        padding: 10,
        marginHorizontal: 10,
        width: "35%",
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        textAlign: "center",
    },
});
export default SearchScreen;

