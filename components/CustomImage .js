import React from 'react'
import { SvgUri } from 'react-native-svg';
import Animated from 'react-native-reanimated';

export default function CustomImage(props) {
    switch (typeof props.source) {
        case 'number':
            return (<Animated.Image
                {...props}
                source={props.source}
            />)
        case 'function':
            const Svg_icon = props.source
            return (<Svg_icon {...props} />)
        case 'string':
            const isSvgLink = props.source?.split('.').pop().toLowerCase() === 'svg';
            if (isSvgLink) {
                return (<SvgUri
                    {...props}
                    fill={props.color}
                    width={props.style.width}
                    height={props.style.height}
                    uri={props.source}
                />)
            } else {
                return (<Animated.Image
                    {...props}
                    source={{
                        uri: props.source,
                    }}
                />)
            }
        default:
            (<Animated.Image
                {...props}
                source={{
                    uri: props.source,
                }}
            />)
    }

}
