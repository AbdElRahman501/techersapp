import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../GlobalStyles';
import CustomText from './CustemText';
import t from '../actions/changeLanguage';

export default function LongText({ content, style }) {
    const [showFullText, setShowFullText] = useState(false);

    const toggleShowFullText = () => {
        setShowFullText(!showFullText);
    };
    return (
        <View style={styles.container}>
            <CustomText numberOfLines={showFullText ? undefined : 2} ellipsizeMode="tail" style={style}>
                {content}
            </CustomText>
            <TouchableOpacity onPress={toggleShowFullText}>
                <Text style={[style, { color: Color.darkcyan }]}>{showFullText ? t("read less") : t("read more")}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})