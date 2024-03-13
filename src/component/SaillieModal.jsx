import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';

const SaillieModal = ({navigation}) => {

    const [modalVisible, setModalVisible] = useState(false);


   const GoBackToHome = () => { 
    navigation.navigate("Home")
    }


    return (
        <View style={styles.centeredView}>
            <Modal
                // animationType="slide"
                // transparent={true}
                // visible={modalVisible}
                // onRequestClose={() => {
                //     Alert.alert('Modal has been closed.');
                //     setModalVisible(!modalVisible);
                // }}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Saillie enregistrée avec succès</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textStyle}
                            onPress={GoBackToHome}>Accueil</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {/* <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable> */}
        </View>)
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
        borderRadius: 25,
        padding: 13,
        elevation: 2,
    },
    // buttonOpen: {
    //     backgroundColor: '#F194FF',
    // },
    buttonClose: {
        backgroundColor: '#000',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: "#000",
    },
});

export default SaillieModal