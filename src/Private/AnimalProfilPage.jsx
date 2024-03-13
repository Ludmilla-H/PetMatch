import { View, Text, TextInput, Image, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-paper'
import StylesHome from '../Styles/StylesHome';
import StylesProfile from '../Styles/StylesProfile';
import Icon from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import StylesAnimal from '../Styles/StylesAnimal';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';

const GreenBig = require('../assets/images/Ellipse18.png');
const orangeLittle = require('../assets/images/Ellipse19.png');
const orangeBig = require('../assets/images/OrangeBig.png');
const GreenLittle = require('../assets/images/GreenLittle.png');


const AnimalProfilPage = ({ navigation, route }) => {

    const { animalId } = route.params;

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [weight, setWeight] = useState('');
    const [maladie, setMaladie] = useState('');
    const [description, setDescription] = useState('');
    const [profileAnimalImageURL, setProfileAnimalImageURL] = useState(null);


    //fonction pour retourner en arrière
    const goBackToHome = () => {
        navigation.goBack()
    }

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
                firestore().collection("animal").doc(animalId).update({ avatar: url });
    
                console.log("pathToFile:", pathToFile);
                console.log(image);
            } catch (error) {
                console.error("Erreur lors du traitement de l'image :", error);
            }
        });
    };

    const modifier = () => {
        console.log("name", name, "age", age, "weight", weight, "maladie", maladie, "description", description)
        firestore().collection("animal").doc(animalId).update({ name, age, weight, maladie, description });

        console.log("error")
    }

    const read = async () => {
        const snapUser = await firestore().collection('animal').doc(animalId).get();

        console.log("snapUser", snapUser.data())
        setName(snapUser.data().name)
        setWeight(snapUser.data().weight)
        setAge(snapUser.data().age)
        setMaladie(snapUser.data().maladie)
        setDescription(snapUser.data().description)
    }

    useEffect(() => {
        read();
    }, [])

    useEffect(() => {
        //mise en place d'un écouteurs pour surveiller les changements dans ma base de donnée
        const unsubscribe = firestore().collection('animal').doc(animalId).onSnapshot(doc => {

            //Si le document existe, mettez à jour l'URL de l'image dans l'état local
            if (doc.exists) {
                const data = doc.data();
                console.log("data:", data.avatar)
                setProfileAnimalImageURL(data.avatar);
            }
        })
        return () => {
            // Lorsque le composant est démonté, désabonnez-vous de l'écouteur pour éviter les fuites de mémoire
            unsubscribe();
        };
    }, []);

    return (
        <View style={StylesHome.container}>

            <Icon name="arrowleft" size={30} color="#000" onPress={goBackToHome} />

            <Image source={GreenBig} style={{ height: 276, width: 176, position: "absolute", top: 100, right: -20 }} />
            <Image source={orangeLittle} style={{ height: 156, width: 103, position: "absolute", right: 0, bottom: 180, }} />
            <Image source={orangeBig} style={{ height: 198, width: 215, position: "absolute", bottom: -30, }} />
            <Image source={GreenLittle} style={{ height: 156, width: 107, position: "absolute", bottom: 100, }} />

            <View style={StylesAnimal.avatar}>
                {/* Affichez l'image si l'URL est présente */}
                {profileAnimalImageURL && <Image source={{ uri: profileAnimalImageURL }} style={{ width: 60, height: 60, borderRadius: 30 }} />}
                {/* <Icon name="picture" size={30} color="#000" onPress={goBackToHome} /> */}
            </View>


            <TextInput
                style={StylesAnimal.input}
                placeholder="Nom"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={StylesAnimal.input}
                placeholder="Poids"
                value={weight}
                onChangeText={setWeight}
            />

            <TextInput
                style={StylesAnimal.input}
                placeholder="Âge de l'animal"
                value={age}
                onChangeText={setAge}
            />

            <TextInput
                style={StylesAnimal.input}
                placeholder="Maladie"
                value={maladie}
                onChangeText={setMaladie}
            />

            <TextInput
                style={StylesAnimal.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />


            <Button onPress={modifier}>
            <Icon name="check" size={28} color="#000" onPress={goBackToHome} />
            </Button>
            <Button onPress={choisirEtEnvoyerImage}
                    labelStyle={{color:"black"}}
            > choisir une image pour mon animal</Button>

        </View>
    )
}

export default AnimalProfilPage