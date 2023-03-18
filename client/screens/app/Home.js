import { useContext, useEffect, useRef, useState } from 'react'
import { Pressable, Text, View } from 'react-native'
import jwt from "jwt-decode";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { format } from 'date-fns';
import { srLatn } from 'date-fns/locale';
import { LinearGradient } from 'expo-linear-gradient';

import { AppContext } from '../../context'
import { RightArrow } from '../../utils/importSVGs'
import { useNavigation } from '@react-navigation/native';
import { ApiManager } from '../../api';

const ICON_SIZE = 20

const GRADIENT_COLORS = ['#e24c3b', '#fbf3ef', '#fbf3ef', '#0088e0', '#0088e0', '#e24c3b']
const GRADIENT_START = { x: 0, y: -2 }
const GRADIENT_END = { x: 1, y: 1 }
const GRADIENT_LOCATIONS = [.3, .3, .6, .6, .9, .9];
const MOVEMENT = GRADIENT_LOCATIONS[1] / 20;
const INTERVAL = 30;

let timeout = undefined
const dayInWeekSerbian = format(new Date(), 'EEEE', { locale: srLatn })

const Home = () => {
  const { authData, logout } = useContext(AppContext)
  const decoded = jwt(authData);
  const navigator = useNavigation()
  const [workTime, setWorkTime] = useState({})
  const [isOpen, setIsOpen] = useState(false);
  const [gradientOptions, setGradientOptions] = useState({
    colors: GRADIENT_COLORS,
    start: GRADIENT_START,
    end: GRADIENT_END,
    locations: GRADIENT_LOCATIONS
  })
  const gradientRef = useRef(gradientOptions);
  gradientRef.current = gradientOptions;

  const reset = () => {
    if (timeout !== undefined) {
      clearTimeout(timeout)
      timeout = undefined
    }

    setGradientOptions({
      colors: GRADIENT_COLORS,
      start: GRADIENT_START,
      end: GRADIENT_END,
      locations: GRADIENT_LOCATIONS
    })
  }

  const infiniteRainbow = () => {
    if (gradientRef.current.locations[1] - MOVEMENT <= 0) {
      let gradientColors = [...gradientRef.current.colors];
      gradientColors.shift();
      gradientColors.push(gradientColors[1])

      setGradientOptions({
        colors: gradientColors,
        start: GRADIENT_START,
        end: GRADIENT_END,
        locations: GRADIENT_LOCATIONS
      })
    } else {
      let updateLocations = gradientRef.current.locations.map((item, i) => {
        if (i === gradientRef.current.locations.length - 1) {
          return 1;
        }

        return parseFloat(Math.max(0, item - MOVEMENT).toFixed(2));
      });

      setGradientOptions({
        colors: [...gradientRef.current.colors],
        start: GRADIENT_START,
        end: GRADIENT_END,
        locations: updateLocations
      })
    }

    timeout = setTimeout(infiniteRainbow, INTERVAL);
  }

  // useEffect(() => {
  //   infiniteRainbow()
  // }, [])

  const getWorkTime = async () => {
    const { data } = await ApiManager('/working-time', 'GET')
    setWorkTime(data[0])
  }

  useEffect(() => {
    getWorkTime()
  }, []);

  const checkIsOpen = () => {
    const hour = format(new Date(), 'k');
    const minute = format(new Date(), 'm');
    const time = `${hour}:${minute}`
    const dayInWeek = format(new Date(), 'EEEE').toLowerCase();
    let workTimeOfDay;

    Object.keys(workTime).find(a => {
      if (a === dayInWeek) workTimeOfDay = workTime[a]
    })

    if (workTimeOfDay) {
      setIsOpen(time > workTimeOfDay.start && time < workTimeOfDay.end)
    }
  }

  useEffect(() => {
    checkIsOpen()
  }, [])

  return (
    <View className='flex-auto bg-[#fafafa]'>
      <View className='flex-initial p-8 flex flex-row items-center justify-between'>
        <Text className='font-monsMedium text-xl'>Dobrodošao,
          <Text className='font-monsBold'> {decoded.username}</Text>
        </Text>
        <Pressable onPress={logout}>
          <MaterialIcons name='logout' size={ICON_SIZE} />
        </Pressable>
      </View>
      <View className='flex-auto px-8 py-4'>
        <Pressable
          onPress={() => navigator.navigate('Book')}
          android_ripple={{ color: '#e76f62' }}
          style={style.shadow}
          className='border bg-bp-red px-4 py-3 h-40 rounded-lg flex items-end justify-end'
        >
          <View className='flex flex-row items-center'>
            <Text className='font-monsMedium text-xl mr-2'>Zakaži termin</Text>
            <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </Pressable>
        <Pressable
          android_ripple={{ color: '#fdfaf8' }}
          style={style.shadow}
          className='border mt-4 bg-bp-beige px-4 py-3 h-40 rounded-lg flex items-end justify-end'
        >
          <View className='flex flex-row items-center'>
            <Text className='font-monsMedium text-xl mr-2'>Zakazani termini</Text>
            <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </Pressable>
        <Pressable
          android_ripple={{ color: '#329fe6' }}
          style={style.shadow}
          className='border mt-4 bg-bp-blue px-4 py-3 h-40 rounded-lg flex items-end justify-end'
        >
          <View className='flex flex-row items-center'>
            <Text className='font-monsMedium text-xl mr-2'>Cenovnik</Text>
            <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </Pressable>
        <Pressable
          android_ripple={{ color: '#fdfaf8' }}
          style={style.shadow}
          className='border mt-4 bg-bp-beige px-4 py-3 h-14 rounded-lg flex justify-center'
        >
          <View className='flex-row items-center justify-between'>
            <LinearGradient
              className='h-6 w-28 border'
              colors={gradientOptions.colors}
              start={gradientOptions.start}
              end={gradientOptions.end}
              locations={gradientOptions.locations}
            >
              {/* <Text className='text-black font-mons'>{isOpen ? 'Otvoreno' : "Zatvoreno"}</Text> */}
            </LinearGradient>
            <View className='flex flex-row items-center'>
              <Text className='font-monsMedium text-xl mr-2'>Radno vreme</Text>
              <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default Home

const style = {
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4
  }
}