import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import SignInStyles from '../Styles/SignInStyles';


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
    <View style={SignInStyles.container}>
      <Text style={SignInStyles.connexionWord}> Connexion </Text>

      <TextInput
        style={SignInStyles.formSignin}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={SignInStyles.formSignin}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button style={SignInStyles.signInButtons}
              labelStyle={{color:"black", fontSize: 17 }}
              onPress={connection}>Se connectez</Button>
      <Button style={SignInStyles.signInButtons} 
              labelStyle={{color:"black", fontSize: 17}}
              onPress={goToSignUp}>S'inscrire</Button>

    </View>
  )
}

export default SignInScreen