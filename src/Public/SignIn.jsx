import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';

const SignIn = ({navigation}) => {

  const goToSignUp = () => {
    navigation.navigate('signup');
}

  return (
    <View>
      <Text>SignIn</Text>
      <Button onPress={goToSignUp}>Se connecter</Button>

    </View>
  )
}

export default SignIn