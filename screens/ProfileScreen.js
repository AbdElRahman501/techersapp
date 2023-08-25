import { StyleSheet,Button, Text, View } from 'react-native'
import React from 'react'
import { signOut } from '../store/actions/userActions'
import ChangeLangButton from '../components/ChangeLangButton'
import { useDispatch } from 'react-redux'

export default function ProfileScreen() {
  const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <Text>ProfileScreen</Text>
            <Button title='Sign Out' onPress={() => dispatch(signOut())} />
            <ChangeLangButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})