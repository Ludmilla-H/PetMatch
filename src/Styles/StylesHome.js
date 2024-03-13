import { StyleSheet, Dimensions } from "react-native";

const widthD = Dimensions.get('window').width
const heightD = Dimensions.get('window').height



export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF",
        padding: 10,
    },
    bells: {
        justifyContent: "flex-end",
        alignItems: "flex-end",
        marginRight: 20,

    },

    logoView: {
        justifyContent: "center",
        alignItems: "center",

    },

    logo: {
        height: 50,
        width: 50

    },

    categorieText: {
        color: "black",
        textDecorationLine: "underline",
        fontWeight: "400",
        fontSize: 20,
        marginVertical: 20,
        marginHorizontal: 10,

    },

    categorieView: {

        justifyContent: "center",
        alignItems: "center",
        height: 100,


    },

    categories: {
        marginHorizontal: 10,
    },

    petlist: {
        backgroundColor: "white",
        elevation: 5,
        width : (widthD - 38)/2,
        marginLeft:8,
        height : 170  ,
        // marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 25,
    },

    petImage: {
        height: 110,
        width: "100%",
        backgroundColor: "yellow" ,
        borderRadius: 25,

    },

    //item animal style
    view1: {
        flexDirection: "row",
        // alignContent: "space-around",
        marginHorizontal: 15,
        marginVertical: 7,
    },

    view2: {
        flexDirection: "row",
        marginHorizontal: 15,
        marginVertical: 3,

    },

    iconUser: {
        marginRight: 60,

    },

    animalName: {
        fontWeight: "700",
        color: "black",

    },

    animalSexe: {
        fontWeight: "700",
        backgroundColor: "#FFBD59",
        paddingHorizontal: 9,
        borderRadius: 20,
        marginRight: 10,
        color: "black",





    },

    
})
