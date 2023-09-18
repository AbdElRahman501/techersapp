import { View, Text, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Color, getColorByIndex, globalStyles } from '../GlobalStyles'
import { useSelector } from 'react-redux'

const ScheduleDayOption = React.memo(({ item, SelectedId, handelPress }) => {
    const { language } = useSelector(state => state.languageState)
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {
        if (SelectedId.includes(item.fullName)) {
            setTrigger(true);
        } else {
            setTrigger(false);
        }
    }, [SelectedId])

    const events = [1, 2]

    return (
        <TouchableWithoutFeedback onPress={() => handelPress(item.fullName)} >
            <View style={[globalStyles.dayCard, { borderWidth: 0, backgroundColor: trigger ? Color.darkcyan : Color.white }]}>
                <Text numberOfLines={1} lineBreakMode="tail"
                    style={[globalStyles.contentText, { color: trigger ? Color.white : Color.darkgray }]} >
                    {item.day[language]}
                </Text>
                <Text style={[globalStyles.title, { color: trigger ? Color.white : Color.black }]}>
                    {item.date}
                </Text>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    {events.map((event, index) =>
                        <View key={index} style={[globalStyles.eventBall, { marginLeft: 1, backgroundColor: trigger ? Color.white : getColorByIndex(index) }]} ></View>
                    )}
                </View>
            </View>
        </TouchableWithoutFeedback >
    );
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default ScheduleDayOption;
