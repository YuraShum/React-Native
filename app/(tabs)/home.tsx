import { View, Text, FlatList, Image, RefreshControl, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import SearchInput from '@/components/(tabs)/SearchInput'
import TrandingGallery from '@/components/(tabs)/home/TrandingGallery'
import EmptyState from '@/components/(tabs)/EmptyState'
import { getAllPosts, getLatestListPost } from '@/lib/appwrite'
import useAppwrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/(tabs)/VideoCard'

type Props = {}

const Home = (props: Props) => {

    const [refreshing, setRefreshing] = useState(false)
    const {data: posts, refetch} = useAppwrite(getAllPosts)
    const {data: latestPost} = useAppwrite(getLatestListPost)

    const onRefresh = async () => {
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }
    return (
        <SafeAreaView
            className='bg-primary h-full'>
            <FlatList
                data={posts}
                keyExtractor={(item): string => `${item.$id}`}
                renderItem={({ item }) => (
                    <VideoCard item = {item}/>
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
                                posts={latestPost} />

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