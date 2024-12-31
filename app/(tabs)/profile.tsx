import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import useAppwrite from '@/hooks/useAppwrite'
import { getUserPosts, searchPosts, singOut } from '@/lib/appwrite'
import { SafeAreaView } from 'react-native-safe-area-context'
import VideoCard from '@/components/(tabs)/VideoCard'
import SearchInput from '@/components/(tabs)/SearchInput'
import EmptyState from '@/components/(tabs)/EmptyState'
import { useGlobalContext } from '@/context/GlobalProvider'

import { icons } from '@/constants'
import InfoBox from '@/components/(tabs)/profile/InfoBox'

type Props = {}

const Profile = (props: Props) => {

    const { user, setUser, setIsLogged } = useGlobalContext()
    const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id))


    const logout = async () => { 
        await singOut()
        setUser(null)
        setIsLogged(false)
        router.replace('/sign-in')
    }

    return (
        <SafeAreaView
            className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item): string => `${item.$id}`}
                renderItem={({ item }) => (
                    <VideoCard item={item} />
                )}
                ListHeaderComponent={() => (
                    <View
                        className='w-full justify-center items-center mt-6 mb-12 px-4'>
                        <TouchableOpacity
                            className='w-full items-end mb-10'
                            onPress={logout}>
                            <Image
                                source={icons.logout}
                                resizeMode='contain'
                                className='w-6 h-6' />
                        </TouchableOpacity>
                        {/* user avatar section */}
                        <View
                            className='w-16 h-16 border border-secondary rounded-lg justify-center items-center'>
                            <Image
                                source={{ uri: user.avatar }}
                                className='w-[90%] h-[90%] rounded-lg'
                                resizeMode='cover' />
                        </View>

                        {/** info section */}
                        <InfoBox
                            title={user.username}
                            containerStyles='mt-5'
                            titleStyles='text-lg' />
                        <View
                            className='mt-5 flex-row'>
                            <InfoBox
                                title={posts.length || 0}
                                subtitle="Posts"
                                containerStyles='mr-10'
                                titleStyles='text-xl' />
                            <InfoBox
                                title='1.2k'
                                subtitle='Followers'
                                titleStyles='text-xl' />
                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos Found'
                        subtitle='No videos found for this search query' />
                )} />
        </SafeAreaView>
    )
}

export default Profile
