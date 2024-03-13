import { View, Text, TextInput, Image } from 'react-native'
import { Button, RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { insertData } from '../commonjs/db';
import React, { useEffect, useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'
import { loadData } from '../commonjs/db';
import Icon from 'react-native-vector-icons/AntDesign';
import AddPetStyles from '../Styles/AddPetStyles';
import { set } from 'immer/dist/internal';
import { launchCamera } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import StylesAnimal from '../Styles/StylesAnimal';
import ImagePicker from 'react-native-image-crop-picker';






const AddPets = ({ navigation }) => {


    const animals = useSelector(state => state.animal);


    //initialisation de mes states
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [maladie, setMaladie] = useState('');
    const [image, setImage] = useState('');
    const [step, setStep] = useState(1);

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [subCategoryId, setSubCategoryId] = useState();

    const [checked, setChecked] = useState(false);
    const [addPetImageURL, setAddPetImageURL] = useState(null);


    //state 'aucune maladie'
    const [seak, setSeak] = useState(false);

    //state pour selectionner le sexe
    const [selected, setSelected] = useState("");

    const userId = useSelector(state => state.user);

    const animalSex = [
        { value: 'femelle' },
        { value: 'mal' },
    ]


    const animal = () => {

        if (step == 5) {
            done();
            //sinon aller à létape suivante
        } else {
            setStep(step + 1)
        } if (step === 5) {
            navigation.navigate('myanimalpage')
        }
    }

    const done = () => {
        console.log(name, age, weight, maladie, userId, checked, selected)
        const animalData = {
            name: name, weight: weight, age: age, race: subCategoryId, //subCategoryId
            image: image, maladie: maladie, userId: userId,
            lof: checked, sexe: selected, aucunemaladie: seak
        }

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

    // code pour choisir une image en s'inscrivant
    const callBackCamera = (response) => {
        if (response.didCancel) {
            console.log('L\'utilisateur a annulé la prise de la photo');
        } else if (response.error) {
            console.log('Erreur :', response.error);
        } else {
            console.log('Image prise avec succès. Voici les détails :', response);
        }
    }

    const choisirEtEnvoyerImage = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(async (image) => {
            try {
                const fileName = image.path.split('/').pop();
                console.log("fileName", fileName);
    
                const reference = storage().ref().child(`imagesAnimal/${fileName}`);
                const pathToFile = `${image.path}`;
    
                await reference.putFile(pathToFile);
                const url = await reference.getDownloadURL();
    
                console.log('Image envoyée avec succès !', url);
    
                // Mettre à jour l'URL de l'avatar dans Firestore
                firestore().collection("animal").doc(animals).update({ avatar: url });
    
                console.log("pathToFile:", pathToFile);
                console.log(image);
            } catch (error) {
                console.error("Erreur lors du traitement de l'image :", error);
            }
        });
    };


    useEffect(() => {
        //mise en place d'un écouteurs pour surveiller les changements dans ma base de donnée
        const unsubscribe = firestore().collection('animal').doc(animals).onSnapshot(doc => {

            //Si le document existe, mettez à jour l'URL de l'image dans l'état local
            if (doc.exists) {
                const data = doc.data();
                console.log("data:", data.avatar)
                setAddPetImageURL(data.avatar);
            }
        })
        return () => {
            // Lorsque le composant est démonté, désabonnez-vous de l'écouteur pour éviter les fuites de mémoire
            unsubscribe();
        };
    }, []);


    return (
        <View style={AddPetStyles.container}>
            <Icon name="arrowleft" size={30} color="#000" onPress={goToProfil} />

            {(step === 1 &&
                <>
                    <Text style={AddPetStyles.bonjour}>Bonjour </Text>
                    <Text style={AddPetStyles.phrases1}>Merci de remplir ce formulaire avec les informations de votre animal afin de continuer </Text>

                    <TextInput
                        style={AddPetStyles.formAddpet}
                        placeholder="Nom"
                        value={name}
                        onChangeText={setName}
                    />
                    <SelectList
                        boxStyles={{
                            backgroundColor: "#FFF",
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: "black",
                            paddingLeft: 20,
                            marginVertical: 10,
                            marginHorizontal: 10,
                            fontSize: 20,
                        }}
                        dropdownStyles={{
                            backgroundColor: "white",
                            position: "absolute",
                            top: 40,
                            width: "100%",
                            zIndex: 999,
                        }}
                        data={category}
                        setSelected={getSubCategory}
                        placeholder="selectionnez une categorie"
                    />
                    <SelectList
                        boxStyles={{
                            backgroundColor: "#FFF",
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: "black",
                            paddingLeft: 20,
                            marginVertical: 20,
                            marginHorizontal: 10,
                            fontSize: 20,
                        }}
                        dropdownStyles={{
                            backgroundColor: "white",
                            position: "absolute",
                            top: 40,
                            width: "100%",
                            zIndex: 999,
                        }}

                        data={subCategory}
                        setSelected={categorieAndSubValue}
                        placeholder="selectionner une sous-categorie"
                    />

                    <Text style={AddPetStyles.lof}>Votre animal est t'il lof ?</Text>
                    <Text>Oui</Text>
                    <RadioButton
                        value="oui"
                        status={checked === 'oui' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('oui')}
                        radioButtonChangeEvent={setChecked}
                    />

                    <Text>Non</Text>
                    <RadioButton
                        value="non"
                        status={checked === 'non' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('non')}
                        radioButtonChangeEvent={setChecked}
                    />

                </>
            )
                || (step === 2 &&
                    <>
                        <Text style={AddPetStyles.phrases2}>Voici la deuxième étapes de l’inscription de votre animal </Text>

                        <TextInput
                            style={AddPetStyles.formAddpet}
                            placeholder="Poids"
                            value={weight}
                            onChangeText={setWeight}
                        />

                        <TextInput
                            style={AddPetStyles.formAddpet}
                            placeholder="Âge de l'animal"
                            value={age}
                            onChangeText={setAge}
                        />

                    </>
                )
                || (step === 3 &&
                    <>
                        <Text style={AddPetStyles.phrases2}>Vous y êtes presque, plus que deux étapes. </Text>

                        <SelectList
                            boxStyles={{
                                backgroundColor: "#FFF",
                                borderRadius: 25,
                                borderWidth: 2,
                                borderColor: "black",
                                paddingLeft: 20,
                                marginVertical: 20,
                                marginHorizontal: 10,
                                fontSize: 20,
                            }}
                            dropdownStyles={{
                                backgroundColor: "white",
                                position: "absolute",
                                top: 40,
                                width: "100%",
                                zIndex: 999,
                            }}

                            data={animalSex}
                            setSelected={(val) => setSelected(val)}
                            placeholder="Choisir le sexe"
                        />

                        <TextInput
                            style={AddPetStyles.formAddpet}
                            placeholder="Maladie"
                            value={maladie}
                            onChangeText={setMaladie}
                        />
                        <Text>Mon animal n'a aucune maladie</Text>
                        <RadioButton
                            value="Aucune maladie connue"
                            status={seak === 'non' ? 'checked' : 'unchecked'}
                            onPress={() => setSeak('non')}
                            radioButtonChangeEvent={setSeak}
                        />



                    </>
                )
                || (step === 4 &&
                    <>
                        <Button onPress={choisirEtEnvoyerImage}> choisir une image </Button>
                        <View style={StylesAnimal.avatar}>
                            {/* Affichez l'image si l'URL est présente */}
                            {addPetImageURL && <Image source={{ uri: addPetImageURL }} style={{ width: 60, height: 60, borderRadius: 30 }} />}
                        </View>


                    </>
                )
                || (step === 5 &&
                    <Text>appuiyer sur continuer pour finaliser l'ajout de votre animal</Text>
                )}


            <Button onPress={animal} style={AddPetStyles.addpetButtons}
                labelStyle={{ color: "black", fontSize: 17 }}>Continuer</Button>




        </View>
    )
}

export default AddPets