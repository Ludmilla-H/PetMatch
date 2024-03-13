// import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Icon from 'react-native-vector-icons/AntDesign';
// import { useSelector } from 'react-redux';
// import firestore from '@react-native-firebase/firestore';
// import { Button, TextInput } from 'react-native-paper';
// import StylesProfile from '../Styles/StylesProfile';


// const ProfilProprietaire = ({ navigation }) => {

//     const userId = useSelector(state => state.user);
//     const [user, setUser] = useState(null);

//     //state pour stocker l'URL de l'image
//     const [profileImageURL, setProfileImageURL] = useState(null);


//     const goBackToHome = () => {
//         navigation.navigate('Home');
//         console.log("je suis dans l'accueil")
//     }

//     useEffect(() => {
//         //mise en place d'un écouteurs pour surveiller les changements dans ma base de donnée
//         const unsubscribe = firestore().collection('user').doc(userId).onSnapshot(doc => {

//             //Si le document existe, mettez à jour l'URL de l'image dans l'état local
//             if (doc.exists) {
//                 const data = doc.data();
//                 console.log("data:", data.avatar)

//                 setProfileImageURL(data.avatar);
//             }
//         })

//         return () => {
//             // Lorsque le composant est démonté, désabonnez-vous de l'écouteur pour éviter les fuites de mémoire
//             unsubscribe();
//         };
//     }, []);


//     useEffect(() => {
//         const fetchUserData = async () => {
//           try {
//             const userDisplay = firestore().collection('user').doc(userId);
//             const userData = (await userDisplay.get()).data();
//             setUser(userData);
//           } catch (error) {
//             console.error("Ce nom d'utilisateur n'existe pas:", error);
//           }
//         };
    
//         fetchUserData();
//       }, [userId]);
    
    

//       //Cette ligne vérifie si la variable user est fausse/null, 
//       //déterminer si les données de l'utilisateur ont été récupérées avec succès depuis Firestore.
//       if (!user) {
//         return (
//           <View>
//             <Text>Loading...</Text>
//           </View>
//         );
//       }


//     return (
//         <View>
//             <Icon name="arrowleft" size={30} color="#000" onPress={goBackToHome} />
//             {/* Affichez l'image si l'URL est présente */}
//             {profileImageURL && <Image source={{ uri: profileImageURL }} style={{ width: 60, height: 60, borderRadius: 25, marginLeft: 170 }} />}


//             <Text>Nom D'utilisateur: {user.nom}</Text>
//             <Text>Animaux de l'utilisateur:</Text>


//         </View>
//     )
// }

// export default ProfilProprietaire