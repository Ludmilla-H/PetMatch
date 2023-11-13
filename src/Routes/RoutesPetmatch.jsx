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
import AddPets from '../component/AddPets';
import AnimalProfilPage from '../Private/AnimalProfilPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabProfilNavigation = () => {
    return (
    <Stack.Navigator>
        <Stack.Screen name="profilePage" component={ProfilPage} options={{headerShown: false, tabBarStyle: { display: 'none' }}} />
        <Stack.Screen name="addPets" component={AddPets} options={{headerShown: false, tabBarStyle: { display: 'none' }}}  />
        <Stack.Screen name="animalProfile" component={AnimalProfilPage} options={{headerShown: false}}/>

    </Stack.Navigator>
    );
  };


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

            <Tab.Navigator>
                {!user ? (
                    <>
                        <Tab.Screen name="Home" component={HomePage} options={{headerShown: false}}/>          
                        <Tab.Screen name="signin" component={SignInScreen} />
                        <Tab.Screen name="signup" component={SignUpScreen} />

                    </>
                ) : (
                    <>      
                        <Tab.Screen name="Home" component={HomePage} options={{headerShown: false}}/>          
                        <Tab.Screen name="profile" component={TabProfilNavigation} options={{headerShown: false}}/>

                    </>
                )}
            </Tab.Navigator>
    )


}



export default RoutesPetmatch