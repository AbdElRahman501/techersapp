import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Color, globalStyles } from '../GlobalStyles';
import t from '../actions/changeLanguage';

const CountdownTimer = ({ initialTime }) => {
    const [timeRemaining, setTimeRemaining] = useState(initialTime);
    let interval
    useEffect(() => {
        setTimeRemaining(initialTime);
    }, [initialTime]);

    useEffect(() => {
        if (timeRemaining > 0) {
            interval = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [timeRemaining]);

    const formatTime = seconds => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <View>
            <Text style={[globalStyles.regular, { color: Color.gray_200, textAlign: "center" }]} >{t("sec", { time: formatTime(timeRemaining) })}</Text>
        </View>
    );
};

export default CountdownTimer;
