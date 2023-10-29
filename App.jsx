import { View, Text } from 'react-native'
import React from 'react'
import RoutesPetmatch from './src/Routes/RoutesPetmatch'
import { Provider } from 'react-redux'
import { store } from './src/Redux/store'

const App = () => {
  return (

    <Provider store={store}>
      <RoutesPetmatch />
    </Provider>
  )
}

export default App