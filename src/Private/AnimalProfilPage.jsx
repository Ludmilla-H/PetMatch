import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-paper'


const AnimalProfilPage = ({ navigation , route }) => {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [maladie, setMaladie] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');

    // const { id } = route.params ; 

    const modifier = () => {
        console.log("id",id)
        console.log("name", name, "age", age, "weight", weight, "maladie" , maladie , "description" , description)
        firestore().collection("animal").update({ name, age, weight, maladie, description });


    }

    const back = () => {
        navigation.goBack()
    }

    return (
        <View>
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
            <Button onPress={back}>retour</Button>
        </View>
    )
}

export default AnimalProfilPage