import { View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'

import { icons } from '@/constants'
import { router, usePathname } from 'expo-router'

type Props = {
    initialQuery?: string
}

const SearchInput = ({initialQuery}: Props) => {

    const pathname = usePathname()
    const [query, setQuery] = useState(initialQuery || '')
    const [isFocused, setIsFocused] = useState(false);

    const borderColor = isFocused ? 'border-secondary' : 'border-black-200';

    const handleChangeQuery = (event: string) => {
        setQuery(event)
    }

    const onPress = () => {
        if (!query) {
            return Alert.alert(
                'Missing query',
                "Please input something to search results across database")
        }

        if (pathname.startsWith('/search')) {
            router.setParams({ query })
        }else{
            router.push(`/search/${query}`)
        }
    }

    return (
        <View
            className={`w-full h-16 px-4 bg-black-100 border-2 ${borderColor} rounded-2xl items-center flex-row space-x-4`}>
            <TextInput
                className='text-base text-white mt-0.5 flex-1 font-pregular'
                value={query}
                placeholder='Search for a video topic'
                placeholderTextColor='#CDCDE0'
                onChangeText={(event) => handleChangeQuery(event)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <TouchableOpacity
                onPress={onPress}>
                <Image
                    source={icons.search}
                    className='w-5 h-5'
                    resizeMode='contain' />
            </TouchableOpacity>
        </View>
    )
}

export default SearchInput