import { View, Text, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'
import StylesHome from '../Styles/StylesHome';
import StylesProfile from '../Styles/StylesProfile';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';


const GreenBig = require('../assets/images/Ellipse18.png');
const orangeLittle = require('../assets/images/Ellipse19.png');
const orangeBig = require('../assets/images/OrangeBig.png');
const GreenLittle = require('../assets/images/GreenLittle.png');


const AnimalProfilPage = ({ navigation, route }) => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [maladie, setMaladie] = useState('');
    const [description, setDescription] = useState('');

    const { id } = route.params ; 




    //fonction pour retourner en arrière
    const goBackToHome = () => {
        navigation.goBack()
    }


    const modifier = (animalID) => {

            console.log("id", animalID)
            console.log("name", name, "age", age, "weight", weight, "maladie", maladie, "description", description)
            firestore().collection("animal").doc(animalID).update({ name, age, weight, maladie, description });
            
            console.log("error")
    }



    const goToAnimalProfile = () => {
        navigation.navigate('animalProfile')
    }

    return (
        <View style={StylesHome.container}>

            <Icon name="arrowleft" size={30} color="#000" onPress={goBackToHome} />


            <View style={StylesProfile.bar}>
                <Button labelStyle={{ color: "#000", textDecorationLine: "underline" }} onPress={goToAnimalProfile}>Mon profil</Button>
                <Button labelStyle={{ color: "#000", textDecorationLine: "underline" }} onPress={goToAnimalProfile}>Mes animaux</Button>
            </View>


            <Image source={GreenBig} style={{ height: 276, width: 176, position: "absolute", top: 100, right: -20, objectFit: 60, }} />
            <Image source={orangeLittle} style={{ height: 156, width: 103, position: "absolute", right: 0, bottom: 180, }} />
            <Image source={orangeBig} style={{ height: 198, width: 215, position: "absolute", bottom: -30, }} />
            <Image source={GreenLittle} style={{ height: 156, width: 107, position: "absolute", bottom: 100, }} />

            <Text>AnimalProfilPage</Text>
            <TextInput
                placeholder="Nom"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                placeholder="Poids"
                value={weight}
                onChangeText={setWeight}
            />

            <TextInput
                placeholder="Age de l'animal"
                value={age}
                onChangeText={setAge}
            />

            <TextInput
                placeholder="Maladie"
                value={maladie}
                onChangeText={setMaladie}
            />

            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />


            <Button onPress={modifier}>Valider les modifications</Button>
        </View>
    )
}

export default AnimalProfilPage