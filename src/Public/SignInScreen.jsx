import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';


const SignInScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToSignUp = () => {
    navigation.navigate('signup');
    }
  
  const connection = async () => {

    try {

      await auth().signInWithEmailAndPassword( email , password )

      } catch (error) {
          console.log("error" , error)
      }
      console.log("connecter")
  }

  
  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button onPress={connection}>Se connectez</Button>
      <Button onPress={goToSignUp}>S'inscrire</Button>

    </View>
  )
}

export default SignInScreen