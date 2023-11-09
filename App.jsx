import { View, Text } from 'react-native'
import React from 'react'
import RoutesPetmatch from './src/Routes/RoutesPetmatch'
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'
import { NavigationContainer } from '@react-navigation/native'

const App = () => {
  return (

    <Provider store={store}>
      <NavigationContainer>
      <RoutesPetmatch />
    </NavigationContainer>
    </Provider>
  )
}

export default App