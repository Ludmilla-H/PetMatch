import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';




const ProfilPage = ({ navigation }) => {


  //récuperer le state de user dans le store
  const userId = useSelector(state => state.user);
  console.log(userId);

  //initialisation de mes states
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');

  //fonction pour retourner en arrière
  const goBackToHome = () => {
    navigation.goBack()
  }


  const callBackCamera = (response) => {
    console.log(response)
  }

  //modifier et ajouter les données d'un utilisateur dans firestore
  const modifier = () => {

    console.log("email", email, "prenom", prenom, "nom", nom, "numero" , numero)
    firestore().collection("user").doc(userId).update({ nom, prenom, email , numero });

  }

  const read = async () => { 
    const snapUser = await firestore().collection('user').doc(userId).get() ;

    console.log("snapUser" , snapUser.data())
    setEmail(snapUser.data().email)
    setNom(snapUser.data().nom)
    setPrenom(snapUser.data().prenom)
    setNumero(snapUser.data().numero)
  }



  //naviguer jusqu'a la page pour ajouter des animaux
  const addPets = () => {
    navigation.navigate('addPets')
  }

  //se déconnecter de son compte
  const deconnexion = () => {
    auth().signOut();
  }

  useEffect(() => {
    read() ;
  }, [])
  

  return (
    <View>

      <Text>Salut</Text>
      <Text>Bienvenue</Text>

      <TextInput
        placeholder="nom"
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        placeholder="Prenom"
        value={prenom}
        onChangeText={setPrenom}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="numero"
        value={numero}
        onChangeText={setNumero}
      />


      <Button onPress={addPets} > Ajouter un animal </Button>
      <Button onPress={modifier} > Valider les modifications</Button>
      <Button onPress={goBackToHome}>retour</Button>
      <Button onPress={deconnexion}>déconnexion</Button>

    </View>
  )
}

export default ProfilPage