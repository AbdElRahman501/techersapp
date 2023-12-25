import { ScrollView, StyleSheet, TouchableOpacity, Animated, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/core';
import TeacherMainCard from './TeacherMainCard'
import PrimaryButton from './PrimaryButton'
import { Color, FontFamily, FontSize, globalStyles } from '../GlobalStyles';
import { getSubject, searchEngin } from '../actions/GlobalFunctions';
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from "../store/actions/showMessageActions";


export default function SearchResults({ value }) {
    const navigation = useNavigation()
    const { closeTeacher } = useSelector(state => state.closeTeachersState);
    const modifiedTeachers = closeTeacher.map((item) => ({ ...item, subjects: item.subjects.map((subject) => getSubject(subjects, subject)) }))
    const { subjects } = useSelector(state => state.subjectsState)
    const [SearchResults, setSearchResults] = useState(searchEngin(modifiedTeachers, value) || [])

    const dispatch = useDispatch();
    const showMessageHandler = () => {
        dispatch(showMessage("Coming Soon 🚀"))
    }

    useEffect(() => {
        const modifiedTeachers = closeTeacher.map((item) => {
            return {
                ...item,
                subjects: item.subjects.map((subject) => getSubject(subjects, subject))
            }
        })
        setSearchResults(searchEngin(modifiedTeachers, value))
    }, [closeTeacher, value])

    return (

        <View style={styles.container}>
            {SearchResults.length === 0 ? (
                <View>
                    <Text style={globalStyles.title}>Cant find Your Teacher : help us to find him for you</Text>
                    <PrimaryButton onPress={showMessageHandler} style={{ width: "50%", alignSelf: "center", margin: 10 }}>
                        <Text style={[globalStyles.title, { color: Color.white }]} >Add teacher</Text>
                    </PrimaryButton>

                </View>
            ) : (
                SearchResults.map((item, index) => (
                    <TeacherMainCard key={index} item={item} index={index} pressHandler={() => navigation.navigate("TeacherScreen", { item })} />
                ))
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        gap: 10
    },

});
