import { View, Text } from 'react-native'
import React from 'react'

const ItemCategories = ({categories}) => {
  return (
    <View>
      <Text>{categories.name}</Text>
    </View>
  )
}

export default ItemCategories