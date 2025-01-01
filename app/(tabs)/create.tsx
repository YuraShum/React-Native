import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from '@/components/FormField'

import { icons } from '@/constants'
import { useVideoPlayer, VideoView } from 'expo-video'
import CustomButton from '@/components/(tabs)/CustomButton'
import * as DocumentPicker from 'expo-document-picker'
import { router } from 'expo-router'
import { createVideo } from '@/lib/appwrite'
import { useGlobalContext } from '@/context/GlobalProvider'

type Props = {}

const Create = (props: Props) => {

  const [uploading, setUploading] = useState(false)
  const {user} = useGlobalContext()



  const [createVideoForm, setCreateVideoForm] = useState({
    title: '',
    video: null,
    thumbnail: null,
    prompt: ''
  })

  const [play, setPlay] = useState(false)
  const player = useVideoPlayer(createVideoForm.video?.uri, player => {
    player.loop = true;
  });

  useEffect(() => {
    if (play) {
      player.play();
    } else {
      player.pause();
    }
  }, [play, player]);

  const handleChangeTitle = (event) => {
    setCreateVideoForm({
      ...createVideoForm,
      title: event
    })
  }

  const handleChangePrompt = (event) => {
    setCreateVideoForm({
      ...createVideoForm,
      prompt: event
    })
  }

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image"
        ? ["image/png", "image/jpg"]
        : ["video/mp4", "video/gif"],
    })

    if (!result.canceled) {
      if (selectType === 'image') {
        setCreateVideoForm({
          ...createVideoForm,
          thumbnail: result.assets[0]
        })
      }

      if (selectType === 'video') {
        setCreateVideoForm({
          ...createVideoForm,
          video: result.assets[0]
        })
      }

    }
  }

  const submite = async () => {
    if (!createVideoForm.prompt ||
      !createVideoForm.thumbnail ||
      !createVideoForm.title ||
      !createVideoForm.video) {
      return Alert.alert('Please fill in all the fields')
    }

    setUploading(true)

    try {
      await createVideo({
        ...createVideoForm,
        userId: user.$id
      })

        Alert.alert('Success', 'Post uploaded successfully')
      router.push('/home')

    } catch (error: any) {
      Alert.alert('Error', error.message)

    } finally {
      setCreateVideoForm({
        title: '',
        video: null,
        thumbnail: null,
        prompt: ''
      })
      setUploading(false)
    }
  }

  return (
    <SafeAreaView
      className='h-full bg-primary'>
      <ScrollView
        className='px-4 my-6'>
        <Text
          className='text-2xl text-white font-psemibold'>
          Upload Video
        </Text>

        {/** input video  title */}
        <FormField
          title='Video Title'
          value={createVideoForm.title}
          placeholder='Give your video a catch title...'
          handleChangeField={(event) => handleChangeTitle(event)}
          otherStyles='mt-10'
        />

        {/** upload video file */}
        <View
          className='mt-7 gap-2'>
          <Text
            className='text-gray-100 font-pmedium'>
            Upload Video
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('video')}>
            {createVideoForm.video ?
              (
                <View
                  className="w-full h-64 rounded-2xl">
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
                <View
                  className='w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center'>
                  <View
                    className='w-14 h-14 border border-dashed border-secondary-100 justify-center items-center'>
                    <Image
                      source={icons.upload}
                      resizeMode='contain'
                      className='w-1/2 h-1/2' />
                  </View>
                </View>
              )}
          </TouchableOpacity>
        </View>
        {/** video thumbnail section */}
        <View
          className='mt-7 gap-2'>
          <Text
            className=' text-gray-100 font-pmedium'>
            Thumbnail Image
          </Text>

          <TouchableOpacity
            onPress={() => openPicker('image')}>
            {createVideoForm.thumbnail ?
              (
                <Image
                  source={{ uri: createVideoForm.thumbnail.uri }}
                  resizeMode='cover'
                  className='w-ful h-64 rounded-2xl' />
              ) : (
                <View
                  className='w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row gap-2'>
                  <Image
                    source={icons.upload}
                    resizeMode='contain'
                    className='w-5 h-5' />
                  <Text
                    className='text-sm text-gray-100 font-pmedium'>
                    Choose a file
                  </Text>
                </View>
              )}
          </TouchableOpacity>
        </View>

        {/** prompt section  */}
        {/** input video  title */}
        <FormField
          title='AI Prompt'
          value={createVideoForm.prompt}
          placeholder='The prompt you used to create this video'
          handleChangeField={(event) => handleChangePrompt(event)}
          otherStyles='mt-7'
        />

        <CustomButton
          title='Submite & Publish'
          handlePress={submite}
          containerStyles='mt-7'
          isLoading={uploading}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create