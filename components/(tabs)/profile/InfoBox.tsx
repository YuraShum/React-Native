import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    title: string | number,
    subtitle?: string,
    containerStyles?: string,
    titleStyles: string
}

const InfoBox = ({ title, subtitle, containerStyles, titleStyles }: Props) => {
    return (
        <View
            className={containerStyles}>
            <Text
                className={`text-white text-center font-psemibold ${titleStyles}`}>
                {title}
            </Text>
            {/** subtitle section */}
            <Text
                className='text-sm text-gray-200 text-center font-pregular'>
                {subtitle}
            </Text>
        </View>
    )
}

export default InfoBox