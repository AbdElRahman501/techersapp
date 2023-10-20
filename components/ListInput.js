import { TouchableWithoutFeedback, View } from 'react-native';
import { Color, FontSize, globalStyles } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CustomText from './CustemText';
import SortingContainer from './SortingContainer';
import SliderModal from './SliderModal';
const containerHeight = 300

export default function ListInput({ value, options, placeholder, changHandler, children, rightIcon }) {
    const { language } = useSelector(state => state.languageState);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedOption, setSelectedOption] = useState("")
    const submitHandler = () => {
        setIsFocused(false)
        changHandler(options[selectedOption])
    }

    return (
        <TouchableWithoutFeedback onPress={() => setIsFocused(!isFocused)} >
            <View

                style={[globalStyles.inputField, {
                    borderColor: isFocused ? Color.darkcyan : Color.input_stroke,
                    flexDirection: language === "en" ? "row" : "row-reverse"
                }]}
            >
                <SliderModal visible={isFocused} submitHandler={submitHandler} containerHeight={containerHeight} >
                    <SortingContainer height={containerHeight} sortingOptions={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} placeholder={placeholder} />
                </SliderModal>
                {
                    !children ?
                        <Ionicons style={globalStyles.rightIcon} name={rightIcon} size={FontSize.size_xl}
                            color={isFocused ? Color.darkcyan : Color.darkgray} />
                        :
                        <View style={globalStyles.rightIcon}>
                            {React.Children.map(children, (child) => {
                                return React.cloneElement(child, {
                                    width: FontSize.size_xl,
                                    height: FontSize.size_xl,
                                    viewBox: "0 0 24 24",
                                    color: isFocused ? Color.darkcyan : Color.darkgray
                                });
                            })}
                        </View>
                }

                <CustomText style={[globalStyles.smallText, {flex: 1, color: value ? Color.black : Color.darkgray }]}>
                    {value || placeholder}
                </CustomText>

                {
                    value ?
                        < Ionicons style={globalStyles.leftIcon} name={"checkmark"} size={FontSize.size_xl} color={Color.darkcyan} />
                        : <View style={globalStyles.leftIcon}>

                        </View>
                }
            </View >
        </TouchableWithoutFeedback >
    );
}

