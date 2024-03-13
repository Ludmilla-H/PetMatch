import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import StylesHome from '../Styles/StylesHome'
import StylesCategorie from '../Styles/StylesCategorie'
import { useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/AntDesign';



const widthD = Dimensions.get('window').width
const heightD = Dimensions.get('window').height


const ItemAnimal = ({ animal }) => {

    const navigation = useNavigation();


    const detailAnimal = (animal) => {
        navigation.navigate('detailhomeanimal', { animal })
        console.log("je suis dans detail animal")
    }


    return (
        <View style={StylesHome.petlist}>
            <TouchableOpacity onPress={() => detailAnimal(animal)} >

            {animal.avatar ? (
                    <Image
                        source={{ uri: animal.avatar }}
                        style={{ width: (widthD - 35) / 2, height: 100, borderRadius: 25 }}
                    />
                ) : (
                    <Text style={StylesHome.noImageText}>Pas d'image disponible</Text>
                )}
            </TouchableOpacity>

            <View style={StylesHome.view1}>
                <Icon name="user" size={25} color="#000" style={StylesHome.iconUser} />
                <Icon name="hearto" size={25} color="#000" />


            </View>
            <View style={StylesHome.view2}>
                <Text style={StylesHome.animalSexe}>{animal.sexe}</Text>
                <Text style={StylesHome.animalName}>{animal.name}</Text>

                {/* <Text >{animal.race}</Text> */}

            </View>
        </View>

    )
}

export default ItemAnimal