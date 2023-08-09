import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color, FontFamily, fontEm } from '../GlobalStyles';
import t from '../actions/cahngeLanguage';

const CountdownTimer = ({ initialTime, onCountdownFinish }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    useEffect(() => {
        if (timeRemaining > 0) {
            const interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(interval);
        } else {
            if (onCountdownFinish) {
                onCountdownFinish();
            }
        }
    }, [timeRemaining, onCountdownFinish]);

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.regularText, { textAlign: "center" }]} >{t("sec", { time: formatTime(timeRemaining) })}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    regularText: {
        fontSize: fontEm(1),
        color: Color.gray_200,
        fontFamily: FontFamily.montserratArabic,
        marginBottom: fontEm(0.5),
    },

});

export default CountdownTimer;
