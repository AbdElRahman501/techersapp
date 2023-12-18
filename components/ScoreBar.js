import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Svg, { Circle } from "react-native-svg";
import { Color, Height, getScoreColor, getStateColor, globalStyles } from '../GlobalStyles';
import { AntDesign } from '@expo/vector-icons';

export default function ScoreBar({ width, strokeWidth, totalNumber, score, state, ...props }) {
    const color = state ? getStateColor(state) : getScoreColor(score)
    const isScore = score >= 0
    width = width || 50
    strokeWidth = strokeWidth || 6
    const strokeDasharray = 2 * Math.PI * ((width / 2) - 5);
    const strokeDashoffset = isScore && strokeDasharray * ((100 - score) / 100)

    return (
        <View style={{ position: "relative" }}>
            <Svg
                width={width}
                height={width}
                style={{ transform: [{ rotate: "-90deg" }] }}
                {...props}
            >
                <Circle
                    cx={width / 2}
                    cy={width / 2}
                    r={(width / 2) - 5}
                    fill="transparent"
                    stroke={strokeDashoffset ? "#e0e0e0" : color}
                    strokeWidth={strokeWidth}
                />
                {isScore &&
                    <Circle
                        cx={width / 2}
                        cy={width / 2}
                        r={(width / 2) - 5}
                        fill="transparent"
                        stroke={color}
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        strokeWidth={strokeWidth}
                    />

                }
            </Svg>
            {isScore ?
                <Text style={[globalStyles.smallText, styles.inText,
                {
                    fontSize: totalNumber ? (width / 2) : ((width / 3) - 2),
                    color: color
                }]}>
                    {totalNumber ? totalNumber : Math.round(score)}
                    {!totalNumber && <Text style={[globalStyles.smallText, { color: color }]}>%</Text>}
                </Text>
                :
                <AntDesign style={styles.inText} name={color === Color.red ? "closecircle" : "checkcircle"} size={width - 20} color={color} />
            }
        </View>
    )
}

const styles = StyleSheet.create({

    inText: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        textAlign: "center",
        textAlignVertical: "center",
    }
})
