import { View, Text, Alert, Modal, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import StylesHome from '../Styles/StylesHome'
import { setCategories } from '../Redux/categorie';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import { loadData } from '../commonjs/db';


const ItemCategories = ({ categorie }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [categoryId, setCategoryId] = useState();
  const [subCategoryId, setSubCategoryId] = useState();
  const [categoriesChien, setCategoriesChien] = useState();
  const [categoriesChat, setCategoriesChat] = useState();

  dispatch = useDispatch();

  const consultRedux = useSelector(state => state.categorie)


  // const saveCategorie = (subCat) => {

  //   console.log("saveCategorie => subCat :", subCat)

  //   dispatch(setCategories(subCat))
  //   console.log("consultRedux :",consultRedux) ;
  // }

  const saveCategorie = (subCat) => {
    console.log("saveCategorie => subCat :", subCat);
  
    // Récupérez les catégories existantes depuis l'état Redux
    const existingCategories = consultRedux.categories || [];
  
    // Vérifiez si la catégorie existe déjà dans l'état Redux
    const existingCategoryIndex = existingCategories.findIndex(cat => cat.category === subCat.category);
  
    if (existingCategoryIndex !== -1) {
      // La catégorie existe déjà, mettez à jour les sous-catégories
      existingCategories[existingCategoryIndex].data = subCat.data;
    } else {
      // La catégorie n'existe pas encore, ajoutez-la au tableau
      existingCategories.push(subCat);
    }
  
    console.log("existingCategories" , existingCategories)

    // Dispatchez l'action pour mettre à jour l'état Redux
    dispatch(setCategories(existingCategories));
  
    console.log("consultRedux :", consultRedux);
  };
    

  const loadCategory = async (id) => {

    console.log("loadCategory => id:", id)
    const dataCategories = await loadData('subcategories');
    // console.log("loadCategory => dataCategories:" , dataCategories) 
    // console.log("dataCatFilter", dataCategories.filter(item => item.category == id))
    const subCategories = dataCategories.filter(item => item.category == id)
      .map(data => {
                  // Ajoutez d'autres propriétés ou objets au besoin

        const newData = {
          category: id,
          data: [
            { key: data.id, race: data.race },
          ]
        };
        return newData
      })
    console.log("subCategories:", subCategories)

    setSubCategories(dataCategories)
    saveCategorie(subCategories);
  }
  //   const loadCategory = async () => {

  //     const dataCategories = await loadData('subcategories');


  //     setSubCategories(dataCategories)
  // }

  //fonction pour récupérer les sous-catégorie grâce à leur id et leur race
  const getSubCategory = async (key) => {
    setCategoryId(key)
    console.log("CategoryId", categoryId, "key=>", key)

    const subcategories = await loadData('subcategories')
    console.log("subcategories :", subcategories)
    const subcategoriesData = subcategories.filter(item => item.id == key)
      .map(data => {
        const newData = { key: data.id, value: data.race }
        return newData
      })
    setSubCategory(subcategoriesData);
    console.log("subcategoriesData :", subcategoriesData)
  }

  const subCat = (id) => {
    console.log("subCat :", id)
    setModalVisible(!modalVisible)
    getSubCategory(id);
  }

  useEffect(() => {
    loadCategory(categorie.id);

  }, [])



  return (
    <View>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Voici mes catégories !</Text>
              <FlatList
                data={subCategories}
                renderItem={({ item }) => <Text style={styles.modalText} onPress={() => subCat(item.id)}>{item.race}</Text>}
                keyExtractor={item => item.id}
              />

              {/* <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable> */}
            </View>
          </View>
        </Modal>

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>{categorie.name}
          </Text>
          {/* <Button onPress={saveCategorie}
            style={StylesHome.categories}> {categorie.name}
          </Button> */}

        </Pressable>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#000',
  },
  buttonClose: {
    backgroundColor: '#000',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    marginVertical: 3,
    fontSize: 15,
  },
});

export default ItemCategories