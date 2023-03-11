import React, { useEffect, useRef, useState } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, Pressable, Keyboard, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

import InputField from '../../components/InputField'
import { Email, LeftArrow } from '../../utils/importSVGs'
import { ApiManager } from '../../api'

const ICON_SIZE = 20;

const ForgotPassword = () => {
  const navigator = useNavigation()
  const scrollViewRef = useRef()
  const [email, setEmail] = useState()

  const handleChange = text => e => setEmail({ [text]: e });

  const forgotPassword = async () => {
    const data = await ApiManager('/forgot-password', 'POST', email)
    if (data.error) {
      console.log(data)
      Toast.show({
        type: 'warning',
        text2: data.message,
      });
    } else {
      console.log(data)
      Toast.show({
        type: 'success',
        text2: "Email je poslat ka pavlovicnikola511@gmail.com"
      })
      setTimeout(() => navigator.navigate('EmailSent'), 500)
    }
  }

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', pushView)
    return () => keyboardShow.remove()
  })

  const pushView = () => scrollViewRef.current?.scrollTo({ y: 300, animated: true })

  return (
    <KeyboardAvoidingView className='flex-auto bg-[#fafafa]'>
      <ScrollView
        ref={scrollViewRef}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className='flex-initial p-12'>
          <Text className='text-center text-2xl font-monsBold'>GAGIN</Text>
          <Text className='text-center text-base font-monsMedium'>berberaj</Text>
        </View>
        <View className='flex-auto items-center p-2'>
          <Text className='text-[27px] font-monsBold'>Zaboravili ste lozinku?</Text>
          <Text className='text-gray-600 w-80 leading-4 mt-4 mb-8 font-mons'>
            Bez brige. Poslaćemo Vam e-mejl sa uputstvima za resetovanje vaše lozinke.
          </Text>
          <InputField
            text='Email'
            icon={<Email width={ICON_SIZE} height={ICON_SIZE} />}
            placeholder='Vaša email adresa'
            type='email'
            onChange={handleChange}
          />
        </View>
        <View className='flex-initial items-center p-6'>
          <Pressable className='w-80 bg-zinc-900 py-3 rounded-lg' onPress={forgotPassword}>
            <Text className='text-white text-lg font-monsSemiBold text-center'>
              Pošaljite uputstva
            </Text>
          </Pressable>
          <TouchableOpacity className='mt-4' onPress={() => navigator.navigate('Login')}>
            <View className='flex-row items-center'>
              <LeftArrow width={ICON_SIZE} height={ICON_SIZE} />
              <Text className='ml-2 font-monsMedium text-base'>Nazad na login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ForgotPassword