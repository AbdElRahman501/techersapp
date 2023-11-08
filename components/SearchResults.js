import { ScrollView, StyleSheet, TouchableOpacity, Animated, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import TeacherMainCard from './TeacherMainCard'
import PrimaryButton from './PrimaryButton'
import { Color, FontFamily, FontSize } from '../GlobalStyles';
import { searchEngin } from '../actions/GlobalFunctions';
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from "../store/actions/showMessageActions";


export default function SearchResults({ value }) {
    const navigation = useNavigation()
    const { loading: teachersLoading, closeTeacher: teachers, error: teachersError } = useSelector(state => state.closeTeachersState);

    const [SearchResults, setSearchResults] = useState([])

    const dispatch = useDispatch();
    const showMessageHandler = () => {
        dispatch(showMessage("Coming Soon 🚀"))
    }

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
                        <PrimaryButton onPress={showMessageHandler} style={{ width: "50%", alignSelf: "center", margin: 10 }}>
                            <Text style={[styles.title, { color: Color.white }]} >Add teacher</Text>
                        </PrimaryButton>

                    </View>
                ) : (
                    SearchResults.map(item => (
                        <TouchableOpacity
                            key={item.id}
                            style={styles.card}
                            onPress={() => {
                                navigation.navigate("TeacherScreen", { item })
                            }}
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

});
