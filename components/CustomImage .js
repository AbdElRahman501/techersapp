import React from 'react'
import { SvgUri } from 'react-native-svg';
import Animated from 'react-native-reanimated';

export default function CustomImage(props) {
    const isLocal = typeof props.source === 'number'

    const isSvgLink = (link) => {
        if (!isLocal && props.source) {
            const fileExtension = link.split('.').pop().toLowerCase();
            return fileExtension === 'svg';
        } else { return false }
    };

    return isLocal ? (
        <Animated.Image
            {...props}
            source={props.source}
        />
    ) : isSvgLink(props.source) ? (
        <SvgUri
            {...props}
            width={props.style.width}
            height={props.style.height}
            uri={props.source}
        />
    ) : (
        <Animated.Image
            {...props}
            source={{
                uri: props.source,
            }}
        />

    )


}
