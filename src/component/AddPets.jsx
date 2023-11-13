import { View, Text, TextInput } from 'react-native'
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { insertData } from '../commonjs/db';
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { loadData } from '../commonjs/db';
import Icon from 'react-native-vector-icons/AntDesign';



const AddPets = ({ navigation }) => {

    //initialisation de mes states
    const [name, setName] = useState('anna');
    const [age, setAge] = useState('6');
    const [weight, setWeight] = useState('12');
    const [maladie, setMaladie] = useState('aucune');
    const [sexe, setSexe] = useState('male');
    const [image, setImage] = useState('NI');
    const [step, setStep] = useState(1);

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [subCategoryId, setSubCategoryId] = useState();


    const userId = useSelector(state => state.user);


    const animal = () => {

        if (step == 5) {
            done();
            //sinon aller à létape suivante
        } else {
            setStep(step + 1)
        }
    }

    const done = () => {
        console.log(name, age, weight, maladie, userId)
        const animalData = { name: name, weight: weight, age: age, race: subCategoryId, sexe: sexe, image: image, maladie: maladie, userId: userId }

        insertData("animal", animalData)
    }

    const goToProfil = () => {
        navigation.navigate('profilePage')
    }

    //fonction pour récupérer les sous-catégorie grâce à leur id et leur race
    const getSubCategory = async (key) => {
        setCategoryId(key)
        const subcategories = await loadData('subcategories')
        const subcategoriesData = subcategories.filter(item => item.category == key)
            .map(data => {
                const newData = { key: data.id, value: data.race }
                return newData
            })
        setSubCategory(subcategoriesData);
        console.log(subcategoriesData)
    }


    //charge et récupere les données de la collection catégories dans la base de donnée
    const allCategory = async () => {

        const categories = await loadData('categories')

        const dataCategory = categories.map(data => {
            const newData = { key: data.id, value: data.name }
            return newData
        })
        setCategory(dataCategory)
    }

    //lorsque la catégorie a été sélectionné cette fonction déclenche la sélection de sous catégorie
    const categorieAndSubValue = (key) => {

        setSubCategoryId(key)
        console.log("subcategories", key, "categorie", categoryId)

    }

    useEffect(() => {
        allCategory()
    }, [])


    return (
        <View>

            <Icon name="arrowleft" size={30} color="#000" onPress={goToProfil} />

            <Text>Ajouter un animal</Text>

            {(step === 1 &&
                <>
                    <TextInput
                        placeholder="Nom"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text> Selectionner la catégorie </Text>
                    <SelectList
                        data={category}
                        setSelected={getSubCategory}
                    />

                    <SelectList
                        data={subCategory}
                        setSelected={categorieAndSubValue}
                    />

                    <Text>Votre animal est t'il lof ?</Text>
                    <Text>Oui</Text>
                    <Text>Non</Text>

                </>

            )

                || (step === 2 &&
                    <>
                        <TextInput
                            placeholder="Poids"
                            value={weight}
                            onChangeText={setWeight}
                        />

                        <TextInput
                            placeholder="Age de l'animal"
                            value={age}
                            onChangeText={setAge}
                        />

                    </>
                )
                || (step === 3 &&
                    <>
                        <TextInput
                            placeholder="Sexe"
                            value={sexe}
                            onChangeText={setSexe}
                        />

                        <TextInput
                            placeholder="Maladie"
                            value={maladie}
                            onChangeText={setMaladie}
                        />

                        <Text>Mon animal n'a aucune maladie</Text>

                    </>
                )
                || (step === 4 &&
                    <>
                        <TextInput
                            placeholder="image"
                            value={image}
                            onChangeText={setImage}
                        />
                    </>
                )
                || (step === 5 &&
                    <Text>appuiyer sur continuer pour finaliser l'ajout de votre animal</Text>
                )}


            <Button onPress={animal}>Continuer</Button>




        </View>
    )
}

export default AddPets