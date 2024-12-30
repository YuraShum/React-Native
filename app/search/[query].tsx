import { View, Text, FlatList} from 'react-native'
import React, { useEffect} from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { searchPosts } from '@/lib/appwrite'
import useAppwrite from '@/hooks/useAppwrite'
import VideoCard from '@/components/(tabs)/VideoCard'
import SearchInput from '@/components/(tabs)/SearchInput'
import EmptyState from '@/components/(tabs)/EmptyState'


type Props = {}

const Search = (props: Props) => {

    const { query } = useLocalSearchParams()
    const { data: posts, refetch } = useAppwrite(() => searchPosts(query))


    useEffect(() => {
        refetch()
    }, [query])


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
                        className='my-6 px-4'>
                        <Text
                            className='font-pmedium text-sm text-gray-100'>
                            Search Results
                        </Text>
                        <Text
                            className='text-2xl font-psemibold text-white'>
                            {query}
                        </Text>

                        <View className='mt-6 mb-8'>
                            {/** search component section */}
                            <SearchInput initialQuery={query as string} />
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

export default Search