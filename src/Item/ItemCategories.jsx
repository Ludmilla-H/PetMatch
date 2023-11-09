import { View, Text, Alert, Modal, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import StylesHome from '../Styles/StylesHome'
import { setCategories } from '../Redux/categorie';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native-paper';

const ItemCategories = ({categorie}) => {

  const [modalVisible, setModalVisible] = useState(false);

  dispatch = useDispatch();

  const saveCategorie = () => {

    dispatch(setCategories(categorie.id))
  }

  
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
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
      
      <Button onPress={saveCategorie} 
      style={StylesHome.categories} 
      // labelStyle=
      // {{
      // color:"black",
      // backgroundColor:"white", 
      // borderRadius: 20, 
      // elevation: 4, 
      // height: 70, 
      // width: 70, 
      // fontSize: 20
      // }}
      >{categorie.name}
      </Button>
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
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ItemCategories