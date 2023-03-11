import React, { useRef, useState } from 'react'
import { View, Text, FlatList, Pressable } from 'react-native'

import Item from './Item';

const slides = [
  { id: 1, name: 'Izaberite uslugu', button: 'Datum' },
  { id: 2, name: 'Izaberite datum', button: 'Pregled' },
  { id: 3, name: 'Pregled', button: "Zakaži" }
]

const Book = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);

  const viewableItemsChanges = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index)
  }).current;

  const navigateDots = (id) => {
    if (currentIndex > id) {
      slidesRef.current.scrollToIndex({ index: id })
    }
  }

  const renderDot = id => {
    let bgColor, numColor, textColor, borderColor, text;

    if (id === 0) text = 'Usluga'
    else if (id === 1) text = 'Datum'
    else text = 'Zakaži'

    if (currentIndex === id) {
      if (currentIndex === 0) bgColor = 'bg-bp-red';
      else if (currentIndex === 1) bgColor = 'bg-bp-beige';
      else bgColor = 'bg-bp-blue';
      numColor = 'text-zinc-900';
      textColor = 'text-zinc-900';
    } else if (currentIndex > id) {
      bgColor = 'bg-zinc-400';
      numColor = 'text-white';
      textColor = 'text-zinc-400';
      borderColor = 'border-zinc-400';
    } else {
      borderColor = 'border-zinc-400';
      numColor = 'text-zinc-400';
      textColor = 'text-zinc-400';
    }

    return (
      <Pressable key={id} className='items-center' onPress={() => navigateDots(id)}>
        <View className='flex-row items-center'>
          <View className={`h-5 w-5 border ${borderColor} ${bgColor} items-center justify-center rounded-full`}>
            <Text className={`${numColor} font-mons text-xs`}>{id + 1}</Text>
          </View>
          <Text className={`${textColor} text-xs font-monsSemiBold ml-1`}>{text}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <View className='flex-auto bg-[#fafafa]'>
      <View className='flex-initial px-8 py-3 flex flex-row items-center justify-between'>
        {slides.map((_, id) => renderDot(id))}
      </View>
      <FlatList
        data={slides}
        renderItem={({ item }) =>
          <Item
            item={item}
            slidesRef={slidesRef}
            currentIndex={currentIndex}
            slides={slides}
          />
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        scrollEnabled={false}
        onViewableItemsChanged={viewableItemsChanges}
        ref={slidesRef}
      />
    </View>
  )
}

export default Book