import React, { useEffect, useState } from 'react';
import { Dimensions, StatusBar, Text, View } from 'react-native';
import { loadAsync } from 'expo-font';
import Toast from 'react-native-toast-message';

import { Danger, Info, Success, Warning } from './utils/importSVGs';
import { AppProvider } from './context';
import { Router } from './stack/Router';

const width = Dimensions.get('window').width

const ICON_SIZE = 22

const toastConfig = {
  danger: toast => (
    <View
      className={`flex-row items-center px-3 ${toast.text2 ? 'py-[10px]' : 'py-[16px]'} bg-white rounded-md text-sm border-l-[6px] border-l-[#dc143c] mb-2`}
      style={{ width: width * .8, elevation: 15 }}
    >
      <Danger height={ICON_SIZE} width={ICON_SIZE} />
      <View className='ml-2 justify-center w-[270px]'>
        <Text className='font-monsMedium'>Greška</Text>
        {toast.text2 ? <Text className='font-mons text-gray-700 text-xs'>{toast.text2}</Text> : ''}
      </View>
    </View>
  ),
  success: toast => (
    <View
      className={`flex-row items-center px-3 ${toast.text2 ? 'py-[10px]' : 'py-[16px]'} bg-white rounded-md text-sm border-l-[6px] border-l-[#00a400] mb-2`}
      style={{ width: width * .8, elevation: 10 }}
    >
      <Success height={ICON_SIZE} width={ICON_SIZE} />
      <View className='ml-2 justify-cente w-[270px]'>
        <Text className='font-monsMedium'>Uspešno</Text>
        {toast.text2 ? <Text className='font-mons text-gray-700 text-xs'>{toast.text2}</Text> : ''}
      </View>
    </View>
  ),
  warning: toast => (
    <View
      className={`flex-row items-center px-3 ${toast.text2 ? 'py-[10px]' : 'py-[16px]'} bg-white rounded-md text-sm border-l-[6px] border-l-[#ffba00] mb-2`}
      style={{ width: width * .8, elevation: 10 }}
    >
      <Warning height={ICON_SIZE} width={ICON_SIZE} />
      <View className='ml-2 justify-center w-[270px]'>
        <Text className='font-monsMedium'>Upozorenje</Text>
        {toast.text2 ? <Text className='font-mons text-gray-700 text-xs'>{toast.text2}</Text> : ''}
      </View>
    </View>
  ),
  info: toast => (
    <View
      className={`flex-row items-center px-3 ${toast.text2 ? 'py-[10px]' : 'py-[16px]'} bg-white rounded-md text-sm border-l-[6px] border-l-[#3498db] mb-2`}
      style={{ width: width * .8, elevation: 10 }}
    >
      <Info height={ICON_SIZE} width={ICON_SIZE} />
      <View className='ml-2 justify-center w-[270px]'>
        <Text className='font-monsMedium'>Info</Text>
        {toast.text2 ? <Text className='font-mons text-gray-700 text-xs'>{toast.text2}</Text> : ''}
      </View>
    </View>
  )
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  const loadFont = async () => {
    await loadAsync({
      MontserratLight: require('./assets/fonts/Montserrat-Light.ttf'),
      MontserratLightItalic: require('./assets/fonts/Montserrat-LightItalic.ttf'),
      Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
      MontserratItalic: require('./assets/fonts/Montserrat-Italic.ttf'),
      MontserratMedium: require('./assets/fonts/Montserrat-Medium.ttf'),
      MontserratMediumItalic: require('./assets/fonts/Montserrat-MediumItalic.ttf'),
      MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
      MontserratSemiBoldItalic: require('./assets/fonts/Montserrat-SemiBoldItalic.ttf'),
      MontserratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
      MontserratBoldItalic: require('./assets/fonts/Montserrat-BoldItalic.ttf'),
      MontserratExtraBold: require('./assets/fonts/Montserrat-ExtraBold.ttf'),
      MontserratExtraBoldItalic: require('./assets/fonts/Montserrat-ExtraBoldItalic.ttf'),
    })
    setFontLoaded(true)
  }

  useEffect(() => {
    loadFont()
  }, [])

  if (!fontLoaded) return

  return (
    <AppProvider>
      <StatusBar />
      <Router />
      <Toast config={toastConfig} topOffset={20} visibilityTime={3000} />
    </AppProvider >
  );
}
