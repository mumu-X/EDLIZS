import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import { ImageSliderType } from '../../Constants/sliderImages'
import Slideritem from './Slideritem'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

type Props = {
  itemList: ImageSliderType[]
}

export default function Slider({itemList}:Props) {
  const scrollX = useSharedValue(0)
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x
    },
  })

  return (
    <View>
      <Animated.FlatList
      
      data={itemList} 
      renderItem={({ item , index }) => 
      (<Slideritem item={item} index={index} scrollX={scrollX} /> 
      )} 
     horizontal={true} 
     showsHorizontalScrollIndicator={false}
     pagingEnabled={true}
     onScroll={onScrollHandler}
      /> 

    </View>
  )
}

const styles = StyleSheet.create({})