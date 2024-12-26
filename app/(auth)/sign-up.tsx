import { View, ScrollView, Image, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/(tabs)/CustomButton'
import { Link, router } from 'expo-router'
import {createUser} from '../../lib/appwrite'

type Props = {}

const SignUp = (props: Props) => {

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChangeText = (event: string) => {
    setForm({
      ...form,
      email: event
    })
  }

  const handleChangePassword = (event: string) => {
    setForm({
      ...form,
      password: event
    })
  }
  const handleChangeUsername = (event: string) => {
    setForm({
      ...form,
      username: event
    })
  }

  const submit = async () => { 
    if(!form.username || !form.email || !form.password){
      Alert.alert('Error', "Please fill in all the fields")
    }

    setIsSubmitting(true)
    try {
      const result = await createUser(form.email, form.password, form.username)

      router.replace('/home')
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView
      className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
          <Image
            source={images.logo}
            resizeMode='contain'
            className='w-[115px] h-[35px]' />
          <Text
            className='text-2xl text-white mt-10 font-psemibold'>
            Sign up to Aora
          </Text>

          {/* username section */}
          <FormField
            title="Username"
            value={form.username}
            handleChangeField={(event) => handleChangeUsername(event)}
            otherStyles="mt-7"
            placeholder='Enter your username' />
          {/* email section */}
          <FormField
            title="Email"
            value={form.email}
            handleChangeField={(event) => handleChangeText(event)}
            otherStyles="mt-7"
            keyboardType='email-address'
            placeholder='Enter your email' />

          {/* password section */}
          <FormField
            title="Password"
            value={form.password}
            handleChangeField={(event) => handleChangePassword(event)}
            otherStyles="mt-7"
            placeholder='Enter your password' />

          <CustomButton
            title='Sign up'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View
            className='justify-center gap-2 flex-row pt-5'>
            <Text
              className='text-lg text-gray-100 font-pregular'>
              Have an account already?
            </Text>
            <Link
              href='/sign-in'
              className=' text-lg font-psemibold text-secondary'
            >Sign in</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp