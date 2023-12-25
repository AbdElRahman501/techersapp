import { TouchableWithoutFeedback, View } from 'react-native';
import { Color, FontSize, globalStyles } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CustomText from './CustemText';
import SortingContainer from './SortingContainer';
import SliderModal from './SliderModal';
import { inputChecker } from '../actions/GlobalFunctions';
const containerHeight = 300

export default function ListInput({ value, data, multipleSelection, placeholder, changHandler, children, rightIcon, checkInputs, setState, style }) {
    const { language } = useSelector(state => state.languageState);
    const options = data.map(x => x[language] || x)
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState("")
    const [multipleSelected, setMultipleSelected] = useState([])
    const [error, setError] = useState(false)

    const submitHandler = () => {
        setIsFocused(false)
        if (multipleSelection) {
            changHandler(multipleSelected.length > 0 ? multipleSelected.map(i => data[i]) : [])
        } else {
            changHandler(data[selectedOption])
        }
    }

    useEffect(() => {
        if (!multipleSelection) {
            if (checkInputs && !value) {
                setError(true)
                setState(inputChecker(value, placeholder))
            } else if (value) {
                setState(pv => pv.error ? pv : "")
                setError(false)
            }
        }
    }, [checkInputs, value])

    return (
        <TouchableWithoutFeedback onPress={() => setIsFocused(!isFocused)} >
            <View

                style={[globalStyles.inputField, {
                    borderColor: isFocused ? Color.darkcyan : error ? Color.red : Color.input_stroke,
                    flexDirection: language === "en" ? "row" : "row-reverse"
                }, style]}
            >
                <SliderModal visible={isFocused} submitHandler={submitHandler} containerHeight={containerHeight} >
                    <SortingContainer height={containerHeight} sortingOptions={options} multipleSelection={multipleSelection} multipleSelected={multipleSelected} selectedOption={selectedOption} setSelectedOption={(e) => {
                        if (multipleSelection && e >= 0) {
                            setMultipleSelected(pv => (pv.includes(e) ? pv.filter(x => x !== e) : [...pv, e]))
                        } else {
                            setSelectedOption(e)
                        }
                    }} placeholder={placeholder} />
                </SliderModal>
                {
                    children ?
                        <View style={globalStyles.rightIcon}>
                            {React.Children.map(children, (child) => {
                                return React.cloneElement(child, {
                                    width: FontSize.size_xl,
                                    height: FontSize.size_xl,
                                    viewBox: "0 0 24 24",
                                    color: isFocused ? Color.darkcyan : error ? Color.red : Color.darkgray
                                });
                            })}
                        </View>
                        :
                        rightIcon ?
                            <Ionicons style={globalStyles.rightIcon} name={rightIcon} size={FontSize.size_xl}
                                color={isFocused ? Color.darkcyan : Color.darkgray} />
                            : <View style={{ width: 24 }} />
                }

                <CustomText style={[globalStyles.smallText, { flex: 1, color: multipleSelection ? value?.length > 0 ? Color.black : Color.darkgray : value ? Color.black : Color.darkgray }]}>
                    {multipleSelection ? value?.length > 0 ? value.join(", ") : placeholder : (value || placeholder)}
                </CustomText>

                {value?.length > 0 ?
                    < Ionicons style={globalStyles.leftIcon} name={"checkmark"} size={FontSize.size_xl} color={Color.darkcyan} />
                    : <View style={globalStyles.leftIcon}>

                    </View>
                }
            </View >
        </TouchableWithoutFeedback >
    );
}

