import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import animals from '../Redux/animals';
import { Button } from 'react-native-paper';


const DetailHomeAnimal = ({ navigation , route }) => {

  //lire dans le store

  const {animal} = route.params ;
  console.log(route)

  

  // console.log(animals[0].age)

  const goBackToHome = () => {
    navigation.navigate('Home');
    console.log("je suis dans l'accueil")
  }

const ProprioProfil = () => {

  
}

  return (

    <View>
      <Icon name="arrowleft" size={30} color="#000" onPress={goBackToHome} />
        <View >
          <Image
            source={{ uri: animal.avatar }} // Utilisez l'URL comme source
            style={{ width: "100%", height: 260, borderRadius: 20, marginVertical: 20 }} // Ajoutez un style pour définir la taille de l'image
          />
          <Text>Nom: {animal.name}</Text>
          <Text>Age: {animal.age}</Text>
          <Text>Race: {animal.race}</Text>
          <Text>Description: {animal.description}</Text>
        </View>

        <Button onPress={ProprioProfil}> Voir le profil du proprietaire</Button>
    
    </View>
  )
}

export default DetailHomeAnimal