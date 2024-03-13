import { StyleSheet } from "react-native";

export default StyleSheet.create ({
    container:{
        flex: 1,
        backgroundColor: "#FFF",
        padding: 15,
    },

    salut: {
        fontSize: 30,
        fontWeight: "bold",
        color: "black",
        // fontFamily: "kanit bold",
    },

    welcome: {
        fontSize: 20,
        // fontWeight: "semi-bold",
        color: "black",
        marginBottom : 25
    },

    avatar: {
        flexDirection: "row",
    }, 

    avatarImage :{ 
        marginLeft: 170,

    },


    input: {
        height: 40,
        margin: 12,
        borderBottomWidth: 1,
        padding: 10,
        fontSize: 18,
    },

    bar : {
        flexDirection: "row" ,
        justifyContent: "space-around",
    },

})