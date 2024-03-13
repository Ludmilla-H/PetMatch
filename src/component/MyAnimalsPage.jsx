import { View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button } from 'react-native-paper'
import StylesProfile from '../Styles/StylesProfile'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore';
import AnimalProfilPage from '../Private/AnimalProfilPage'
import AnimalPageStyles from '../Styles/AnimalPageStyles'
import StylesHome from '../Styles/StylesHome'
import Icon from 'react-native-vector-icons/AntDesign';


const widthD = Dimensions.get('window').width


const GreenBig = require('../assets/images/Ellipse18.png');
const orangeLittle = require('../assets/images/Ellipse19.png');
const orangeBig = require('../assets/images/OrangeBig.png');
const GreenLittle = require('../assets/images/GreenLittle.png');

const MyAnimalsPage = ({ navigation }) => {

    const userId = useSelector(state => state.user);
    console.log(userId);

    const [animalIds, setAnimalIds] = useState([]);
    const [loading, setLoading] = useState(true);


    const getAnimalsForUser = async () => {
        // setLoading(false);
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

    //Afficher un indicateur de chargement pendant le chargement des données
    // if (loading) {
    //     return <ActivityIndicator size="large" color="#000" />; 
    // }


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
            <View style={AnimalPageStyles.container}>
                <View style={StylesProfile.bar}>
                    <Button labelStyle={{ color: "#000", textDecorationLine: "underline" }} onPress={goToMyProfile}>Mon profil</Button>
                    <Button labelStyle={{ color: "#000", textDecorationLine: "underline" }} >Mes animaux</Button>
                </View>

                <Image source={GreenBig} style={{ height: 276, width: 176, position: "absolute", top: 100, right: -20 }} />
                <Image source={orangeLittle} style={{ height: 156, width: 103, position: "absolute", right: 0, bottom: 180, }} />
                <Image source={orangeBig} style={{ height: 198, width: 215, position: "absolute", bottom: -30, }} />
                <Image source={GreenLittle} style={{ height: 156, width: 107, position: "absolute", bottom: 100, }} />

                {/* Votre liste d'animaux avec leurs données */}
                <FlatList
                    data={animalIds}
                    numColumns={"2"}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => detailAnimalProfil(item.id)}>
                            <View style={StylesHome.petlist}>
                                <Image
                                    source={{ uri: item.avatar }} // Utilisez l'URL comme source
                                    style={{ width: (widthD - 38) / 2, height: 100, borderRadius: 20, }} // Ajoutez un style pour définir la taille de l'image
                                />
                <View style={StylesHome.view1}>
                                    <Icon name="user" size={25} color="#000" style={StylesHome.iconUser} />
                                    <Icon name="hearto" size={25} color="#000" />


                                </View>
                                <View style={StylesHome.view2}>
                                <Text style={StylesHome.animalSexe} >{item.sexe}</Text>

                                    <Text style={StylesHome.animalName}>{item.name}</Text>



                                </View>
                            </View>

                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id.toString()}
                />

            </View>
        </>
    )
}

export default MyAnimalsPage