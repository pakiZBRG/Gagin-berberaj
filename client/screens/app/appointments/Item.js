import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, useWindowDimensions, FlatList, TouchableOpacity } from 'react-native'

import { LeftArrow, RightArrow } from '../../../utils/importSVGs'
import { useNavigation } from '@react-navigation/native';
import { ApiManager } from '../../../api';

const ICON_SIZE = 20;

const Item = ({ item, slidesRef, slides, currentIndex }) => {
  const { width } = useWindowDimensions()
  const navigator = useNavigation()
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');

  const getServices = async () => {
    const data = await ApiManager('/service', 'GET');
    setServices(data.data)
  }

  useEffect(() => {
    getServices()
  }, [])

  const selectedService = (item) => {
    setSelectedServiceId(item._id)
  }

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 })
    } else {
      console.log('ende')
    }
  }

  const previousSlide = () => {
    if (currentIndex !== 0) {
      slidesRef.current.scrollToIndex({ index: currentIndex - 1 })
    } else {
      navigator.navigate('Home')
    }
  }

  const btnColor = () => {
    if (item.id === 1) return 'bg-bp-red'
    else if (item.id === 2) return 'bg-bp-beige'
    else return 'bg-bp-blue'
  }

  return (
    <View className='flex flex-1 bg-[#fafafa]' style={{ width }}>
      <View className='flex-initial px-8 py-2 flex flex-row items-center justify-between'>
        <Pressable
          onPress={previousSlide}
          className='text-zinc-200 flex items-center p-1 flex-row justify-center'
        >
          <LeftArrow width={ICON_SIZE} height={ICON_SIZE} />
        </Pressable>
        <Text className='font-monsSemiBold text-xl'>
          {item.name}
        </Text>
      </View>
      <View className='flex-1 py-4' style={style.shadow}>
        <FlatList
          data={services}
          numColumns={2}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ width: '90%', alignSelf: 'center' }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => selectedService(item)}
              className={`border bg-bp-beige flex-1 m-2 h-32 rounded-lg py-1 px-2 ${item._id === selectedServiceId ? 'bg-bp-red' : 'bg-bp-beige'}`}
              style={style.shadow}
            >
              <Text className='font-monsMedium text-base'>{item.name}</Text>
              <Text className='font-monsSemiBold absolute bottom-1 right-1'>{item.price}<Text className='text-xs'>RSD</Text></Text>
            </Pressable>
          )}
        />
      </View>
      <View className='flex-initial items-center p-2'>
        <Pressable
          android_ripple={{ color: '#fdfaf8' }}
          style={style.shadow}
          className={`w-80 ${btnColor()} border py-3 rounded-lg`}
          onPress={nextSlide}
        >
          <View className='text-zinc-900 flex items-center flex-row justify-center'>
            <Text className='font-monsSemiBold text-lg mr-2'>{item.button}</Text>
            <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </Pressable>
      </View>
    </View >
  )
}

export default Item

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