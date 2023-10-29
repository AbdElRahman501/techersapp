import { TouchableWithoutFeedback, View } from 'react-native';
import { Border, Color, FontSize, globalStyles } from '../GlobalStyles'
import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CustomText from './CustemText';
import SortingContainer from './SortingContainer';
import SliderModal from './SliderModal';
import { inputChecker } from '../actions/GlobalFunctions';
const containerHeight = 300

export default function DatePicker({ value, placeholder, changHandler, children, rightIcon, checkInputs, setState }) {
    const [isFocused, setIsFocused] = useState(false);
    const { language } = useSelector(state => state.languageState);

    const years = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - 3 - i).reverse()
    const days = Array.from({ length: 31 }, (_, i) => i + 1)
    const months = Array.from({ length: 12 }, (_, i) => i + 1)

    const [selectedDay, setSelectedDay] = useState("")
    const [selectedMonth, setSelectedMonth] = useState("")
    const [selectedYear, setSelectedYear] = useState("")

    const submitHandler = () => {
        setIsFocused(false)
        const date = new Date(years[selectedYear], months[selectedMonth], days[selectedDay])
        if (years[selectedYear] && months[selectedMonth] && days[selectedDay]) {
            changHandler(years[selectedYear] + "-" + months[selectedMonth] + "-" + days[selectedDay])
        }
    }

    const [error, setError] = useState(false)

    useEffect(() => {
        if (checkInputs && !value) {
            setError(true)
            setState(inputChecker(value, placeholder))
        } else if (value) {
            setState(pv => pv.error ? pv : "")
            setError(false)
        }
    }, [checkInputs, value])
    return (
        <TouchableWithoutFeedback onPress={() => setIsFocused(!isFocused)} >
            <View

                style={[globalStyles.inputField, {
                    borderColor: isFocused ? Color.darkcyan : error ? Color.red : Color.input_stroke,
                    flexDirection: language === "en" ? "row" : "row-reverse"
                }]}
            >
                <SliderModal visible={isFocused} submitHandler={submitHandler} containerHeight={containerHeight} >
                    <View style={{ flexDirection: "row", backgroundColor: Color.ofWhite, borderRadius: Border.br_6xl }}>
                        <SortingContainer style={{ minWidth: "40%" }}
                            height={containerHeight} placeholder={"Year"}
                            sortingOptions={years}
                            selectedOption={selectedYear} setSelectedOption={setSelectedYear}
                        />
                        <SortingContainer style={{ minWidth: "20%" }}
                            height={containerHeight} placeholder={"Month"}
                            sortingOptions={months}
                            selectedOption={selectedMonth} setSelectedOption={setSelectedMonth}
                        />
                        <SortingContainer style={{ minWidth: "20%" }}
                            height={containerHeight} placeholder={"day"}
                            sortingOptions={days}
                            selectedOption={selectedDay} setSelectedOption={setSelectedDay}
                        />
                    </View>
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
                                    color: isFocused ? Color.darkcyan : error ? Color.red : Color.darkgray
                                });
                            })}
                        </View>
                }

                <CustomText style={[globalStyles.smallText, { flex: 1, color: value ? Color.black : Color.darkgray }]}>
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

