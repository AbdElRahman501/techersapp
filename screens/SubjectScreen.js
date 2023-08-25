import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import BackHeader from '../components/BackHeader';

export default function SubjectScreen({ route }) {
    const { item } = route.params;
    return (
        <SafeAreaView style={styles.container} >
            <BackHeader title={item.title["en"]} />
            <Text>SubjectScreen {item.title["en"]} </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        // justifyContent: 'center',
    },

})