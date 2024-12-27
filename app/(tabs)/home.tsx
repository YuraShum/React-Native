import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/(tabs)/SearchInput'
import TrandingGallery from '@/components/(tabs)/TrandingGallery'
import EmptyState from '@/components/(tabs)/EmptyState'
import { getAllPosts } from '@/lib/appwrite'
import useAppwrite from '@/hooks/useAppwrite'

type Props = {}

const Home = (props: Props) => {

    const [refreshing, setRefreshing] = useState(false)
    const {data: post, refetch} = useAppwrite(getAllPosts)



    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }
    return (
        <SafeAreaView
            className='bg-primary h-full'>
            <FlatList
                data={[]}
                keyExtractor={(item): string => `${item.id}`}
                renderItem={({ item }) => (
                    <Text
                        className='text-3xl text-white'>{item.id}</Text>
                )}
                ListHeaderComponent={() => (
                    <View
                        className='my-6 px-4 space-y-6'>
                        <View
                            className='justify-between items-start flex-row mb-6'>
                            <View>
                                <Text
                                    className='font-pmedium text-sm text-gray-100'>
                                    Welcom back!!
                                </Text>
                                <Text
                                    className='text-2xl font-psemibold text-white'>
                                    JSMastery
                                </Text>
                            </View>
                            <View
                                className='mt-1.5'>
                                <Image
                                    source={images.logoSmall}
                                    className="w-9 h-10"
                                    resizeMode='contain'
                                />
                            </View>
                        </View>

                        {/** search component section */}
                        <SearchInput />

                        {/** videos section  */}
                        <View
                            className='w-full flex-1 pt-5 pb-8'>
                            <Text
                                className='text-gray-100 text-lg font-pregular mb-3'>
                                Lates Videos
                            </Text>
                            <TrandingGallery
                                posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />

                        </View>
                    </View>
                )}
                ListEmptyComponent={() => (
                    <EmptyState
                        title='No Videos Found'
                        subtitle='Be the first one to upload a video' />
                )}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh} />
                } />


        </SafeAreaView>
    )
}

export default Home