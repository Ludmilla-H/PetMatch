import { View, Text, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import StylesProfile from '../Styles/StylesProfile';
import Icon from 'react-native-vector-icons/AntDesign';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import ImageProfilePage from '../component/ImageProfilePage';


const GreenBig = require('../assets/images/Ellipse18.png');
const orangeLittle = require('../assets/images/Ellipse19.png');
const orangeBig = require('../assets/images/OrangeBig.png');
const GreenLittle = require('../assets/images/GreenLittle.png');


const ProfilPage = ({ navigation , route}) => {


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
    if (response.didCancel) {
      console.log('L\'utilisateur a annulé la prise de la photo');
    } else if (response.error) {
      console.log('Erreur :', response.error);
    } else {
      console.log('Image prise avec succès. Voici les détails :', response);

      // Vous pouvez utiliser response.uri pour accéder à l'URI de la photo.
    }
  }

  //choisir une image a partir l'appareil photo
  const choisirEtEnvoyerImage = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true, // do not backup to iCloud
        path: 'images', // store camera images under Pictures/images for android and Documents/images for iOS
      },
    }

    const result = await launchCamera(options, callBackCamera)
    // console.log("result:", result.assets[0].uri)

    // Obtenir le nom du fichier à partir de l'URI
    const fileName = result.assets[0].uri.split('/').pop()

    // Spécifier le dossier dans lequel vous voulez stocker l'image (imagesUsers)
    const reference = storage().ref().child(`imagesUsers/${fileName}`);
    // console.log("reference:", reference)

    const pathToFile = `${result.assets[0].uri}`;
    // console.log("pathToFile:", pathToFile)

    await reference.putFile(pathToFile);
    const url = await reference.getDownloadURL();

    console.log('Image envoyée avec succès !', url);
    firestore().collection("user").doc(userId).update({ avatar: url });

  };


  //modifier et ajouter les données d'un utilisateur dans firestore
  const modifier = () => {

    console.log("email", email, "prenom", prenom, "nom", nom, "numero", numero)
    firestore().collection("user").doc(userId).update({ nom, prenom, numero });

  }

  const read = async () => {
    const snapUser = await firestore().collection('user').doc(userId).get();

    console.log("snapUser", snapUser.data())
    setEmail(snapUser.data().email)
    setNom(snapUser.data().nom)
    setPrenom(snapUser.data().prenom)
    setNumero(snapUser.data().numero)
  }


  //naviguer jusqu'a la page pour ajouter des animaux
  const addPets = () => {
    navigation.navigate('addPets')
  }

  const goToAnimalProfile = (animalID) => {
    navigation.navigate('animalProfile', {animalID})
  }

  //se déconnecter de son compte
  const deconnexion = () => {
    auth().signOut();
  }

  useEffect(() => {
    read();
  }, [])


  return (
    <View style={StylesProfile.container}>

      <Image source={GreenBig} style={{ height: 276, width: 176, position: "absolute", top: 100, right: -20}} />
      <Image source={orangeLittle} style={{ height: 156, width: 103, position: "absolute", right: 0, bottom: 180, }} />
      <Image source={orangeBig} style={{ height: 198, width: 215, position: "absolute", bottom: -30, }} />
      <Image source={GreenLittle} style={{ height: 156, width: 107, position: "absolute", bottom: 100, }} />

      <Icon name="arrowleft" size={30} color="#000" onPress={goBackToHome} />

      <View style={StylesProfile.avatar}>
        <View>

          <Text style={StylesProfile.salut}>Salut ,</Text>
          <Text style={StylesProfile.welcome}>Bienvenue</Text>

        </View>
        <ImageProfilePage />
      </View>

      <View style={StylesProfile.bar}>
        <Button labelStyle={{ color: "#000", textDecorationLine: "underline" }} onPress={goToAnimalProfile}>Mon profil</Button>
        <Button labelStyle={{ color: "#000", textDecorationLine: "underline" }} onPress={goToAnimalProfile}>Mes animaux</Button>
      </View>

      <TextInput
        style={StylesProfile.input}
        placeholder="nom"
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        style={StylesProfile.input}
        placeholder="Prenom"
        value={prenom}
        onChangeText={setPrenom}
      />

      <TextInput
        style={StylesProfile.input}
        placeholder="numero"
        value={numero}
        onChangeText={setNumero}
      />


      <Button onPress={modifier} labelStyle={{ color: "#000", left: -80, }}> Valider les modifications</Button>
      <Button onPress={deconnexion}>déconnexion</Button>
      <Button onPress={addPets}> + ajouter un animal</Button>
      <Button onPress={choisirEtEnvoyerImage}> choisir une image </Button>
      {/* <Button onPress={saveImage}>save image</Button> */}



    </View>
  )
}

export default ProfilPage