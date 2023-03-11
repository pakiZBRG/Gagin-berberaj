import React, { useEffect, useRef, useState } from 'react'
import { View, Text, KeyboardAvoidingView, ScrollView, Pressable, TouchableOpacity, Keyboard, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

import InputField from '../../components/InputField'
import { Email, Lock, User } from '../../utils/importSVGs'
import { ApiManager } from '../../api'
import logo from '../../assets/logo.png'

const ICON_SIZE = 20;

const Register = () => {
  const [registerData, setRegisterData] = useState({});
  const navigator = useNavigation()
  const scrollViewRef = useRef()

  const handleChange = text => e => setRegisterData({ ...registerData, [text]: e });

  const register = async () => {
    const data = await ApiManager('/register', 'POST', registerData)
    if (data.error) {
      Toast.show({
        type: 'warning',
        text2: data[0].message,
      });
    } else {
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

  const pushView = () => scrollViewRef.current?.scrollTo({ y: 160, animated: true })

  return (
    <KeyboardAvoidingView className='flex-auto bg-[#fafafa]'>
      <ScrollView
        ref={scrollViewRef}
        bounces={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className='flex-initial items-center p-8'>
          <Image source={logo} style={{ height: 110, width: 110 }} />
        </View>
        <View className='flex-auto items-center p-2'>
          <Text className='text-[27px] font-monsBold mb-10'>Kreirajte nalog</Text>
          <InputField
            text='Korisničko ime'
            type='username'
            icon={<User width={ICON_SIZE} height={ICON_SIZE} />}
            placeholder='Vaše ime'
            onChange={handleChange}
          />
          <InputField
            text='Email'
            type='email'
            icon={<Email width={ICON_SIZE} height={ICON_SIZE} />}
            placeholder='Vaša email adresa'
            onChange={handleChange}
          />
          <InputField
            text='Lozinka'
            type='password'
            icon={<Lock width={ICON_SIZE} height={ICON_SIZE} />}
            placeholder='Vaša lozinka'
            onChange={handleChange}
          />
          <InputField
            text='Potvrdite lozinku'
            type='confirmPassword'
            icon={<Lock width={ICON_SIZE} height={ICON_SIZE} />}
            placeholder='Potvrdite Vašu lozinku'
            onChange={handleChange}
          />
        </View>
        <View className='flex-initial items-center p-6'>
          <Pressable onPress={register} className='w-80 bg-zinc-900 py-3 rounded-lg'>
            <Text className='text-white text-lg font-monsSemiBold text-center'>
              Registrujte se
            </Text>
          </Pressable>
          <View className='mt-3 text-base flex-row items-center'>
            <Text className='font-mons'>Imate nalog? </Text>
            <TouchableOpacity onPress={() => navigator.navigate('Login')}>
              <Text className='font-monsSemiBold'>Ulogujte se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Register