import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import auth from '@react-native-firebase/auth';
import { useSelector, useDispatch } from 'react-redux'
import { resetUser, setUser } from '../Redux/user';
import ProfilPage from '../Private/ProfilPage';
import SignInScreen from '../Public/SignInScreen';
import SignUpScreen from '../Public/SignUpScreen';
import HomePage from '../Public/HomePage';
import AddPets from '../component/AddPets';
import AnimalProfilPage from '../Private/AnimalProfilPage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyAnimalsPage from '../component/MyAnimalsPage';
import DetailHomeAnimal from '../component/DetailHomeAnimal';
import ProfilProprietaire from '../component/ProfilProprietaire';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabProfilNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="profilePage" component={ProfilPage} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
            <Stack.Screen name="proprioProfil" component={ProfilProprietaire} options={{headerShown: false} }/>
            <Stack.Screen name="addPets" component={AddPets} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
            <Stack.Screen name="myanimalpage" component={MyAnimalsPage} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
            <Stack.Screen name="animalProfile" component={AnimalProfilPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};
const TabHomeNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomePage} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
            <Stack.Screen name="detailhomeanimal" component={DetailHomeAnimal} options={{headerShown: false} }/>
            {/* <Stack.Screen name="addPets" component={AddPets} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
            <Stack.Screen name="myanimalpage" component={MyAnimalsPage} options={{ headerShown: false, tabBarStyle: { display: 'none' } }} />
            <Stack.Screen name="animalProfile" component={AnimalProfilPage} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    );
};


const RoutesPetmatch = () => {

    const [initializing, setInitializing] = useState(true);

    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

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

        <Tab.Navigator screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: [{
                position: 'absolute',
                bottom: 25,
                left: 20,
                right: 20,
                elevation: 0,
                backgroundColor: "white",
                borderRadius: 30,
                // borderWidth: 2,
                height: 60,
                ...styles.shadow,
            }]
        }}
        >
            {!user ? (
                <>
                    <Tab.Screen name="Home" component={HomePage} options={{ headerShown: false }} />
                    <Tab.Screen name="signin" component={SignInScreen} />
                    <Tab.Screen name="signup" component={SignUpScreen} />
                </>
            ) : (
                <>
                    <Tab.Screen name="Home" component={TabHomeNavigation} options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: "center", justifyContent: "center", top: 0 }}>
                                <Image source={require('../assets/images/home.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#FFBD59' : "#000"
                                    }}
                                />
                                {/* <Text style = {{color: focused ? '#FFBD59' : "#000", fontSize: 12}}>HOME</Text> */}
                            </View>
                        ),
                    }}
                    />

                    <Tab.Screen name="profile" component={TabProfilNavigation} options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <View style={{ alignItems: "center", justifyContent: "center", top: 0 }}>
                                <Image source={require('../assets/images/profile.png')}
                                    resizeMode="contain"
                                    style={{
                                        width: 25,
                                        height: 25,
                                        tintColor: focused ? '#FFBD59' : "#000"
                                    }}
                                />
                                {/* <Text style = {{color: focused ? '#FFBD59' : "#000", fontSize: 12}}>HOME</Text> */}
                            </View>
                        ),


                    }} />

                </>
            )}
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: "#7f5df0",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    }

})



export default RoutesPetmatch