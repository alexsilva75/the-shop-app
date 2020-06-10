import 'react-native-gesture-handler'
import React, {useState} from 'react';

import { StyleSheet, Text, View } from 'react-native';

import {enableScreens} from 'react-native-screens'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'

import {composeWithDevTools} from 'redux-devtools-extension'

import {AppLoading} from 'expo'
import * as Font from 'expo-font'

import NavigationContainer from './navigation/NavigationContainer'

import rootReducer from './store/reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

enableScreens()

const loadFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (<AppLoading
      startAsync={loadFonts}
      onFinish={() => setFontLoaded(true)}
      onError={err => console.log(err)}
    />)
  }

  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
