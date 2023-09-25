import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color, FontFamily, FontSize } from '../GlobalStyles';

const ScoreItem = ({ score, title, content }) => {
    return (
        <View style={styles.container}>
            <View style={[styles.circle, { borderColor: "red" }]}>
                <Text style={[styles.scoreText]}>{score + "%"}</Text>
            </View>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    circle: {
        width: 50,
        height: 50,
        backgroundColor: Color.white,
        borderRadius: 25,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 4,
    },
    scoreText: {
        fontSize: FontSize.size_lg,
        fontWeight: 'bold',
    },
    title: {
        fontSize: FontSize.size_sm,
        fontFamily: FontFamily.montserratArabic,
        color: Color.black
    }
});

export default ScoreItem;
