import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const HomePage = ({navigation}) => {

    const goToSignIn = () => {
        navigation.navigate('signin');
    }

  return (
    <View>
      <Text>HomePage</Text>
      <Button onPress={goToSignIn}>Se connecter</Button>
    </View>
  )
}

export default HomePage