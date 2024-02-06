import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button } from 'react-native-paper'
import StylesProfile from '../Styles/StylesProfile'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';

const MyAnimalsPage = ({ navigation }) => {

    const userId = useSelector(state => state.user);
    console.log(userId);

    const [animalIds, setAnimalIds] = useState([]);
    const [loading, setLoading] = useState(true);




    const getAnimalsForUser = async () => {
        try {
            const snapShot = await firestore().collection("animal").where("userId", "==", userId).get();
            console.log("snapShot", snapShot)

            const getAnimalId = snapShot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });

            // const getAnimalId = snapShot.docs.map(doc => doc.id);
            console.log(getAnimalId)
            setAnimalIds(getAnimalId);

        } catch (error) {
            console.log("error", error)

            // } finally {
            //     setLoading(false) ;
        }
    }

    // Afficher un indicateur de chargement pendant le chargement des données
    // if (loading) {
    //     return <ActivityIndicator size="large" color="#000" />; 
    //   }


    const detailAnimalProfil = (animalId) => {
        navigation.navigate('animalProfile', { animalId });
        console.log(animalId)
    };

    // appel de la fonction pour récupérer les animaux
    useEffect(() => {
        getAnimalsForUser();
    }, [userId])


    const goToMyProfile = () => {
        navigation.navigate('profilePage')
        console.log("in my profile")
    }

    return (
        <>
            <Text>MyAnimalsPage</Text>
            <View style={StylesProfile.bar}>
                <Button labelStyle={{ color: "#000", textDecorationLine: "underline" }} onPress={goToMyProfile}>Mon profil</Button>
                <Button labelStyle={{ color: "#000", textDecorationLine: "underline" }} >Mes animaux</Button>
            </View>

            {/* Votre liste d'animaux avec leurs données */}
            <FlatList
                data={animalIds} 
                numColumns={"2"}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => detailAnimalProfil(item.id)}>
                        <Text style={{ textDecorationLine: 'underline' }}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.id.toString()}

            />

        </>
    )
}

export default MyAnimalsPage