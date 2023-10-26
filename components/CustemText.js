import React from 'react';
import { Text } from 'react-native';
import { useSelector } from 'react-redux';

const CustomText = (props) => {
    const { language } = useSelector((state) => state.languageState);
    return <Text {...props} style={[{ textAlign: language === 'en' ? 'left' : 'right' }, props.style]} />;
};

export default CustomText;
