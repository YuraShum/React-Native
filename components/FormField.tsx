import { View, Text, TextInput, TextInputProps, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '@/constants'

type Props = {
    title: string,
    value: string,
    handleChangeField: (value: string) => void,
    otherStyles?: string,
    keyboardType?: TextInputProps['keyboardType'],
    placeholder: string
}

const FormField = ({ title, value, handleChangeField, otherStyles, keyboardType, placeholder }: Props) => {

    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = isFocused ? 'border-secondary' : 'border-black-200';

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text
                className='text-base text-gray-100 font-pmedium'>
                {title}
            </Text>
            <View
                className={`w-full h-16 px-4 bg-black-100 border-2 ${borderColor} rounded-2xl items-center flex-row`}>
                <TextInput
                    className='flex-1 text-white font-psemibold text-base'
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeField}
                    secureTextEntry={title === 'Password' && !showPassword}
                    keyboardType={keyboardType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                {title === 'Password' && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}>
                        <Image 
                        source={!showPassword ? icons.eye : icons.eyeHide}
                        className='w-6 h-'
                        resizeMode='contain'/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField;