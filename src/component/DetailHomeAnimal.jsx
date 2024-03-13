import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';
import animals from '../Redux/animals';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import DetailStyles from '../Styles/DetailStyles';

const GreenBig = require('../assets/images/Ellipse18.png');
const orangeLittle = require('../assets/images/Ellipse19.png');
const orangeBig = require('../assets/images/OrangeBig.png');
const GreenLittle = require('../assets/images/GreenLittle.png');


const DetailHomeAnimal = ({ navigation, route }) => {

  //lire dans le store
  const userId = useSelector(state => state.user);

  const { animal } = route.params;
  console.log(route)



  // console.log(animals[0].age)

  const goBackToHome = () => {
    navigation.navigate('Home');
    console.log("je suis dans l'accueil")
  }


  const ProposerSaillie = async () => {
    await addInSaillie();
  }



  const addInSaillie = async () => {
    try {
      // console.log("proposer une saillie:", userI)
      // const afin de récuper les information de ma saillie
      const saillieSend = {
        sender: userId,
        animal: animal.id,
        receiver: animal.userId

      }
      await firestore().collection("saillie").add(saillieSend);
      // console.log(animal)


      console.log('Informations enregistrées avec succès dans la collection "saillie" de Firestore');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la "saillie" de Firestore:', error);
    }
    navigation.navigate("sailliemodal")
  };



  return (

    <View style={DetailStyles.container}>
      <Icon name="arrowleft" size={30} color="#000" onPress={goBackToHome} />

      <Image source={GreenBig} style={{ height: 276, width: 176, position: "absolute", top: 100, right: -20 }} />
      <Image source={orangeLittle} style={{ height: 156, width: 103, position: "absolute", right: 0, bottom: 140, }} />
      <Image source={orangeBig} style={{ height: 198, width: 215, position: "absolute", bottom: -30, }} />
      <Image source={GreenLittle} style={{ height: 156, width: 107, position: "absolute", bottom: 100, }} />

      <View style={DetailStyles.view}>
        <Image
          source={{ uri: animal.avatar }} // Utilisez l'URL comme source
          style={{ width: "90%", height: 220, borderRadius: 20, marginVertical: 20, alignSelf: "center" }} // Ajoutez un style pour définir la taille de l'image
        />
        <View style={DetailStyles.infos}>
          <Text style={DetailStyles.info}>Prénom: {animal.name}</Text>
          <Text style={DetailStyles.info}>Âge: {animal.age}</Text>
          <Text style={DetailStyles.info}>Race: {animal.race}</Text>
          <Text style={DetailStyles.info}>Description: {animal.description}</Text>
        </View>

        <Button onPress={ProposerSaillie}
                labelStyle={{ color: "black", fontSize: 17, backgroundColor: "#FFF", elevation: 3, padding: 10, borderRadius: 25 }}
                > Proposer une saillie </Button>


        {/* <Button onPress={ProprioProfil}> Voir le profil du proprietaire</Button> */}

      </View>


    </View>
  )
}

export default DetailHomeAnimal