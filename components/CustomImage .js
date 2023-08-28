import { Image } from 'react-native'
import React from 'react'

export default function CustomImage(props) {
    return (
        <Image
            source={
                typeof props.source === 'number'
                    ? props.source // Local image require path
                    : { uri: props.source } // Internet image URL
            }
            {...props}
        />
    )
}
