import { FlatList, Dimensions, useWindowDimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import ItemAnimal from '../Item/ItemAnimal';
import { useNavigation } from '@react-navigation/native';


const PetList = () => {

    const navigation = useNavigation()
    // console.log(animals);

    //lire dans le store
    const animals = useSelector(state => state.animals);
    // console.log("subCategorykey", subCategorykey)



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

