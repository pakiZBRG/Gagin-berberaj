import React, { useEffect, useState } from 'react'
import { View, Text, Pressable, FlatList, useWindowDimensions } from 'react-native'
import { ApiManager } from '../../../api';

import { LeftArrow, RightArrow } from '../../../utils/importSVGs'

const ICON_SIZE = 20;

const PickService = ({ previousSlide, style, nextSlide }) => {
  const { width } = useWindowDimensions()
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

  return (
    <View className='flex flex-1 bg-[#fafafa]' style={{ width }}>
      <View className='flex-initial px-8 py-2 flex flex-row items-center justify-between'>
        <Pressable
          onPress={previousSlide}
          className='text-zinc-200 flex items-center p-1 flex-row justify-center'
        >
          <LeftArrow width={ICON_SIZE} height={ICON_SIZE} />
        </Pressable>
        <Text className='font-monsSemiBold text-2xl'>
          Izaberite uslugu
        </Text>
      </View>
      <View className='flex-1 pt-4' style={style.shadow}>
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
              <Text className='font-monsMedium text-base leading-5 w-5/6'>{item.name}</Text>
              <Text className='font-monsSemiBold absolute bottom-1 right-1'>{item.price}<Text className='text-xs'>RSD</Text></Text>
            </Pressable>
          )}
        />
      </View>
      {selectedServiceId ?
        <View className='flex-initial items-center p-3'>
          <Pressable
            android_ripple={{ color: '#fdfaf8' }}
            style={{ ...style.shadow, opacity: Boolean(!selectedServiceId) ? 0.4 : 1 }}
            className='w-[90%] bg-bp-red border py-3 rounded-lg'
            onPress={nextSlide}
            disabled={Boolean(!selectedServiceId)}
          >
            <View className='flex items-center flex-row justify-center'>
              <Text className='font-monsSemiBold text-lg mr-2'>Vreme</Text>
              <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
            </View>
          </Pressable>
        </View>
        : ''
      }
    </View>
  )
}

export default PickService