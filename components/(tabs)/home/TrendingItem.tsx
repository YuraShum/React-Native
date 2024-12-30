import { View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native'
import { useState, useEffect } from 'react'
import * as Animateble from 'react-native-animatable'
import { icons, trendingAnimaion } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';


type Props = {
    activeItem: any,
    item: any
}

const TrendingItem = ({ activeItem, item }: Props) => {
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
        <Animateble.View
            className='mr-5'
            animation={activeItem === item.$id ? trendingAnimaion.zoomIn : trendingAnimaion.zoomOut}
            duration={500}>
            {play ? (
                <View className="w-52 h-72 rounded-[35px] mt-3 bg-white/10 overflow-hidden">
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
            ) : (
                <TouchableOpacity
                    className='relative justify-center items-center'
                    activeOpacity={0.7}
                    onPress={() => setPlay(true)}
                >
                    <ImageBackground
                        source={{ uri: item.thumbnail }}
                        className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                        resizeMode='cover' />
                    <Image
                        source={icons.play}
                        className='w-12 h-12 absolute'
                        resizeMode='contain' />
                </TouchableOpacity>
            )}
        </Animateble.View>
    )
}

export default TrendingItem