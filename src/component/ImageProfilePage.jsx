import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';


const imageProfilePage = () => {


    //state pour stocker l'URL de l'image
    const [profileImageURL, setProfileImageURL] = useState(null);

    //récuperer le state de user dans le store
    const userId = useSelector(state => state.user);
    console.log(userId);
    


    useEffect(() => {
        //mise en place d'un écouteurs pour surveiller les changements dans ma base de donnée
        const unsubscribe = firestore().collection('user').doc(userId).onSnapshot(doc => {

        //Si le document existe, mettez à jour l'URL de l'image dans l'état local
                if (doc.exists) {
                    const data = doc.data();
                    console.log("data:", data.avatar)

                    setProfileImageURL(data.avatar);
                }

            })
            return () => {
                unsubscribe(); 
              };
    }, []);

    return (
<View>
      {profileImageURL && <Image source={{ uri: profileImageURL }} style={{ width: 55, height: 55, borderRadius: 25 }} />}
</View>    )
}

export default imageProfilePage