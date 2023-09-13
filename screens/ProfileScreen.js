import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { signOut } from '../store/actions/userActions'
import ChangeLangButton from '../components/ChangeLangButton'
import { useDispatch, useSelector } from 'react-redux'
import PrimaryButton from '../components/PrimaryButton'
import HomeHeader from '../components/HomeHeader';
import { Color, Height, Padding } from '../GlobalStyles';

export default function ProfileScreen() {
    const { loading, userInfo, error } = useSelector(state => state.userInfo)
    const dispatch = useDispatch()

    return userInfo && (
        <View style={styles.container}>
            <HomeHeader user={userInfo} />
            <TouchableOpacity style={styles.button} onPress={() => dispatch(signOut())}>
                <Text style={styles.buttonText}>Sign Out</Text>
            </TouchableOpacity>
            <ChangeLangButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Height.nav_tap,
        flex: 1,
        alignItems: "center",
    },

    button: {
        backgroundColor: Color.red,
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})
