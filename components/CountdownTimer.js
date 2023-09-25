import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Color, globalStyles } from '../GlobalStyles';
import t from '../actions/changeLanguage';

const CountdownTimer = ({ initialTime, onCountdownFinish, resend, setResend }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    let interval
    useEffect(() => {
        if (!resend && timeRemaining === 0) {
            clearInterval(interval);
            setTimeRemaining(initialTime);
        }
    }, [resend]);

    useEffect(() => {
        if (timeRemaining > 0) {
            setResend(false)
            interval = setInterval(() => {
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
        <View style={globalStyles.container}>
            <Text style={[globalStyles.regular, { color: Color.gray_200, textAlign: "center" }]} >{t("sec", { time: formatTime(timeRemaining) })}</Text>
        </View>
    );
};

export default CountdownTimer;
