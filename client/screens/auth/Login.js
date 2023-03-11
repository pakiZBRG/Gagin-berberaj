import { useEffect, useState, useRef, useContext } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View, Pressable, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, Image } from 'react-native'
// import * as GoogleAuth from 'expo-auth-session/providers/google'

import { Google, Email, Lock } from '../../utils/importSVGs'
import InputField from '../../components/InputField'
import logo from '../../assets/logo.png'
import { AppContext } from '../../context'
import axios from 'axios'

const ICON_SIZE = 20

const Login = () => {
  const [accessToken, setAccessToken] = useState(undefined)
  const [loginData, setLoginData] = useState({});
  // const [userInfo, setUserInfo] = useState()

  const navigator = useNavigation()
  const scrollViewRef = useRef()
  const { login, changeNavigationColor } = useContext(AppContext)

  useEffect(() => {
    changeNavigationColor('#fafafa')
  }, [])

  // const [request, response, promptAsync] = GoogleAuth.useAuthRequest({
  //   androidClientId: "336130686338-365p1eeg59ruabp4pd9ubsk9kb1v7ggl.apps.googleusercontent.com",
  //   expoClientId: "336130686338-2uvpaiq8r48mancc35o36flourgac9u5.apps.googleusercontent.com",
  //   iosClientId: "336130686338-j4i3495d390f37uvrelc0ft1n1oib4bh.apps.googleusercontent.com"
  // });

  // useEffect(() => {
  //   console.log(response)
  //   if (response?.type === 'success') {
  //     setAccessToken(response.authentication.accessToken)
  //   }
  // }, [response])

  // const getUserData = async () => {
  //   const { data } = await axios.get(
  //     "https://www.googleapis.com/userinfo/v2/me", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   })

  //   setUserInfo(data)
  // }

  // const showUserData = () => {
  //   if (userInfo) {
  //     return (
  //       <View>
  //         <Text>{userInfo.name}</Text>
  //         <Text>{userInfo.email}</Text>
  //       </View>
  //     )
  //   }
  // }

  const handleChange = text => e => setLoginData({ ...loginData, [text]: e });

  const handleLogin = () => login(loginData)

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
        {/* {showUserData()} */}
        <View className='flex-initial items-center p-8'>
          <Image source={logo} style={{ height: 110, width: 110 }} />
        </View>
        <View className='flex-auto items-center p-2'>
          <Text className='text-3xl mb-1 font-monsBold'>Dobrodošli</Text>
          <Text className='text-gray-600 mb-8 font-mons'>
            Nastavite sa Googlom ili unesite svoje detalje.
          </Text>
          <Pressable
            className='py-3 m-2 border rounded-lg w-80'
            onPress={accessToken ? getUserData : () => promptAsync({ useProxy: true, showInRecents: true })}
          >
            <View className='items-center justify-center flex-row'>
              <Google width={ICON_SIZE} height={ICON_SIZE} />
              <Text className='ml-2 text-base font-mons'>Log in with Google</Text>
            </View>
          </Pressable>
          <View className='flex-row my-5 justify-between items-center w-80'>
            <View className='flex-1 bg-gray-300 h-[1px]'></View>
            <Text className='mx-2 font-mons'>ili</Text>
            <View className='flex-1 bg-gray-300 h-[1px]'></View>
          </View>
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
            forgetPassword
          />
        </View>
        <View className='flex-initial items-center p-6'>
          <Pressable onPress={handleLogin} className='w-80 bg-zinc-900 py-3 rounded-lg'>
            <Text className='text-white text-lg text-center font-monsSemiBold'>Ulogujte se</Text>
          </Pressable>
          <View className='mt-3 text-base flex-row items-center'>
            <Text className='font-mons'>Nemate nalog? </Text>
            <TouchableOpacity onPress={() => navigator.navigate('Register')}>
              <Text className='font-monsSemiBold'>Registrujte se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default Login