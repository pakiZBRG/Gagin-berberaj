import React from 'react'
import { useNavigation } from '@react-navigation/native';

import PickService from './PickService';
import { View } from 'react-native';
import PickDate from './PickDate';

const Item = ({ item, slidesRef, slides, currentIndex }) => {
  const navigator = useNavigation()

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

  return (
    <View>
      {item.id === 1 &&
        <PickService
          nextSlide={nextSlide}
          previousSlide={previousSlide}
          style={style}
        />}
      {item.id === 2 &&
        <PickDate
          nextSlide={nextSlide}
          previousSlide={previousSlide}
          style={style}
        />}
    </View>
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