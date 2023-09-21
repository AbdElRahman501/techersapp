import { Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Color, globalStyles } from '../GlobalStyles';
import { useSelector } from 'react-redux';

const SubjectOptions = React.memo(({ item, selectedSubjects, setSelectedSubject }) => {
    const { language } = useSelector(state => state.languageState)
    let selected = selectedSubjects.find(x => x.id === item.id) ? true : false

    const pressHandler = (item) => {
        if (selected) {
            setSelectedSubject(pv => pv.filter(x => x.id !== item.id));
        } else {
            setSelectedSubject(pv => [...pv, item]);
        }
    }
    return (
        <TouchableOpacity onPress={() => pressHandler(item)} style={[globalStyles.dayCard, { backgroundColor: selected ? Color.darkcyan : Color.white, width: 80, height: 40, }]} >
            <Text numberOfLines={1} lineBreakMode="tail" style={[globalStyles.regular, { color: selected ? Color.white : Color.black, width: 80 ,height: 40,textAlignVertical:'center', textAlign: 'center'}]}> {item[language]}</Text>
        </TouchableOpacity>
    )
}, (prevProps, nextProps) => {
    return prevProps.item.id !== nextProps.item.id;
});

export default SubjectOptions;
