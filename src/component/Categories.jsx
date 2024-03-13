import { View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { loadData } from '../commonjs/db';
import ItemCategories from '../Item/ItemCategories';


const Categories = () => {

    const [categories, setCategories] = useState([]);
    
    const loadCategory = async () => {

        const dataCategories = await loadData('categories');

        setCategories(dataCategories)
    }

    useEffect(() => {
        loadCategory();
    }, [])


    return (
        <View >
            <FlatList
                data={categories}
                renderItem={({item})=> <ItemCategories categorie={item}/>}
                keyExtractor={item => item.id}
                horizontal={true}
            />
        </View>
    )
}

export default Categories

