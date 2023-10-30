import { View, Text } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import auth from '@react-native-firebase/auth';
import Categories from '../component/Categories';


const HomePage = ({navigation}) => {


    const goToSignIn = () => {
        navigation.navigate('signin');
    }
    const goToSignUp = () => {
        navigation.navigate("signup");
    }
    const goToProfile = () => {
        navigation.navigate("profile");
     }

     const deconnexion = () => {

      auth().signOut();
  
    }
  

  return (
    <View>
      <Text>Page d'accueil</Text>
      <Categories/>
      <Button onPress={goToSignUp}>S'inscrire</Button>
      <Button onPress={goToSignIn}>connectez-vous</Button>
      <Button onPress={goToProfile}>Mon profil</Button>
      <Button onPress={deconnexion}>déconnexion</Button>
    </View>
  )
}

export default HomePage