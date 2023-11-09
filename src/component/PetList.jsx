import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { loadDataPets } from '../commonjs/db';
import ItemAnimal from '../Item/ItemAnimal';

const PetList = () => {

    const [animals, setAnimal] = useState([]) 
    console.log(animals);

    //lire dans le store
    const categorieKey = useSelector(state => state.categorie);

    //déclencher la fonction afin de charger les animaux par catégories
    const loadPetsByCat = async () => {
        const snapShotPet = await loadDataPets(categorieKey)
        console.log(snapShotPet)
        setAnimal(snapShotPet) ;

    }

    //dés qu'il y a un changement, il déclenche sur une catégorie
    useEffect(() => {
        console.log(categorieKey)
        loadPetsByCat();
    }, [categorieKey])


    return (
        <View>
            <FlatList
            data = {animals}
            renderItem = {({item}) => <ItemAnimal animal={item}/>}
            keyExtractor = {item => item.id}
            numColumns={2}
            />
        </View>
    )
}

export default PetList