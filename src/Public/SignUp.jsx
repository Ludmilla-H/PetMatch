import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

const SignUp = ({navigation}) => {

  const goToSignIn = () => {
    navigation.navigate('signin');
}

  return (
    <View>
      <Text>SignUp</Text>
      <Button onPress={goToSignIn}>S'inscrire</Button>

    </View>
  )
}

export default SignUp