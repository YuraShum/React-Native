import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { icons } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video'

type Props = {
    item: {
        title: string,
        thumbnail: string,
        video: string,
        creator: {
            username: string,
            avatar: string
        }
    }
}

const VideoCard = ({ item }: Props) => {

    const [play, setPlay] = useState(false)
    const player = useVideoPlayer(item.video, player => {
        player.loop = true;
    });

    useEffect(() => {
        if (play) {
            player.play();
        } else {
            player.pause();
        }
    }, [play, player]);

    return (
        <View className='flex-col items-center px-4 mb-14'>
            <View
                className='flex-row gap-3 items-center'>
                <View
                    className='justify-center items-center flex-row flex-1'>
                    {/** user image section */}
                    <View
                        className='w-[46px] h-[46px] border border-secondary rounded-lg justify-center items-center p-0.5'>
                        <Image
                            source={{ uri: item.creator.avatar }}
                            className='w-full h-full rounded-lg'
                            resizeMode='cover' />
                    </View>
                    {/** video title section */}
                    <View
                        className='justify-center flex-1 ml-3 gap-y-1'
                    >
                        <Text
                            className='text-white font-psemibold text-sm'
                            numberOfLines={1}>
                            {item.title}
                        </Text>
                        <Text
                            className='text-xs font-pregular text-gray-100'
                            numberOfLines={1}>
                            {item.creator.username}
                        </Text>
                    </View>
                </View>

                <View
                    className='pt-2'>
                    <Image
                        source={icons.menu}
                        className='w-5 h-5'
                        resizeMode='contain' />
                </View>
            </View>

            {/** item video section */}
            {play ? (
                <View className="w-full h-60 rounded-xl relative justify-center items-center bg-white/10 overflow-hidden mt-3">
                    <VideoView
                        style={{ width: '100%', height: '100%' }}
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                    />
                    <TouchableOpacity
                        className="absolute top-2 right-2 bg-white/50 rounded-full p-2"
                        onPress={() => {
                            player.pause();
                            setPlay(false);
                        }}
                    >
                        <Text>Exit</Text>
                    </TouchableOpacity>
                </View>
            ) :
                (
                    // video thumbnail section
                    <TouchableOpacity
                        className='w-full h-60 rounded-xl relative justify-center items-center mt-3'
                        activeOpacity={0.7}
                        onPress={() => setPlay(true)}>
                        <Image
                            source={{ uri: item.thumbnail }}
                            className='w-full h-full rounded-xl mt-3'
                            resizeMode='cover' />
                        <Image
                            source={icons.play}
                            className='w-12 h-12 absolute'
                            resizeMode='contain' />
                    </TouchableOpacity>
                )}
            <></>
        </View>
    )
}

export default VideoCard