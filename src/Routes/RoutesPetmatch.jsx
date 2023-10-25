import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from '../Public/HomePage';
import SignIn from '../Public/SignIn';
import SignUp from '../Public/SignUp';
import Detail from '../component/Detail';


const Stack = createNativeStackNavigator();

const RoutesPetmatch = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>

            <Stack.Screen name="homepage" component={HomePage} />
            <Stack.Screen name="signin" component={SignIn} />
            <Stack.Screen name="signup" component={SignUp} />
            <Stack.Screen name="detail" component={Detail} />

            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default RoutesPetmatch