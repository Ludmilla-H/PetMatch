import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { loadData } from '../commonjs/db'
import ModalSubCat from './ModalSubCat'

const ItemCategories = ({categorie}) => {

  const loadCategory = async (id) => {

    console.log("loadCategory => id:", id)
    const dataCategories = await loadData('subcategories');
    // console.log("loadCategory => dataCategories:" , dataCategories) 
    // console.log("dataCatFilter", dataCategories.filter(item => item.category == id))
    const subCategories = dataCategories.filter(item => item.category == id)
        .map(data => {
            // Ajoutez d'autres propriétés ou objets au besoin
            console.log("dataCategories", data.category)

            const newData = {
                category: id,
                data: [
                    { key: data.id, race: data.race },
                ]
            };
            return newData
        })
    // console.log("subCategories:", subCategories)

    // setSubCategories(dataCategories)
    // saveCategorie(subCategories);
    
}

useEffect(() => {
    loadCategory();
}, [])



  return (
    <View>
      <ModalSubCat categorie={categorie}  />
    </View>
  )
}

export default ItemCategories