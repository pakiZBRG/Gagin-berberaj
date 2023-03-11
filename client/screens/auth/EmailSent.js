import React from 'react'
import { View, Text, KeyboardAvoidingView, Pressable, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { EmailSent, LeftArrow } from '../../utils/importSVGs'
import { openEmail } from '../../utils/openMail'
import logo from '../../assets/logo.png'

const ICON_SIZE = 20

const AccountCreated = () => {
  const navigator = useNavigation()

  return (
    <KeyboardAvoidingView className='flex-auto bg-[#fafafa]'>
      <View className='flex-initial items-center p-8'>
        <Image source={logo} style={{ height: 110, width: 110 }} />
      </View>
      <View className='flex-initial items-center p-4'>
        <Text className='text-[27px] font-monsBold'>Mejl je poslat</Text>
        <Text className='text-gray-600 w-80 font-mons leading-4 mt-4'>
          Poslali smo uputstva za verifikaciju email adrese na
          <Text className='font-monsSemiBold'> email@gmail.com</Text>.
        </Text>
      </View>
      <View className='flex-auto p-10 items-center justify-center'>
        <EmailSent height={ICON_SIZE * 13} width={ICON_SIZE * 13} />
      </View>
      <View className='flex-initial items-center p-6'>
        <Pressable className='w-80 bg-zinc-900 py-3 rounded-lg' onPress={openEmail}>
          <Text className='text-white text-lg font-monsSemiBold text-center'>
            Otvorite mejl
          </Text>
        </Pressable>
        <TouchableOpacity className='mt-4' onPress={() => navigator.navigate('Login')}>
          <View className='flex-row items-center'>
            <LeftArrow width={ICON_SIZE} height={ICON_SIZE} />
            <Text className='ml-2 font-monsSemiBold text-base'>Nazad na login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AccountCreated