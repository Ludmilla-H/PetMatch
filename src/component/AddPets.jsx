import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { insertData } from '../commonjs/db';

const AddPets = () => {

    //initialisation de mes states
    const [name, setName] = useState('anna');
    const [age, setAge] = useState('6');
    const [weight, setWeight] = useState('12');
    const [maladie, setMaladie] = useState('');
    const [step, setStep] = useState(1);


    const userId = useSelector(state => state.user);


    const animal = () => {

        if (step == 3) {
            done();
            //sinon aller à létape suivante
        } else {
            setStep(step + 1)

        }

    }

    const done = () => {
        console.log(name, age, weight, maladie, userId)
        const animalData = { name: name, weight: weight, age: age, userId: userId }

        insertData("animal", animalData)
    }



    return (
        <View>
            <Text>AddPets</Text>

            {(step === 1 &&
                <>
                    <TextInput
                        placeholder="Nom"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        placeholder="Age"
                        value={age}
                        onChangeText={setAge}
                    />
                </>

            )

                || (step === 2 &&
                    <>
                        <TextInput
                            placeholder="Poids"
                            value={weight}
                            onChangeText={setWeight}
                        />

                        <TextInput
                            placeholder="Maladie"
                            value={maladie}
                            onChangeText={setMaladie}
                        />

                    </>
                )
                || (step === 3 &&
                    <Text>Votre animal a bien été ajouter</Text>
                )}


            <Button onPress={animal}>Continuer</Button>



        </View>
    )
}

export default AddPets