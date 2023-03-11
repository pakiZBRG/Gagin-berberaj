import React from 'react'
import { View, Text, KeyboardAvoidingView, Pressable, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { ConfirmedAccount } from '../../utils/importSVGs'

const AccountCreated = () => {
  const navigator = useNavigation()

  return (
    <KeyboardAvoidingView className='flex-auto bg-[#fafafa]'>
      <View className='flex-initial p-12'>
        <Text className='text-center text-2xl font-monsBold'>GAGIN</Text>
        <Text className='text-center text-base font-mons'>berberaj</Text>
      </View>
      <View className='flex-initial items-center p-4'>
        <Text className='text-[27px] font-monsBold'>Nalog je kreiran</Text>
        <Text className='text-gray-500 w-80 font-mons leading-4 mt-4'>
          Vaš nalog je uspešno verifikovan i kreiran. Možete pristupiti aplikaciji.
        </Text>
      </View>
      <View className='flex-auto p-10 items-center justify-center'>
        <ConfirmedAccount height={260} width={260} />
      </View>
      <View className='flex-initial items-center p-6'>
        <Pressable className='w-80 bg-zinc-900 py-3 rounded-lg' onPress={() => navigator.navigate('Login')}>
          <Text className='text-white text-lg font-monsBold text-center'>
            Login
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AccountCreated