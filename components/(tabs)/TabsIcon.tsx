import { View, Text, Image, ImageSourcePropType } from 'react-native'
import React from 'react'

type Props = {
    icon: ImageSourcePropType,
    color: string,
    name: string,
    focused: boolean
}

const TabsIcon = ({icon, color, name, focused}: Props) => {
    return (
        <View 
        className='flex-col items-center justify-center gap-2 mt-6'>
            <Image 
            source={icon}
            resizeMode='contain'
            tintColor={color}
            className='w-6 h-6'/>
            <Text
            className={`${focused ? 'font-psemibold': 'font-pregular'} text-xs w-full`}
            style= {{
                color: color
            }}
>
                {name}
            </Text>
        </View>
    )
}

export default TabsIcon