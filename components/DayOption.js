import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, globalStyles } from '../GlobalStyles'
import { useSelector } from 'react-redux'

const DayItem = React.memo(({ item, SelectedId, handelPress }) => {
    const { language } = useSelector(state => state.languageState)
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (SelectedId.includes(item.fullName)) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    }, [SelectedId])


    return (
        <TouchableWithoutFeedback onPress={() => handelPress(item.fullName)} >
            <View style={[globalStyles.dayCard, { backgroundColor: trigger ? Color.darkcyan : Color.white }]}>
                <Text numberOfLines={1} lineBreakMode="tail"
                    style={[globalStyles.contentText, { color: trigger ? Color.white : Color.black }]} >
                    {item.day[language]}
                </Text>
            </View>
        </TouchableWithoutFeedback >
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default DayItem;
