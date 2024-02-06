import { StyleSheet } from "react-native";

export default StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        width: "100%" ,
        height: "95%" ,
        marginBottom: 0,
        backgroundColor: 'white',
        borderRadius: 25,
        padding: 60,
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
        height: 50,
        width: 70,
        marginHorizontal: 15,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#FFF',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },
    buttonClose: {
        backgroundColor: '#FFF',
    },
    textStyle: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        textAlign: 'center',
        marginVertical: 6,
        fontSize: 18,
        color: "black",
    },


})
