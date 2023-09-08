import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import { teachers } from '../data'
import TeacherMainCard from './TeacherMainCard'
import PrimaryButton from './PrimaryButton'
import { Color, FontFamily, FontSize } from '../GlobalStyles';
import { searchEngin } from '../actions/GlobalFunctions';

export default function SearchResults({ value }) {
    const navigation = useNavigation()
    const [SearchResults, setSearchResults] = useState([])


    useEffect(() => {
        setSearchResults(searchEngin(teachers, value))
    }, [teachers, value])

    return (
        <ScrollView style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
        >
            <View style={styles.container}>
                {SearchResults.length === 0 ? (
                    <View>
                        <Text style={styles.title}>Cant find Your Teacher : help us to find him for you</Text>
                        <PrimaryButton style={{ width: "50%", alignSelf: "center", margin: 10 }}>
                            <Text style={[styles.title, { color: Color.white }]} >Add teacher</Text>
                        </PrimaryButton>
                    </View>
                ) : (
                    SearchResults.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() => navigation.navigate("TeacherScreen", { item })}
                        >
                            <TeacherMainCard item={item} />
                        </TouchableOpacity>
                    ))
                )}
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20
    },
    card: {
        marginVertical: 10
    },
    title: {
        fontFamily: FontFamily.montserratArabic,
        fontSize: FontSize.size_base
    }
})