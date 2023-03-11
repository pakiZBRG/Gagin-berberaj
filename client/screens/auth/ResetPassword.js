import React, { useEffect, useRef, useState } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, Pressable, Keyboard, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import InputField from '../../components/InputField'
import { Email, LeftArrow } from '../../utils/importSVGs'

const ICON_SIZE = 20;

const ResetPassword = () => {
  const [password, setPassword] = useState()
  const navigator = useNavigation()
  const scrollViewRef = useRef()

  const handleChange = text => e => setPassword({ ...password, [text]: e });

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
          <Text className='text-[27px] font-monsBold mb-1'>Postavite novu lozinku</Text>
          <Text className='text-gray-600 w-80 font-mons leading-4 mt-4 mb-8'>
            Vaša nova lozinka mora da se razlikuje od prethodno korišćene.
          </Text>
          <InputField
            text='Lozinka'
            icon={<Email width={ICON_SIZE} height={ICON_SIZE} />}
            placeholder='Vaša nova lozinka'
            type='password'
            onChange={handleChange}
          />
          <InputField
            text='Potvrdite lozinku'
            icon={<Email width={ICON_SIZE} height={ICON_SIZE} />}
            placeholder='Potvrdite Vašu novu lozinku'
            type='confirmPassword'
            onChange={handleChange}
          />
        </View>
        <View className='flex-initial items-center p-6'>
          <Pressable className='w-80 bg-zinc-900 py-3 rounded-lg'>
            <Text className='text-white text-lg font-monsSemiBold text-center'>
              Postavite lozinku
            </Text>
          </Pressable>
          <TouchableOpacity className='mt-4' onPress={() => navigator.navigate('Login')}>
            <View className='flex-row items-center'>
              <LeftArrow width={ICON_SIZE} height={ICON_SIZE} />
              <Text className='ml-2 text-base font-monsSemiBold'>Nazad na login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default ResetPassword