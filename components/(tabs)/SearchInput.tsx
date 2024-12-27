import { View, Text, TextInput, TextInputProps, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import { icons } from '@/constants'

type Props = {
    title: string,
    value: string,
    handleChangeField: (value: string) => void,
    otherStyles?: string,
    keyboardType?: TextInputProps['keyboardType'],
}

const SearchInput = ({ title, value, handleChangeField, otherStyles, keyboardType, placeholder }: Props) => {

    const [showPassword, setShowPassword] = useState(false)
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = isFocused ? 'border-secondary' : 'border-black-200';

    return (
            <View
                className={`w-full h-16 px-4 bg-black-100 border-2 ${borderColor} rounded-2xl items-center flex-row space-x-4`}>
                <TextInput
                    className='text-base text-white mt-0.5 flex-1 font-pregular'
                    value={value}
                    placeholder= 'Search for a video topic'
                    placeholderTextColor='#7b7b8b'
                    onChangeText={handleChangeField}
                    secureTextEntry={title === 'Password' && !showPassword}
                    keyboardType={keyboardType}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
                <TouchableOpacity>
                    <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain'/>
                </TouchableOpacity>
            </View>
    )
}

export default SearchInput