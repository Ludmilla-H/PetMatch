import { View, Text, Image } from 'react-native'
import React from 'react'
import StylesHome from '../Styles/StylesHome'

const ItemAnimal = ({ animal }) => {
    return (
        <View>
            <View style={StylesHome.petlist}> 
                {/* <Image source={animal.image} style={StylesHome.petImage}/> */}
            <Text >{animal.categorie}</Text>
            </View>
            
        </View>
    )
}

export default ItemAnimal