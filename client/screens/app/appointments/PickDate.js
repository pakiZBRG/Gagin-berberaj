import React, { useState } from 'react'
import { View, Text, Pressable, useWindowDimensions } from 'react-native'
import { eachWeekOfInterval, subDays, addDays, eachDayOfInterval, format, differenceInDays, isToday } from 'date-fns'
import PagerView from 'react-native-pager-view'
import { srLatn } from 'date-fns/locale'

import { LeftArrow, RightArrow } from '../../../utils/importSVGs'

const ICON_SIZE = 20;

const dates = eachWeekOfInterval({
  start: subDays(new Date(), 0),
  end: addDays(new Date(), 21)
},
  { weekStartsOn: 1 }
).reduce((acc, cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6)
  })

  acc.push(allDays)
  return acc
}, [])

const options = { locale: srLatn }

const PickDate = ({ previousSlide, style, nextSlide }) => {
  const { width } = useWindowDimensions()
  const [choosenDate, setChoosedDate] = useState()

  const chooseDate = (day) => {
    if (differenceInDays(day, new Date()) >= 0) {
      const dayOfMonth = format(day, 'dd', options)
      const month = format(day, 'MMMM', options)
      const dayInWeek = format(day, 'EEEE', options)

      setChoosedDate(`${dayInWeek}, ${month} ${dayOfMonth}`)
    }
  }

  return (
    <View className='flex flex-1 bg-[#fafafa]' style={{ width }}>
      <View className='flex-initial px-8 py-3 flex flex-row items-center justify-between'>
        <Pressable
          onPress={previousSlide}
          className='text-zinc-200 flex items-center p-1 flex-row justify-center'
        >
          <LeftArrow width={ICON_SIZE} height={ICON_SIZE} />
        </Pressable>
        <Text className='font-monsSemiBold text-2xl'>
          Izaberite vreme
        </Text>
      </View>
      <View className='flex-1 pt-4 px-8 border-t'>
        <PagerView className='flex-1'>
          {dates.map((week, i) => (
            <View key={i}>
              <Text className='text-xl font-monsSemiBold mb-4'>
                {format(week[0], 'MMMM', options)} {format(week[0], 'yyyy', options)}
              </Text>
              <View className='flex flex-row justify-between'>
                {week.map((day, j) => {
                  const past = differenceInDays(day, new Date()) < 0 ? '300' : '900';
                  const today = isToday(day) ? 'text-bp-red' : '';

                  return (
                    <Pressable key={j} className='items-center' onPress={() => chooseDate(day)}>
                      <Text className={`font-mons text-gray-${past}`}>
                        {format(day, 'EEE', options)}
                      </Text>
                      <View className={`mt-2 ${differenceInDays(day, new Date()) >= 0 ? 'bg-bp-beige border' : ''} rounded-full justify-center items-center h-9 w-9`}>
                        <Text className={`font-monsMedium text-base text-gray-${past} ${today}`}>{day.getDate()}</Text>
                      </View>
                    </Pressable>
                  )
                })}
              </View>
            </View>
          ))}
        </PagerView>
        <View className='flex-1'>
          <Text className='font-monsMedium text-xl'>{choosenDate}</Text>
        </View>
      </View>
      <View className='flex-initial items-center p-2 border-t'>
        <Pressable
          android_ripple={{ color: '#fdfaf8' }}
          style={{ ...style.shadow }}
          className='w-[90%] bg-bp-red border py-3 rounded-lg'
          onPress={nextSlide}
        >
          <View className='flex items-center flex-row justify-center'>
            <Text className='font-monsSemiBold text-lg mr-2'>Zakaži</Text>
            <RightArrow width={ICON_SIZE} height={ICON_SIZE} />
          </View>
        </Pressable>
      </View>
    </View >
  )
}

export default PickDate