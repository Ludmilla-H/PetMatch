import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { loadData } from '../commonjs/db'
import ModalSubCat from './ModalSubCat'

const ItemCategories = ({categorie}) => {

  const loadCategory = async (id) => {
    
    const dataCategories = await loadData('subcategories');
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