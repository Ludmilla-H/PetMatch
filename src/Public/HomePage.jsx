import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import Detail from '../component/Detail'

const HomePage = ({navigation}) => {

    const goToSignIn = () => {
        navigation.navigate('signin');
    }
    const goToSignUp = () => {
        navigation.navigate('signin');
    }
    const goToDetail = () => {
        navigation.navigate('detail');
    }

  return (
    <View>
      <Text>Page d'accueil</Text>
      <Button onPress={goToSignUp}>S'inscrire</Button>
      <Button onPress={goToSignIn}>connectez-vous</Button>
    </View>
  )
}

export default HomePage