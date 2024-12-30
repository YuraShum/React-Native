import { View, Text, FlatList } from 'react-native'
import TrendingItem from './TrendingItem'
import { useState } from 'react'


type Props = {
    posts: any
}

const TrandingGallery = ({ posts }: Props) => {
    const [activeItem, setActiveItem] = useState(posts[0])


    const viewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].key)
        }
    }
    return (
        <FlatList
            data={posts}
            keyExtractor={(item): string => item.$id}
            renderItem={({ item }) => (
                <TrendingItem
                    activeItem={activeItem}
                    item={item}
                />
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70
            }}
            contentOffset={{
                x: 170,
                y: 0
            }}
            horizontal />
    )
}

export default TrandingGallery