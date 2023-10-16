import { Animated, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect } from 'react'
import transition from '../actions/transition'
import { globalStyles } from '../GlobalStyles'
import t from '../actions/changeLanguage'
import { inputChecker } from '../actions/GlobalFunctions'

export default function GenderSelection({ genderSelection, gender, setCheckInputs, checkInputs, setState }) {

    useEffect(() => {
        if (checkInputs) {
            setState(pv => pv.error ? pv : inputChecker(gender, "gender"))
            setCheckInputs(false)
        }
        if (gender) {
            setState(inputChecker(gender, "gender"))
        }
    }, [checkInputs, gender])
    return (
        <View style={{ flexDirection: "row", width: "100%", justifyContent: "space-around" }} >
            <TouchableWithoutFeedback onPress={() => genderSelection("male")} >
                <Animated.View style={[globalStyles.container, { opacity: transition(0.5, 1, 300, gender === "male") }]} >
                    <View style={globalStyles.gender} >
                        <Animated.Image
                            style={{ height: 80, maxWidth: 80, transform: [{ scale: transition(0.8, 1.2, 300, gender === "male") }] }}
                            resizeMode="contain"
                            source={require('../assets/boy.png')} />
                    </View>
                    <Text style={globalStyles.regular}>{t("boy")}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => genderSelection("female")} >
                <Animated.View style={[globalStyles.container, { opacity: transition(0.5, 1, 300, gender === "female") }]} >
                    <View style={globalStyles.gender} >
                        <Animated.Image
                            style={{ height: 80, maxWidth: 80, transform: [{ scale: transition(0.8, 1.2, 300, gender === "female") }] }}
                            resizeMode="contain"
                            source={require('../assets/girl.png')} />
                    </View>
                    <Text style={globalStyles.regular}>{t("girl")}</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({})