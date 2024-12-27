import { View, Text, FlatList } from 'react-native'
import React from 'react'

type Props = {
    posts: any
}

const TrandingGallery = ({ posts }: Props) => {
    return (
        <FlatList
            data={posts}
            keyExtractor={(item): string => item.id}
            renderItem={({ item }) => (
                <Text
                    className='text-3xl text-white'>
                    {item.id}
                </Text>
            )} 
            horizontal/>
    )
}

export default TrandingGallery