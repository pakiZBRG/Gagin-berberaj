import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'

const InputField = ({ text, icon, placeholder, forgetPassword, onChange, type }) => {
  const navigator = useNavigation();
  const [visible, setVisible] = useState(false);

  const changeFieldView = () => {
    setVisible(prevState => !prevState)
  }

  const isPassword = type.includes('assword')

  return (
    <View className='mb-4'>
      <Text className='mb-1 text-zinc-800 font-mons'>{text}</Text>
      <View className='flex-row p-2 px-3 items-center justify-center bg-gray-100 w-80 rounded-lg'>
        {icon}
        <View className='h-full w-[1px] mx-2 bg-gray-300' />
        <TextInput
          placeholder={placeholder}
          autoCapitalize='none'
          className='flex-1 font-monsMedium'
          secureTextEntry={isPassword && !visible}
          onChangeText={onChange(type)}
        />
        {isPassword &&
          <TouchableOpacity className='ml-2' onPress={changeFieldView}>
            <Text className='text-xs font-monsLight'>{visible ? 'Show' : 'Hide'}</Text>
          </TouchableOpacity>
        }
      </View>
      {forgetPassword &&
        <TouchableOpacity onPress={() => navigator.navigate('ForgotPassword')}>
          <Text className='ml-auto mt-1 font-monsSemiBold'>Zaboravili ste lozinku?</Text>
        </TouchableOpacity>
      }
    </View>
  )
}

export default InputField