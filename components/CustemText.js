import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

const CustomText = (props) => {
    const { language } = useSelector((state) => state.languageState);
    const textAlign = language === 'en' ? 'left' : 'right';
    const mergedStyle = [{ textAlign }, props.style];

    return <Text {...props} style={mergedStyle} />;
};

export default CustomText;
