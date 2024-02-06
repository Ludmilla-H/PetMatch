import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux';
import { loadDataPets, loadDataPetsBySubCat } from '../commonjs/db';
import ItemAnimal from '../Item/ItemAnimal';
import { useNavigation } from '@react-navigation/native';

const PetList = () => {

    const navigation = useNavigation()

    // const [animals, setAnimal] = useState([]) 
    console.log(animals);

    //lire dans le store
    const animals = useSelector(state => state.animals);
    // console.log("subCategorykey", subCategorykey)

    // const detailAnimal = (animals) => { 
    //     navigation.navigate('detailhomeanimal', {animals})
    //     console.log("je suis dans detail animal")
    // }


    return (
        <>
                <FlatList
                    data={animals}
                    renderItem={({ item }) => <ItemAnimal animal={item} />}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />

        </>
    )
}

export default PetList