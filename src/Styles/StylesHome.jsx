import { StyleSheet } from "react-native";

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
        height: 180,
        width: 150,
        backgroundColor: "white",
        elevation: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 20,
    },

    petImage: {
        height: 110,
        width: "100%",
        backgroundColor: "yellow" ,
        borderRadius: 20,

    },

    
})
