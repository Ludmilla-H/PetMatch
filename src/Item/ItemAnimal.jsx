import { View, Text, Image, TouchableOpacity } from 'react-native'
import StylesHome from '../Styles/StylesHome'
import StylesCategorie from '../Styles/StylesCategorie'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';


const ItemAnimal = ({ animal }) => {

    const navigation = useNavigation();
    const [animaux, setAnimaux] = useState([]);


        const detailAnimal = (animal) => { 
            navigation.navigate('detailhomeanimal', {animal})
            console.log("je suis dans detail animal")
        }
    

    return (
        <TouchableOpacity onPress={() => detailAnimal(animal)} >
        <View style={StylesHome.petlist}>
                    <Image
                        source={{ uri: animal.avatar }} // Utilisez l'URL comme source
                        style={{ width: 150, height: 100, borderRadius: 20, }} // Ajoutez un style pour définir la taille de l'image
                    />
                <Text >{animal.name}</Text>
                <Text >{animal.sexe}</Text>
                <Text >{animal.raceName}</Text>
                <View>
            </View>

            </View>

        </TouchableOpacity>
    )
}

export default ItemAnimal