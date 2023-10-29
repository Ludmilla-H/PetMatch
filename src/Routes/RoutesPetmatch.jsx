import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth';
import { useSelector , useDispatch } from 'react-redux'
import { resetUser, setUser } from '../Redux/user';
import ProfilPage from '../Private/ProfilPage';
import SignInScreen from '../Public/SignInScreen';
import SignUpScreen from '../Public/SignUpScreen';
import HomePage from '../Public/HomePage';

const Stack = createNativeStackNavigator();

const RoutesPetmatch = () => {

    const [initializing, setInitializing] = useState(true);

    const user = useSelector(state => state.user) ;
    const dispatch = useDispatch() ;

    //change et met à jour l'état de l'utilisation
    const onUserStateChanged = (user) => {

        //si il n'y a pas d'utl set user si il y en a un user

        if (!user) {
            dispatch(resetUser())
        } else {
            dispatch(setUser(user.uid))
        }

        //eviter de faire l'app boucler sans cesse
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onUserStateChanged);
        return subscriber; // se désabonne a la fermeture
    }, []);


    return (

        <NavigationContainer>
            <Stack.Navigator>
                {!user ? (
                    <>
                        <Stack.Screen name="SignIn" component={SignInScreen} />
                        <Stack.Screen name="SignUp" component={SignUpScreen} />

                    </>
                ) : (
                    <>      
                        <Stack.Screen name="Home" component={HomePage} />          
                        <Stack.Screen name="profile" component={ProfilPage} />

                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RoutesPetmatch