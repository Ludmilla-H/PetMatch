import { View, Text, Modal, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { animalsBySubCat, loadData } from '../commonjs/db'
import StylesCategorie from '../Styles/StylesCategorie';
import { useDispatch } from 'react-redux';
import { setAnimals } from '../Redux/animals';
import Icon from 'react-native-vector-icons/EvilIcons';


const ModalSubCat = ({ categorie }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [subCategory, setSubCategory] = useState([]);

    const dispatch = useDispatch();

    //récupere mes sous-catégorie grace a loadData et les filtre en fonction de leur key(id)
    const getSubCategory = async (key) => {
        const subcategories = await loadData('subcategories')
        // console.log("subcategories :", subcategories)
        const subcategoriesData = subcategories.filter(item => item.category == key)

        //mettre a jour le changement des sous-catégories
        setSubCategory(subcategoriesData);
        // console.log("subcategoriesData :", subcategoriesData)
    }

    //fermer le modal en appuiyant sur la sous-catégories
    const toggleModal = () => {
        setModalVisible(!modalVisible)
    }

    //lire dans le store pour afficher les sous-catégories en fonction de leur id 
    const subCat = async (id) => {
        const dataAnimals = await animalsBySubCat(id);
        dispatch(setAnimals(dataAnimals));
        toggleModal();
    }

    useEffect(() => {
        getSubCategory(categorie.id)
    }, [])


    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    console.log('Modal has been closed.');
                    setModalVisible(!modalVisible);
                }}>
                <View style={StylesCategorie.centeredView}>
                    <View style={StylesCategorie.modalView}>

                        <Pressable
                            style={[StylesCategorie.button, StylesCategorie.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Icon name="close" size={30} color="#000" />
                            {/* <Text style={StylesCategorie.textStyle}>Hide Modal</Text> */}
                        </Pressable>

                        <Text style={StylesCategorie.modalText}>Voici mes catégories !</Text>
                        
                        <FlatList
                            data={subCategory}
                            renderItem={({ item }) => <Text style={StylesCategorie.modalText} onPress={() => subCat(item.id)}>{item.race}</Text>}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
            </Modal>

            <Pressable
                style={[StylesCategorie.button, StylesCategorie.buttonOpen]}
                onPress={toggleModal}>
                <Text style={StylesCategorie.textStyle}>{categorie.name}
                </Text>
            </Pressable>
        </View>
    )
}

export default ModalSubCat