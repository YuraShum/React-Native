import { View, ScrollView, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '@/constants'
import FormField from '@/components/FormField'
import CustomButton from '@/components/(tabs)/CustomButton'
import { Link } from 'expo-router'

type Props = {}

const SignIn = (props: Props) => {

  const [form, setForm] = useState({
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

  const submit = () => { }
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
            Login to Aora
          </Text>

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
            title='Sign in'
            handlePress={submit}
            containerStyles='mt-7'
            isLoading={isSubmitting}
          />
          <View
            className='justify-center gap-2 flex-row pt-5'>
            <Text
              className='text-lg text-gray-100 font-pregular'>
              Don't have account?
            </Text>
            <Link
            href='/sign-up'
            className=' text-lg font-psemibold text-secondary'
            >Sign Up</Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn