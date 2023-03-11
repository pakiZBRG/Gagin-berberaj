import { useContext, useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import jwt from "jwt-decode";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { AppContext } from '../../context'
import { RightArrow } from '../../utils/importSVGs'
import { useNavigation } from '@react-navigation/native';

const ICON_SIZE = 20

const Home = () => {
  const { authData, logout } = useContext(AppContext)
  const navigator = useNavigation()

  const decoded = jwt(authData);

  const handleLogout = () => logout();

  return (
    <View className='flex-auto bg-[#fafafa]'>
      <View className='flex-initial p-8 flex flex-row items-center justify-between'>
        <Text className='font-monsMedium text-xl'>Dobrodošao,
          <Text className='font-monsBold'> {decoded.username}</Text>
        </Text>
        <Pressable onPress={handleLogout}>
          <MaterialIcons name='logout' size={ICON_SIZE} />
        </Pressable>
      </View>
      <View className='flex-auto px-8 py-4'>
        <Pressable
          onPress={() => navigator.navigate('Book')}
          android_ripple={{ color: '#e76f62' }}
          style={style.shadow}
          className='border bg-[#E24C3B] px-4 py-3 h-40 rounded-lg flex items-end justify-end'
        >
          <View className='flex flex-row items-center'>
            <Text className='font-monsMedium text-xl mr-2'>Zakaži termin</Text>
            <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </Pressable>
        <Pressable
          android_ripple={{ color: '#fdfaf8' }}
          style={style.shadow}
          className='border mt-5 bg-[#FBF3EF] px-4 py-3 h-40 rounded-lg flex items-end justify-end'
        >
          <View className='flex flex-row items-center'>
            <Text className='font-monsMedium text-xl mr-2'>Zakazani termini</Text>
            <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </Pressable>
        <Pressable
          android_ripple={{ color: '#329fe6' }}
          style={style.shadow}
          className='border mt-5 bg-[#0088E0] px-4 py-3 h-40 rounded-lg flex items-end justify-end'
        >
          <View className='flex flex-row items-center'>
            <Text className='font-monsMedium text-xl mr-2'>Cenovnik</Text>
            <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </Pressable>
      </View>
      <View className='flex-initial p-8'>
        <Text>asdd</Text>
      </View>
    </View>
  )
}

export default Home

const style = {
  shadow: {
    shadowColor: "#111111",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.16,
    shadowRadius: 1.51,
    elevation: 2
  }
}